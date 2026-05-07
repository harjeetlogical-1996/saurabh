/**
 * Brand asset stream endpoint.
 *
 *   /api/brand/favicon     → 32×32 PNG (browsers ask for this from <link
 *                             rel="icon">)
 *   /api/brand/logo        → 256w PNG (transparent preserved)
 *   /api/brand/og_image    → 1200×630 JPEG
 *
 * Reads the source upload from the GridFS `brandAssets` bucket, runs sharp
 * to produce the right size/format on the fly, and serves with a long
 * cache. We append `?v=<id>` from the layout when needed to bust the
 * cache after a re-upload.
 */
import { NextResponse } from "next/server";
import sharp from "sharp";
import { getSetting } from "@/lib/settings";
import {
  isBrandAssetKind,
  readBrandSource,
  settingKeyFor,
  type BrandAssetKind,
} from "@/lib/brand-assets";

export const runtime = "nodejs";
// We allow Next to cache the response upstream; the URL itself includes a
// version (`?v=`) when the admin updates the asset, so it busts cleanly.
export const revalidate = 3600;

const VARIANT_BY_KIND: Record<
  BrandAssetKind,
  { width: number; height?: number; format: "png" | "jpeg"; mime: string }
> = {
  favicon: { width: 32, height: 32, format: "png", mime: "image/png" },
  logo: { width: 256, format: "png", mime: "image/png" },
  og_image: { width: 1200, height: 630, format: "jpeg", mime: "image/jpeg" },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const { kind: kindRaw } = await params;
  if (!isBrandAssetKind(kindRaw)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const kind: BrandAssetKind = kindRaw;

  const fileId = await getSetting(settingKeyFor(kind) as never);
  if (!fileId) {
    // No upload yet — 404 so the layout's fallback chain (bundled
    // /favicon.ico, /og.png) takes over.
    return new NextResponse("No asset configured", { status: 404 });
  }

  const source = await readBrandSource(fileId);
  if (!source) {
    return new NextResponse("Source missing", { status: 404 });
  }

  const variant = VARIANT_BY_KIND[kind];

  // Special case for ICO inputs — we don't try to re-encode through sharp
  // (sharp doesn't decode .ico). Pass the bytes through as-is and rely on
  // the browser to handle it. Acceptable since modern browsers fall back
  // to PNG anyway.
  if (
    kind === "favicon" &&
    (source.contentType === "image/x-icon" ||
      source.contentType === "image/vnd.microsoft.icon")
  ) {
    return new NextResponse(new Uint8Array(source.buffer), {
      status: 200,
      headers: {
        "Content-Type": source.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Same with SVGs — sharp can rasterize them but for logos we'd rather
  // pass the original SVG through (better quality at any size).
  if (kind === "logo" && source.contentType === "image/svg+xml") {
    return new NextResponse(new Uint8Array(source.buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // sharp pipeline. `failOn: "none"` so corrupt-but-readable inputs don't 500.
  let pipeline = sharp(source.buffer, { failOn: "none" }).rotate();
  pipeline = pipeline.resize({
    width: variant.width,
    height: variant.height,
    fit: kind === "og_image" ? "cover" : "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  let processed: Buffer;
  if (variant.format === "jpeg") {
    processed = await pipeline.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  } else {
    processed = await pipeline.png({ compressionLevel: 9 }).toBuffer();
  }

  return new NextResponse(new Uint8Array(processed), {
    status: 200,
    headers: {
      "Content-Type": variant.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Brand-Source-Id": fileId,
    },
  });
}
