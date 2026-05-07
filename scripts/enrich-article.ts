/**
 * Enrich a published-or-draft article: generate cover image, inline images,
 * and social posts via Gemini, then save everything back to the post.
 *
 *   npm run enrich -- --slug=ai-seo-2026-geo-aeo-llmo-guide
 *
 * Flags:
 *   --slug=...                 (required) post to enrich
 *   --cover                    generate a new cover image
 *   --inline-image="prompt"    generate one inline image; can be repeated
 *   --social                   regenerate all 4 social posts
 *   --all                      shorthand for --cover --social
 *
 * The script imports our existing helpers in src/lib so it shares the same
 * Gemini + sharp + GridFS pipeline the admin UI uses. That guarantees
 * "looks identical to clicking the button in /sb-console".
 */
import { MongoClient, ObjectId } from "mongodb";

// We use tsx-style relative imports because tsx will compile TS on the fly.
import { generateImage, generateText, Type } from "../src/lib/gemini";
import { processAndStoreImage } from "../src/lib/images";
import { extractJson } from "../src/lib/json";
import { site } from "../src/lib/site";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "saurabh";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI required");
  process.exit(1);
}

type Args = {
  slug?: string;
  cover: boolean;
  social: boolean;
  inlineImages: string[];
};

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const out: Args = { cover: false, social: false, inlineImages: [] };
  for (const a of args) {
    if (a.startsWith("--slug=")) out.slug = a.slice("--slug=".length);
    else if (a === "--cover") out.cover = true;
    else if (a === "--social") out.social = true;
    else if (a === "--all") {
      out.cover = true;
      out.social = true;
    } else if (a.startsWith("--inline-image=")) {
      out.inlineImages.push(a.slice("--inline-image=".length));
    }
  }
  return out;
}

const SYSTEM = `You are a senior content strategist for ${site.brand}, an SEO + digital marketing + AI services studio. Audience: founders, CMOs, growth marketers in India, US, UK, EU. Voice: clear, direct, practical. Show, don't tell.`;

