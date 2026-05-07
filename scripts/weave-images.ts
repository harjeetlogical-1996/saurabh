/**
 * Generate contextual inline images for an article and weave them into the
 * body markdown right after each H2 section's first paragraph.
 *
 *   npm run weave -- --slug=<slug> [--max=6]
 *
 * Strategy:
 *   1. Pull the article's body markdown.
 *   2. Split it on H2 headings (## ...).
 *   3. Pick up to N sections (skipping the intro before the first H2 and the
 *      last "Where to go next" / CTA section).
 *   4. For each chosen section, ask Gemini text model to write a vivid
 *      one-line image prompt that captures THAT section's specific subject.
 *   5. Generate the image with Nano Banana (gemini-2.5-flash-image), optimize
 *      with sharp, store in GridFS, and insert the markdown reference right
 *      after the section's first paragraph.
 *   6. Save the new body back to the post.
 *
 * Idempotent: if a section already has an image we generated (URL pattern
 * /api/blog-images/...), we skip it.
 */
import { MongoClient, ObjectId } from "mongodb";
import { generateImage, generateText } from "../src/lib/gemini";
import { processAndStoreImage } from "../src/lib/images";
import { deleteByParentId } from "../src/lib/db/gridfs";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI required");
  process.exit(1);
}

type Args = { slug?: string; max: number; regenerate: boolean };

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const out: Args = { max: 6, regenerate: false };
  for (const a of args) {
    if (a.startsWith("--slug=")) out.slug = a.slice("--slug=".length);
    else if (a.startsWith("--max=")) out.max = Number(a.slice("--max=".length)) || 6;
    else if (a === "--regenerate") out.regenerate = true;
  }
  return out;
}

/**
 * Strip all inline blog-image markdown refs from a body. Returns the cleaned
 * body and the list of parentIds we removed (so callers can delete their
 * GridFS files).
 */
function stripInlineImages(body: string): { body: string; parentIds: string[] } {
  const ids: string[] = [];
  // Match ![alt](/api/blog-images/<id>) optionally followed by trailing spaces / blank lines.
  const cleaned = body.replace(
    /!\[[^\]]*\]\(\/api\/blog-images\/([a-f0-9]+)\)\s*/gi,
    (_m, id: string) => {
      ids.push(id);
      return "";
    },
  );
  // Collapse triple-newlines from the holes left behind.
  return { body: cleaned.replace(/\n{3,}/g, "\n\n"), parentIds: ids };
}

type Section = {
  heading: string; // raw "## ..." line
  title: string; // text after the ##
  body: string; // body of this section (until next ##)
};

