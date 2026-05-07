/**
 * Service-page image generator.
 *
 *   npm run gen:service-images -- --file=scripts/service-prompts/custom-website-design.json
 *
 * Reads a hand-authored JSON file shaped:
 *   {
 *     "slug": "custom-website-design",
 *     "images": [
 *       { "name": "hero",       "prompt": "...", "alt": "..." },
 *       { "name": "process",    "prompt": "...", "alt": "..." },
 *       { "name": "industries", "prompt": "...", "alt": "..." }
 *     ]
 *   }
 *
 * Per image we:
 *   1. Generate via Gemini (Nano Banana — same as the blog pipeline).
 *   2. Run sharp to produce AVIF + WebP + JPEG at 1600w and 800w (cover-fit
 *      to a 16:9 canvas), plus a 1600w "original" JPEG for fallback.
 *   3. Save them under
 *        public/images/services/<slug>/<name>-<width>.<ext>
 *      so service pages can use a <picture> tag with type-conditional
 *      srcsets and Next will hash-cache them at build time.
 *
 * The JSON file is the source of truth for prompts AND alt text — alt
 * stays human-authored, never auto-generated.
 *
 * Authoring rule: prompts are HAND-WRITTEN. This script only generates
 * the image and respects the prompt as authored.
 */
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { generateImage } from "../src/lib/gemini";

type ImagePrompt = { name: string; prompt: string; alt: string };
type PromptFile = {
  slug: string;
  images: ImagePrompt[];
};

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = Math.round((CANVAS_WIDTH * 9) / 16); // 900
const SMALL_WIDTH = 800;
const SMALL_HEIGHT = Math.round((SMALL_WIDTH * 9) / 16); // 450

function parseArgs(): { file: string } {
  const args = process.argv.slice(2);
  let file = "";
  for (const a of args) {
    if (a.startsWith("--file=")) file = a.slice("--file=".length);
  }
  if (!file) {
    console.error("--file=path/to/prompts.json required");
    process.exit(1);
  }
  return { file };
}

/**
 * Retry wrapper around Gemini image generation. The image model returns 503
 * "high demand" frequently in the late afternoon — backoff + retry handles it
 * cleanly so we don't have to babysit the CLI.
 */
async function generateWithRetry(prompt: string, attempts = 4) {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await generateImage(prompt);
    } catch (err) {
      lastErr = err;
      const msg = (err as Error)?.message ?? "";
      const transient =
        msg.includes("503") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("RESOURCE_EXHAUSTED");
      if (!transient || i === attempts - 1) throw err;
      const delay = 5000 * Math.pow(2, i); // 5s, 10s, 20s
      console.log(`  …retrying in ${delay / 1000}s (attempt ${i + 2}/${attempts})`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

async function main() {
  const { file } = parseArgs();
  const raw = readFileSync(file, "utf8");
  const config = JSON.parse(raw) as PromptFile;
  if (!config.slug || !Array.isArray(config.images) || !config.images.length) {
    throw new Error("Prompt file must have { slug, images: [...] }");
  }

  const outDir = path.resolve(
    process.cwd(),
    "public",
    "images",
    "services",
    config.slug,
  );
  mkdirSync(outDir, { recursive: true });

  // Emit a sidecar manifest so the page component can pull alt text
  // from a single source instead of duplicating it.
  const manifest: Record<string, { alt: string }> = {};

  for (const img of config.images) {
    console.log(`\n→ ${img.name}`);

    // Resume support: if all 6 variants for this image already exist on disk
    // we treat it as done (lets you re-run after a Gemini 503 mid-batch).
    const allVariants = [
      `${img.name}-1600.avif`, `${img.name}-1600.webp`, `${img.name}-1600.jpg`,
      `${img.name}-800.avif`,  `${img.name}-800.webp`,  `${img.name}-800.jpg`,
    ];
    const haveAll = allVariants.every((v) =>
      existsSync(path.join(outDir, v)),
    );
    if (haveAll) {
      console.log("  ✓ already exists, skipping");
      manifest[img.name] = { alt: img.alt };
      continue;
    }
    console.log(`  prompt: ${img.prompt.slice(0, 80)}${img.prompt.length > 80 ? "…" : ""}`);

    const generated = await generateWithRetry(img.prompt);
    const buf = Buffer.from(generated.base64, "base64");

    // Cover-fit to the 16:9 canvas. Gemini occasionally returns 1:1 or 4:3,
    // so we always normalize before encoding.
    for (const [w, h] of [
      [CANVAS_WIDTH, CANVAS_HEIGHT],
      [SMALL_WIDTH, SMALL_HEIGHT],
    ] as const) {
      const [avifBuf, webpBuf, jpgBuf] = await Promise.all([
        sharp(buf, { failOn: "none" })
          .rotate()
          .resize({ width: w, height: h, fit: "cover" })
          .avif({ quality: 55, effort: 4 })
          .toBuffer(),
        sharp(buf, { failOn: "none" })
          .rotate()
          .resize({ width: w, height: h, fit: "cover" })
          .webp({ quality: 78, effort: 4 })
          .toBuffer(),
        sharp(buf, { failOn: "none" })
          .rotate()
          .resize({ width: w, height: h, fit: "cover" })
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer(),
      ]);

      writeFileSync(path.join(outDir, `${img.name}-${w}.avif`), avifBuf);
      writeFileSync(path.join(outDir, `${img.name}-${w}.webp`), webpBuf);
      writeFileSync(path.join(outDir, `${img.name}-${w}.jpg`), jpgBuf);

      console.log(
        `  wrote ${img.name}-${w}.{avif,webp,jpg}  ` +
          `avif=${(avifBuf.length / 1024).toFixed(1)}KB ` +
          `webp=${(webpBuf.length / 1024).toFixed(1)}KB ` +
          `jpg=${(jpgBuf.length / 1024).toFixed(1)}KB`,
      );
    }

    manifest[img.name] = { alt: img.alt };
  }

  writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  console.log(`\n✓ ${config.images.length} images written to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
