/**
 * Image processing pipeline. Takes raw image bytes (e.g. from Gemini) and
 * generates a set of optimized variants (avif + webp + jpg, multiple widths)
 * stored in GridFS. Returns the canonical image URL the post should reference.
 */
// Server-only by use, not by import guard — see comment in lib/gemini.ts.
import sharp from "sharp";
import { ObjectId } from "mongodb";
import { uploadImageVariant, type ImageMetadata } from "./db/gridfs";

export type StoredImage = {
  /** Logical id (used by the public serve route to fetch best-matching variant) */
  parentId: string;
  /** Public URL clients should use to render the image */
  url: string;
  /** Pixel width of the canonical variant */
  width: number;
  /** Pixel height of the canonical variant */
  height: number;
  /** Variants we created, useful for <picture> tags later */
  variants: Array<{ id: string; format: string; width: number }>;
};

export type ProcessOptions = {
  /** Final canonical width. Defaults to 1200 (good for hero images). */
  targetWidth?: number;
  /** Optional aspect ratio (w/h). When set, height is computed. */
  aspectRatio?: number;
  /** Optional explicit responsive widths to generate. */
  widths?: number[];
  /** Use one of these for the metadata so we can find images later. */
  use?: string;
  postId?: string;
  alt?: string;
  prompt?: string;
};

const DEFAULT_WIDTHS = [400, 800, 1200, 1600];

/**
 * Run an input buffer through sharp, generate AVIF + WebP + JPEG variants,
 * upload them all to GridFS, and return the canonical reference.
 *
 * The returned `url` is shaped `/api/blog-images/<parentId>` and the route
 * picks the best variant based on the `Accept` header and the `?w=` query.
 */
export async function processAndStoreImage(
  input: Buffer,
  opts: ProcessOptions = {},
): Promise<StoredImage> {
  const targetWidth = opts.targetWidth ?? 1200;
  const widths = (opts.widths ?? DEFAULT_WIDTHS).filter((w) => w <= targetWidth || w === Math.max(...(opts.widths ?? DEFAULT_WIDTHS)));

  // Decode once to learn dimensions and rotate based on EXIF.
  const base = sharp(input, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const srcWidth = meta.width ?? targetWidth;
  const srcHeight = meta.height ?? Math.round(targetWidth / 1.91);

  const aspect =
    opts.aspectRatio ?? (srcWidth && srcHeight ? srcWidth / srcHeight : 16 / 9);
  const canonicalWidth = Math.min(targetWidth, srcWidth || targetWidth);
  const canonicalHeight = Math.round(canonicalWidth / aspect);

  const parentId = new ObjectId().toString();

  const variants: Array<{ id: string; format: string; width: number }> = [];

  // Always store the canonical original first (lossy JPEG, max quality 85).
  // We start a fresh sharp instance per output to avoid stream re-use issues.
  const originalJpeg = await sharp(input).rotate().resize({ width: canonicalWidth, height: canonicalHeight, fit: "cover" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  const originalId = await uploadImageVariant(originalJpeg, `original.jpg`, baseMeta(parentId, "original.jpg", canonicalWidth, canonicalHeight, "image/jpeg", opts));
  variants.push({ id: originalId, format: "image/jpeg", width: canonicalWidth });

  // Generate scaled variants in three formats.
  for (const w of widths) {
    if (w > canonicalWidth) continue;
    const h = Math.round(w / aspect);
    const [avifBuf, webpBuf, jpgBuf] = await Promise.all([
      sharp(input).rotate().resize({ width: w, height: h, fit: "cover" }).avif({ quality: 55, effort: 4 }).toBuffer(),
      sharp(input).rotate().resize({ width: w, height: h, fit: "cover" }).webp({ quality: 78, effort: 4 }).toBuffer(),
      sharp(input).rotate().resize({ width: w, height: h, fit: "cover" }).jpeg({ quality: 78, mozjpeg: true }).toBuffer(),
    ]);

    const [avifId, webpId, jpgId] = await Promise.all([
      uploadImageVariant(avifBuf, `${w}.avif`, baseMeta(parentId, `${w}.avif`, w, h, "image/avif", opts)),
      uploadImageVariant(webpBuf, `${w}.webp`, baseMeta(parentId, `${w}.webp`, w, h, "image/webp", opts)),
      uploadImageVariant(jpgBuf, `${w}.jpg`, baseMeta(parentId, `${w}.jpg`, w, h, "image/jpeg", opts)),
    ]);
    variants.push(
      { id: avifId, format: "image/avif", width: w },
      { id: webpId, format: "image/webp", width: w },
      { id: jpgId, format: "image/jpeg", width: w },
    );
  }

  return {
    parentId,
    url: `/api/blog-images/${parentId}`,
    width: canonicalWidth,
    height: canonicalHeight,
    variants,
  };
}

function baseMeta(
  parentId: string,
  variant: string,
  width: number,
  height: number,
  contentType: string,
  opts: ProcessOptions,
): ImageMetadata {
  return {
    parentId,
    variant,
    width,
    height,
    contentType,
    alt: opts.alt,
    prompt: opts.prompt,
    use: opts.use,
    postId: opts.postId,
  };
}