function splitSections(markdown: string): { intro: string; sections: Section[] } {
  // Find the first H2; everything before it is the "intro" / TL;DR area.
  const firstH2 = markdown.match(/^##\s+/m);
  if (!firstH2 || firstH2.index === undefined) {
    return { intro: markdown, sections: [] };
  }
  const intro = markdown.slice(0, firstH2.index).trimEnd();
  const rest = markdown.slice(firstH2.index);

  const sections: Section[] = [];
  const lines = rest.split("\n");
  let current: { heading: string; title: string; lines: string[] } | null = null;
  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (current) {
        sections.push({
          heading: current.heading,
          title: current.title,
          body: current.lines.join("\n").trim(),
        });
      }
      const title = line.replace(/^##\s+/, "").trim();
      current = { heading: line, title, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) {
    sections.push({
      heading: current.heading,
      title: current.title,
      body: current.lines.join("\n").trim(),
    });
  }
  return { intro, sections };
}

function joinSections(intro: string, sections: Section[]): string {
  const parts = [intro.trim(), ""];
  for (const s of sections) {
    parts.push(s.heading);
    parts.push("");
    parts.push(s.body);
    parts.push("");
  }
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function sectionAlreadyHasInlineImage(s: Section): boolean {
  return /!\[[^\]]*\]\(\/api\/blog-images\//.test(s.body);
}

/**
 * Insert image markdown after the first paragraph in the section body.
 * If there's no clear paragraph break, append to top of section body.
 */
function insertImageIntoSection(
  s: Section,
  imageMarkdown: string,
): Section {
  const lines = s.body.split("\n");
  // Find the first non-empty line, then keep going until we hit a blank line.
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  // Walk past content lines
  while (i < lines.length && lines[i].trim() !== "") i++;
  // Insert blank line + image + blank line at index i
  const before = lines.slice(0, i);
  const after = lines.slice(i);
  const newBody = [...before, "", imageMarkdown, "", ...after].join("\n");
  return { ...s, body: newBody };
}

async function imagePromptForSection(args: {
  articleTitle: string;
  sectionTitle: string;
  sectionExcerpt: string;
}): Promise<string> {
  const text = await generateText(
    `You are art-directing a blog post for Saurabh Bhayana & Team. Your job is
to write ONE specific, LITERAL, content-aware image prompt for this section.
The image MUST visually depict the actual subject matter of THIS section,
not generic "AI tech" or abstract data flow.

Article title: ${args.articleTitle}
Section heading: ${args.sectionTitle}
Section content (verbatim):
${args.sectionExcerpt.slice(0, 2000)}

REQUIRED:
- Read the section carefully. Identify the most concrete, visual concept it
  describes (e.g. a robots.txt file, a Wikipedia article page, a TL;DR box on
  a webpage, a dashboard with a citation graph, schema.org JSON-LD code,
  Reddit comments, a Perplexity citation list, sample headlines on a screen).
- Build the image around THAT specific object.
- It is FINE to show real-looking screen content (browser windows, code
  editors, dashboards, text snippets, mock UI). It is FINE to include
  faux text labels on screens — you just can't have promotional copy.
- Avoid "abstract neural networks", "glowing cyan particles", "data flow
  spheres", or any generic AI cliché unless THIS specific section is
  literally about neural networks or AI internals.

Style direction:
- Editorial photo-realistic mock UI / desk scene, OR clean minimal illustration
  in a flat-design style, OR a stylized 3D render of the actual object.
- Background: dark charcoal #111 or off-white #fafafa, your call.
- Allow accent color: electric cyan, but don't make it the subject.
- 3:2 aspect, no people, no logos, no real brand names, no celebrity faces.

Return ONLY the prompt sentence — one line, vivid, literal, ~25-50 words.`,
    { temperature: 0.85, maxOutputTokens: 350 },
  );
  return text.trim().replace(/^["']|["']$/g, "");
}

async function altForImage(args: {
  articleTitle: string;
  sectionTitle: string;
  prompt: string;
}): Promise<string> {
  const text = await generateText(
    `Write a 1-line, SEO-friendly alt text for an AI-generated illustration.
Article: ${args.articleTitle}
Section: ${args.sectionTitle}
Prompt used to generate image: ${args.prompt}
Hard cap: 125 characters. Plain English. No quotes.`,
    { temperature: 0.3, maxOutputTokens: 100 },
  );
  return text.trim().replace(/^["']|["']$/g, "").slice(0, 200);
}

async function main() {
  const { slug, max, regenerate } = parseArgs();
  if (!slug) {
    console.error("❌ --slug=... required");
    process.exit(1);
  }
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");

  const post = await posts.findOne({ slug });
  if (!post) {
    console.error(`❌ Post not found: ${slug}`);
    process.exit(1);
  }

  console.log(`📄 Weaving images into: ${post.title}`);
  let body: string = post.body || "";

  if (regenerate) {
    const stripped = stripInlineImages(body);
    body = stripped.body;
    console.log(
      `   --regenerate: removed ${stripped.parentIds.length} existing inline images from body`,
    );
    // Delete the old GridFS files (best-effort).
    for (const id of stripped.parentIds) {
      try {
        const removed = await deleteByParentId(id);
        console.log(`     • deleted ${removed} variant file(s) for ${id}`);
      } catch (e) {
        console.warn(`     • could not delete ${id}: ${(e as Error).message}`);
      }
    }
  }

  const { intro, sections } = splitSections(body);
  console.log(`   Found ${sections.length} sections`);

  // Skip the very last section (CTA / "where to go next") and any section
  // already wired up.
  const candidates = sections
    .map((s, idx) => ({ s, idx }))
    .filter(({ s, idx }) => {
      if (sectionAlreadyHasInlineImage(s)) return false;
      // Skip very short sections (< 200 chars) - rarely worth illustrating.
      if (s.body.length < 200) return false;
      // Skip the last 1 sections (typically "next steps" / CTA).
      if (idx >= sections.length - 1) return false;
      return true;
    });

  const chosen = candidates.slice(0, max);
  console.log(`   Generating ${chosen.length} images…`);

  const updated = [...sections];
  const inlineImages: Array<{
    url: string;
    alt: string;
    prompt: string;
    anchor: string;
  }> = [];

  for (let i = 0; i < chosen.length; i++) {
    const { s, idx } = chosen[i];
    console.log(`\n🖼️  [${i + 1}/${chosen.length}] Section: ${s.title}`);
    try {
      const prompt = await imagePromptForSection({
        articleTitle: post.title as string,
        sectionTitle: s.title,
        sectionExcerpt: s.body,
      });
      console.log(`     Prompt: ${prompt.slice(0, 90)}…`);

      const img = await generateImage(prompt);
      const buf = Buffer.from(img.base64, "base64");
      const stored = await processAndStoreImage(buf, {
        targetWidth: 1400,
        aspectRatio: 3 / 2,
        use: "post-inline",
        prompt,
        alt: s.title,
        postId: String(post._id),
      });

      const alt = await altForImage({
        articleTitle: post.title as string,
        sectionTitle: s.title,
        prompt,
      });
      const md = `![${alt}](${stored.url})`;
      updated[idx] = insertImageIntoSection(updated[idx], md);
      inlineImages.push({ url: stored.url, alt, prompt, anchor: stored.parentId });
      console.log(`     ✓ ${stored.url}`);
    } catch (e) {
      console.error(`     ✕ failed: ${(e as Error).message}`);
    }
  }

  const newBody = joinSections(intro, updated);

  await posts.updateOne(
    { _id: post._id as ObjectId },
    {
      $set: {
        body: newBody,
        inlineImages,
        updatedAt: new Date(),
      },
    },
  );
  console.log(`\n💾 Saved ${inlineImages.length} new inline images to /${slug}`);
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
