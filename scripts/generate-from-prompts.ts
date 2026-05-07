/**
 * Prompt-driven image generator.
 *
 *   npm run gen:images -- --file=scripts/article-1-prompts.json
 *
 * Reads a JSON file shaped:
 *   {
 *     "slug": "...",
 *     "cover": { "prompt": "...", "alt": "..." },
 *     "sections": [ { "match": "<H2 text>", "prompt": "...", "alt": "..." }, ... ]
 *   }
 *
 * Pipeline per run:
 *   1. Find the post by slug.
 *   2. Strip every inline blog-image markdown ref from its body and delete the
 *      corresponding GridFS files.
 *   3. Delete the existing cover (best-effort) by parentId parsed from coverUrl.
 *   4. For the cover prompt: generate via Nano Banana, run sharp pipeline,
 *      store in GridFS, set post.coverUrl/coverAlt/coverPrompt/seoOgImage.
 *   5. For each section prompt: generate, optimize, store, then insert the
 *      markdown reference RIGHT AFTER the matching H2's first paragraph.
 *   6. Save body + inlineImages back to the post.
 *
 * Authoring rule: prompts are HAND-WRITTEN in the JSON. This script does not
 * call Gemini text — it only generates the image and respects the prompt
 * exactly as authored.
 */
import { readFileSync } from "node:fs";
import { MongoClient, ObjectId } from "mongodb";
import { generateImage } from "../src/lib/gemini";
import { processAndStoreImage } from "../src/lib/images";
import { deleteByParentId } from "../src/lib/db/gridfs";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";

if (!MONGODB_URI) {
  console.error("MONGODB_URI required");
  process.exit(1);
}

type PromptEntry = { match: string; prompt: string; alt: string };
type PromptFile = {
  slug: string;
  cover: { prompt: string; alt: string } | null;
  sections: PromptEntry[];
};

function parseArgs(): { file: string; patch: boolean } {
  const args = process.argv.slice(2);
  let file = "";
  let patch = false;
  for (const a of args) {
    if (a.startsWith("--file=")) file = a.slice("--file=".length);
    else if (a === "--patch") patch = true;
  }
  if (!file) {
    console.error("--file=path/to/prompts.json required");
    process.exit(1);
  }
  return { file, patch };
}

function stripInlineImages(body: string): { body: string; parentIds: string[] } {
  const ids: string[] = [];
  const cleaned = body.replace(
    /!\[[^\]]*\]\(\/api\/blog-images\/([a-f0-9]+)\)\s*/gi,
    (_m, id: string) => {
      ids.push(id);
      return "";
    },
  );
  return { body: cleaned.replace(/\n{3,}/g, "\n\n"), parentIds: ids };
}

function parentIdFromUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const m = url.match(/\/api\/blog-images\/([a-f0-9]+)/i);
  return m ? m[1] : null;
}

/**
 * Insert image markdown right after the FIRST paragraph below the matching
 * H2 line. Match is fuzzy: case-insensitive substring of the H2 text.
 */
function insertAfterHeading(body: string, headingText: string, imgMd: string): string {
  const lines = body.split("\n");
  const target = headingText.toLowerCase();
  let h2Index = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.+)$/);
    if (m && m[1].toLowerCase().includes(target)) {
      h2Index = i;
      break;
    }
  }
  if (h2Index === -1) {
    console.warn(`     ! could not find H2 matching "${headingText}", appending to end`);
    return body.trimEnd() + "\n\n" + imgMd + "\n";
  }
  // Walk forward: skip blank lines, skip the first paragraph (consecutive non-blank lines),
  // then insert.
  let i = h2Index + 1;
  while (i < lines.length && lines[i].trim() === "") i++;
  while (i < lines.length && lines[i].trim() !== "") i++;
  const before = lines.slice(0, i);
  const after = lines.slice(i);
  return [...before, "", imgMd, "", ...after].join("\n").replace(/\n{3,}/g, "\n\n");
}