async function regenerateCover(post: {
  _id: ObjectId;
  title: string;
  body: string;
  slug: string;
}) {
  const prompt = `Editorial 16:9 cover image for an article titled "${post.title}". Cinematic, dark navy/charcoal background, subtle electric-cyan accent lighting. Modern minimalist composition with abstract data flow / neural network elements. No text on image. No people. High detail, soft global illumination.`;

  console.log(`  → Calling Gemini image model…`);
  const img = await generateImage(prompt);
  const buffer = Buffer.from(img.base64, "base64");

  console.log(`  → Optimizing & uploading variants…`);
  const stored = await processAndStoreImage(buffer, {
    targetWidth: 1600,
    aspectRatio: 1600 / 840,
    use: "post-cover",
    prompt,
    alt: `Cover image: ${post.title}`,
  });

  let alt = `Cover image: ${post.title}`;
  try {
    alt = (
      await generateText(
        `Write a SEO-friendly alt text for a blog cover image.
Article title: ${post.title}
Image was generated from this prompt: ${prompt}
Rules: under 125 chars, descriptive of subject, no quotes, no marketing fluff.`,
        { temperature: 0.3, maxOutputTokens: 120 },
      )
    )
      .trim()
      .replace(/^["']|["']$/g, "");
  } catch {
    // keep fallback alt
  }

  return {
    coverUrl: stored.url,
    coverAlt: alt.slice(0, 300),
    coverPrompt: prompt,
    seoOgImage: stored.url,
  };
}

async function regenerateInline(
  post: { title: string },
  promptInput: string,
): Promise<{ url: string; alt: string; prompt: string; markdown: string }> {
  const styleSuffix =
    "Editorial illustration, 3:2 aspect ratio, dark background, cyan + white accent palette, no text in image, abstract data-driven visual.";
  const prompt = `${promptInput}. ${styleSuffix}`;
  console.log(`  → Generating inline image: "${promptInput.slice(0, 60)}…"`);
  const img = await generateImage(prompt);
  const buffer = Buffer.from(img.base64, "base64");
  const stored = await processAndStoreImage(buffer, {
    targetWidth: 1200,
    aspectRatio: 3 / 2,
    use: "post-inline",
    prompt,
    alt: promptInput.slice(0, 200),
  });

  let alt = promptInput.slice(0, 200);
  try {
    alt = (
      await generateText(
        `Write a 1-line, SEO-friendly alt text for this AI-generated illustration. Subject: ${promptInput}. Article: ${post.title}. Hard cap 125 chars. Plain English, no quotes.`,
        { temperature: 0.3, maxOutputTokens: 100 },
      )
    )
      .trim()
      .replace(/^["']|["']$/g, "");
  } catch {
    /* keep default */
  }

  return {
    url: stored.url,
    alt,
    prompt,
    markdown: `![${alt}](${stored.url})`,
  };
}

async function regenerateSocial(post: {
  title: string;
  body: string;
  focusKeyword?: string;
}): Promise<{
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
}> {
  console.log(`  → Generating social posts (4 platforms)…`);
  const text = await generateText(
    `Write four platform-native social posts to promote this blog article.

Title: ${post.title}
${post.focusKeyword ? `Focus keyword: ${post.focusKeyword}` : ""}
Body excerpt:
${post.body.slice(0, 4000)}

Return strict JSON:
{
  "twitter": "...",
  "linkedin": "...",
  "facebook": "...",
  "instagram": "..."
}

Rules per platform:
- twitter: hard cap 270 characters. One strong hook line, one insight, optional ending question. 0–2 hashtags. No emoji clutter.
- linkedin: 800–1300 characters. 4–6 short paragraphs. Open with a 1-line hook (no "I'm thrilled to share"). Add 3–5 relevant hashtags on the last line.
- facebook: 250–500 characters. Plain, conversational. 1–2 hashtags max.
- instagram: 400–700 characters. Punchier, line breaks ok. Ends with 5–8 niche hashtags on a new line.

Each post should make the reader want to click the article without revealing every conclusion.`,
    {
      system: SYSTEM,
      temperature: 0.7,
      maxOutputTokens: 2500,
      schema: {
        type: Type.OBJECT,
        properties: {
          twitter: { type: Type.STRING },
          linkedin: { type: Type.STRING },
          facebook: { type: Type.STRING },
          instagram: { type: Type.STRING },
        },
        required: ["twitter", "linkedin", "facebook", "instagram"],
      },
    },
  );
  return extractJson(text);
}

async function main() {
  const args = parseArgs();
  if (!args.slug) {
    console.error("❌ --slug=... is required");
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI!);
  await client.connect();
  const db = client.db(MONGODB_DB);
  const posts = db.collection("posts");

  const post = await posts.findOne({ slug: args.slug });
  if (!post) {
    console.error(`❌ Post not found for slug: ${args.slug}`);
    process.exit(1);
  }

  console.log(`📄 Enriching: ${post.title}`);
  console.log(`   Slug: /blog/${post.slug}`);
  console.log("");

  const $set: Record<string, unknown> = { updatedAt: new Date() };
  let bodyAppendix = "";

  // 1. Cover
  if (args.cover) {
    console.log("🖼️  Generating cover…");
    try {
      const cover = await regenerateCover({
        _id: post._id as ObjectId,
        title: post.title as string,
        body: (post.body as string) || "",
        slug: post.slug as string,
      });
      Object.assign($set, cover);
      console.log(`  ✓ ${cover.coverUrl}`);
      console.log(`  ✓ alt: ${cover.coverAlt}`);
    } catch (e) {
      console.error("  ✕ cover failed:", (e as Error).message);
    }
    console.log("");
  }

  // 2. Inline images (each becomes a markdown insertion at the end of body)
  for (const prompt of args.inlineImages) {
    console.log("🖼️  Generating inline image…");
    try {
      const inline = await regenerateInline(
        { title: post.title as string },
        prompt,
      );
      bodyAppendix += `\n\n${inline.markdown}\n`;
      console.log(`  ✓ ${inline.url}`);
    } catch (e) {
      console.error("  ✕ inline failed:", (e as Error).message);
    }
    console.log("");
  }
  if (bodyAppendix.length > 0) {
    $set.body = (post.body as string) + bodyAppendix;
  }

  // 3. Social
  if (args.social) {
    console.log("📣 Generating social posts…");
    try {
      const social = await regenerateSocial({
        title: post.title as string,
        body: (post.body as string) || "",
        focusKeyword: post.focusKeyword as string | undefined,
      });
      $set.social = social;
      for (const k of ["twitter", "linkedin", "facebook", "instagram"] as const) {
        const len = social[k]?.length ?? 0;
        console.log(`  ✓ ${k.padEnd(9)} ${len.toString().padStart(4)} chars`);
      }
    } catch (e) {
      console.error("  ✕ social failed:", (e as Error).message);
    }
    console.log("");
  }

  if (Object.keys($set).length > 1) {
    await posts.updateOne({ _id: post._id }, { $set });
    console.log(`💾 Saved updates to /blog/${post.slug}`);
  } else {
    console.log("Nothing to update.");
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
