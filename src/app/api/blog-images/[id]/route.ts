import { type NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/db/mongo-client";
import { GridFSBucket, ObjectId } from "mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Serve a blog image by parentId. The route negotiates content based on
 * the client's `Accept` header (preferring AVIF > WebP > JPEG) and the
 * requested `?w=` width (clamped to the closest variant we have).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: parentId } = await params;
  if (!parentId || parentId.length < 8) {
    return new NextResponse("Not found", { status: 404 });
  }

  const accept = req.headers.get("accept") ?? "";
  const wantedWidth = Number(req.nextUrl.searchParams.get("w") ?? "1200");

  const db = await getMongoDb();
  const bucket = new GridFSBucket(db, { bucketName: "blogImages" });

  // Find every variant for this parent.
  const files = await db
    .collection("blogImages.files")
    .find({ "metadata.parentId": parentId })
    .toArray();

  if (files.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Score variants by format support + how close their width matches.
  const formatPref = (mime: string) => {
    if (accept.includes("image/avif") && mime === "image/avif") return 3;
    if (accept.includes("image/webp") && mime === "image/webp") return 2;
    if (mime === "image/jpeg") return 1;
    return 0;
  };

  const scored = files
    .filter((f) => f.metadata?.variant && f.metadata.variant !== "original.jpg")
    .map((f) => {
      const mime: string = f.metadata?.contentType ?? "image/jpeg";
      const w: number = Number(f.metadata?.width ?? 0);
      return {
        file: f,
        formatScore: formatPref(mime),
        widthDelta: Math.abs(w - wantedWidth),
        width: w,
      };
    })
    .filter((s) => s.formatScore > 0)
    .sort((a, b) => {
      // Prefer best format first, then closest width
      if (a.formatScore !== b.formatScore) return b.formatScore - a.formatScore;
      return a.widthDelta - b.widthDelta;
    });

  // Fall back to the original if nothing else qualifies.
  const chosen =
    scored[0]?.file ??
    files.find((f) => f.metadata?.variant === "original.jpg") ??
    files[0];

  const mime = chosen.metadata?.contentType ?? "image/jpeg";

  // Stream the file through.
  const stream = bucket.openDownloadStream(chosen._id as ObjectId);
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  const body = Buffer.concat(chunks);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Image-Variant": chosen.metadata?.variant ?? "unknown",
    },
  });
}