async function main() {
  const { file, patch } = parseArgs();
  const json = JSON.parse(readFileSync(file, "utf8")) as PromptFile;

  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");

  const post = await posts.findOne({ slug: json.slug });
  if (!post) {
    console.error(`Post not found: ${json.slug}`);
    process.exit(1);
  }
  console.log(
    `Generating images for: ${post.title}${patch ? "  [PATCH MODE]" : ""}`,
  );

  let body: string = post.body || "";
  let coverStored: { url: string; parentId: string } | null = null;

  if (!patch) {
    // Full mode: wipe all existing inline images and cover
    const stripped = stripInlineImages(body);
    body = stripped.body;
    console.log(
      `  removed ${stripped.parentIds.length} inline image refs from body`,
    );
    for (const id of stripped.parentIds) {
      try {
        await deleteByParentId(id);
      } catch (e) {
        console.warn(`    skip delete ${id}: ${(e as Error).message}`);
      }
    }

    const oldCoverId = parentIdFromUrl(post.coverUrl as string | undefined);
    if (oldCoverId) {
      try {
        await deleteByParentId(oldCoverId);
        console.log(`  removed old cover ${oldCoverId}`);
      } catch (e) {
        console.warn(`  could not delete old cover: ${(e as Error).message}`);
      }
    }
  } else {
    console.log(
      `  patch: keeping existing inline images and cover; only generating listed sections`,
    );
  }

  if (json.cover) {
    console.log(`\nCover: ${json.cover.prompt.slice(0, 90)}...`);
    const coverImg = await generateImage(json.cover.prompt);
    coverStored = await processAndStoreImage(
      Buffer.from(coverImg.base64, "base64"),
      {
        targetWidth: 1600,
        aspectRatio: 3 / 2,
        use: "post-cover",
        prompt: json.cover.prompt,
        alt: json.cover.alt,
        postId: String(post._id),
      },
    );
    console.log(`  -> ${coverStored.url}`);
  }

  // Inline sections
  const newInlineImages: Array<{ url: string; alt: string; prompt: string; anchor: string; match: string }> = [];
  for (let i = 0; i < json.sections.length; i++) {
    const entry = json.sections[i];
    console.log(`\n[${i + 1}/${json.sections.length}] ${entry.match}`);
    console.log(`  prompt: ${entry.prompt.slice(0, 90)}...`);
    try {
      const img = await generateImage(entry.prompt);
      const stored = await processAndStoreImage(Buffer.from(img.base64, "base64"), {
        targetWidth: 1400,
        aspectRatio: 3 / 2,
        use: "post-inline",
        prompt: entry.prompt,
        alt: entry.alt,
        postId: String(post._id),
      });
      const md = `![${entry.alt}](${stored.url})`;
      body = insertAfterHeading(body, entry.match, md);
      newInlineImages.push({
        url: stored.url,
        alt: entry.alt,
        prompt: entry.prompt,
        anchor: stored.parentId,
        match: entry.match,
      });
      console.log(`  -> ${stored.url}`);
    } catch (e) {
      console.error(`  failed: ${(e as Error).message}`);
    }
  }

  // In patch mode merge with existing inlineImages; in full mode replace.
  const existingInline = (post.inlineImages as typeof newInlineImages | undefined) ?? [];
  const inlineImages = patch ? [...existingInline, ...newInlineImages] : newInlineImages;

  const $set: Record<string, unknown> = {
    body: body.trim() + "\n",
    inlineImages,
    updatedAt: new Date(),
  };
  if (coverStored && json.cover) {
    $set.coverUrl = coverStored.url;
    $set.coverAlt = json.cover.alt;
    $set.coverPrompt = json.cover.prompt;
    $set.seoOgImage = coverStored.url;
  }

  await posts.updateOne({ _id: post._id as ObjectId }, { $set });

  console.log(`\nSaved cover + ${inlineImages.length} inline images to /${json.slug}`);
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
