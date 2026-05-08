/**
 * Brand assets — favicon, logo, OG image — uploaded via the admin UI and
 * stored in a dedicated GridFS bucket separate from blog images.
 *
 * Each setting key (`brand.favicon_id`, etc.) holds the GridFS file id of
 * the *source* upload. The `/api/brand/<key>` route streams a processed
 * variant per request based on the asset kind:
 *   - favicon  → 32×32 PNG (32px is enough; modern browsers downscale)
 *   - logo     → 256w PNG, transparent preserved
 *   - og_image → 1200×630 JPEG
 *
 * Server-only.
 */
import { GridFSBucket, ObjectId, type Db } from "mongodb";
import { getMongoDb } from "./db/mongo-client";

const BUCKET = "brandAssets";

let cachedBucket: { db: Db; bucket: GridFSBucket } | null = null;

async function getBucket(): Promise<GridFSBucket> {
  if (cachedBucket) return cachedBucket.bucket;
  const db = await getMongoDb();
  const bucket = new GridFSBucket(db, { bucketName: BUCKET });
  cachedBucket = { db, bucket };
  return bucket;
}

export type BrandAssetKind = "favicon" | "logo" | "og_image" | "founder_photo";

const SETTING_KEY_BY_KIND: Record<BrandAssetKind, string> = {
  favicon: "brand.favicon_id",
  logo: "brand.logo_id",
  og_image: "brand.og_image_id",
  founder_photo: "brand.founder_photo_id",
};

export function settingKeyFor(kind: BrandAssetKind): string {
  return SETTING_KEY_BY_KIND[kind];
}

export function isBrandAssetKind(v: string): v is BrandAssetKind {
  return (
    v === "favicon" ||
    v === "logo" ||
    v === "og_image" ||
    v === "founder_photo"
  );
}

/** Upload a buffer as the source for a brand asset. Returns the new file id. */
export async function uploadBrandSource(
  kind: BrandAssetKind,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const bucket = await getBucket();
  return new Promise<string>((resolve, reject) => {
    const stream = bucket.openUploadStream(`${kind}-source`, {
      metadata: {
        kind,
        contentType,
        uploadedAt: new Date(),
      },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id.toString()));
    stream.end(buffer);
  });
}

/** Stream a brand asset source by GridFS id. Returns null if missing. */
export async function readBrandSource(
  id: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  if (!id || id.length < 8) return null;
  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return null;
  }
  const bucket = await getBucket();
  const db = await getMongoDb();
  const file = await db
    .collection(`${BUCKET}.files`)
    .findOne({ _id: oid });
  if (!file) return null;

  const stream = bucket.openDownloadStream(oid);
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const buffer = Buffer.concat(chunks);
  const contentType =
    (file.metadata?.contentType as string | undefined) ?? "application/octet-stream";
  return { buffer, contentType };
}

/** Best-effort delete of an old source file when a new one is uploaded. */
export async function deleteBrandSource(id: string): Promise<void> {
  if (!id || id.length < 8) return;
  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return;
  }
  try {
    const bucket = await getBucket();
    await bucket.delete(oid);
  } catch (err) {
    console.warn("[deleteBrandSource] failed:", err);
  }
}
