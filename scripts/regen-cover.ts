/**
 * Regenerate the cover image for an article using a content-specific prompt
 * derived from the article's actual title + opening paragraphs.
 *
 *   npm run regen:cover -- --slug=<slug>
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

const args = process.argv.slice(2);
const slug = args.find((a) => a.startsWith("--slug="))?.slice("--slug=".length);
if (!slug) {
  console.error("❌ --slug=... required");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");
  const post = await posts.findOne({ slug });
  if (!post) {
    console.error("❌ Post not found");
    process.exit(1);
  }

  console.log(`📄 Regenerating cover for: ${post.title}`);

  // 1. Ask Gemini to write a concrete, content-aware cover prompt.
  const promptDirector = await generateText(
    `Art-direct a magazine-style cover illustration for this blog post.

Title: ${post.title}
Excerpt: ${(post.excerpt as string) || ""}
First 2000 chars of body:
${((post.body as string) || "").slice(0, 2000)}

Write ONE single-line image prompt for the cover. The image MUST visually
represent the actual subject of the article (NOT generic AI abstract clouds).
Pick the strongest concrete visual metaphor from the body — for example, a
browser window showing an AI search result; a magnified view of a citation
in a chat reply; a real-looking dashboard showing brand-mention rankings;
a stylized "before/after" of Google blue links vs an AI Overview.

Style:
- Photo-realistic mock UI / desk scene OR clean editorial illustration in
  flat-design style OR a stylized 3D render of the actual object.
- Cinematic, premium magazine quality.
- Dark navy or charcoal background, with electric-cyan accent lighting.
- 16:9 aspect ratio.
- No people, no faces, no real brand names or logos, no celebrity figures.
- Faux text on screens is fine. No promotional copy.

Return only the prompt sentence — vivid, literal, ~30-60 words.`,
    { temperature: 0.8, maxOutputTokens: 350 },
  );
  const prompt = promptDirector.trim().replace(/^["']|["']$/g, "");
  console.log(`   Prompt: ${prompt}`);

  // 2. Delete the previous cover variants if we know its parentId.
  const oldCover: string | undefined = post.coverUrl as string | undefined;
  if (oldCover && oldCover.startsWith("/api/blog-images/")) {
    const oldId = oldCover.split("/").pop()!;
    try {
      const removed = await deleteByParentId(oldId);
      console.log(`   Deleted ${removed} old cover variant file(s)`);
    } catch {
      /* best-effort */
    }
  }

  // 3. Generate the new cover.
  const img = await generateImage(prompt);
  const buffer = Buffer.from(img.base64, "base64");
  const stored = await processAndStoreImage(buffer, {
    targetWidth: 1600,
    aspectRatio: 1600 / 900,
    use: "post-cover",
    prompt,
    alt: `Cover image: ${post.title}`,
    postId: String(post._id),
  });

  // 4. Alt text.
  let alt = `Cover image: ${post.title}`;
  try {
    alt = (
      await generateText(
        `Write SEO-friendly alt text for an article cover.
Article title: ${post.title}
Image generated from this prompt: ${prompt}
Hard cap: 125 chars. Plain English. Describe the actual visual subject.
No quotes, no marketing copy.`,
        { temperature: 0.3, maxOutputTokens: 120 },
      )
    )
      .trim()
      .replace(/^["']|["']$/g, "");
  } catch {
    /* keep fallback */
  }

  await posts.updateOne(
    { _id: post._id as ObjectId },
    {
      $set: {
        coverUrl: stored.url,
        coverAlt: alt.slice(0, 300),
        coverPrompt: prompt,
        seoOgImage: stored.url,
        updatedAt: new Date(),
      },
    },
  );

  console.log(`✓ ${stored.url}`);
  console.log(`✓ alt: ${alt}`);
  console.log(`💾 Saved to /${slug}`);
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
