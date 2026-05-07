"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateText, generateImage } from "@/lib/gemini";
import { processAndStoreImage } from "@/lib/images";
import { connectMongoose } from "@/lib/db/mongoose";
import { Post } from "@/lib/db/models/Post";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { extractJson } from "@/lib/json";
import { site } from "@/lib/site";

/**
 * All actions in this file are designed to be called from the post editor as
 * "AI assist" buttons. Each one returns plain JSON the editor merges into its
 * form state. Image generators write directly to the database (the post
 * record) because that's the shortest path from "click button" to "image is
 * persisted and visible".
 */

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const Ctx = z.object({
  title: z.string().trim().min(2).max(300),
  focusKeyword: z.string().trim().max(160).optional().or(z.literal("")),
  keywords: z.array(z.string()).optional(),
  body: z.string().trim().max(200000).optional(),
  audience: z.string().trim().max(300).optional(),
});

type Ctx = z.infer<typeof Ctx>;

function parseCtx(formData: FormData): Result<Ctx> {
  const parsed = Ctx.safeParse({
    title: formData.get("title") ?? "",
    focusKeyword: formData.get("focusKeyword") ?? "",
    keywords: formData.getAll("keywords").map(String).filter(Boolean),
    body: formData.get("body") ?? "",
    audience: formData.get("audience") ?? "",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  return { ok: true, data: parsed.data };
}

const SYSTEM_BASE = `You are a senior content strategist for ${site.brand}, an SEO + digital marketing + AI services studio.
Audience: founders, CMOs, and growth marketers in India, the US, UK, and EU.
Voice: clear, direct, practical. No corporate fluff. Show, don't tell.
Use plain text unless asked for JSON. Never invent statistics. When citing examples, use widely-known public companies.`;

// ---------------------------------------------------------------------------
// 1. Excerpt
// ---------------------------------------------------------------------------
export async function aiGenerateExcerpt(
  formData: FormData,
): Promise<Result<{ excerpt: string }>> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Write a single-sentence article excerpt for this blog post.

Title: ${ctx.data.title}
${ctx.data.focusKeyword ? `Focus keyword: ${ctx.data.focusKeyword}` : ""}
${ctx.data.body ? `Body (first 2000 chars):\n${ctx.data.body.slice(0, 2000)}` : ""}

Rules:
- 140–160 characters total. Hard cap at 160.
- Mention the focus keyword once if it fits naturally; do not force it.
- No marketing fluff. Make the value clear in plain English.
- No quotes, no markdown.`,
      { system: SYSTEM_BASE, temperature: 0.7, maxOutputTokens: 200 },
    );
    const excerpt = text.trim().replace(/^["']|["']$/g, "").slice(0, 320);
    return { ok: true, data: { excerpt } };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 2. Keyword strategy
// ---------------------------------------------------------------------------
export async function aiGenerateKeywords(
  formData: FormData,
): Promise<
  Result<{ focusKeyword: string; keywords: string[] }>
> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Suggest one strong focus keyword and 8 secondary/long-tail keywords for this article.

Title: ${ctx.data.title}
${ctx.data.body ? `Excerpt of body:\n${ctx.data.body.slice(0, 1500)}` : ""}

Return strict JSON:
{
  "focusKeyword": "...",
  "keywords": ["...", "...", "...", "...", "...", "...", "...", "..."]
}

Rules:
- Focus keyword: 1–4 words, real search demand, matches search intent.
- Secondary keywords: mix of long-tail variations, "vs" comparisons, "how to" forms, and AEO-friendly question phrasings ("what is X", "how does X work", etc).
- All lowercase. No keyword stuffing variations of the same phrase.`,
      { system: SYSTEM_BASE, temperature: 0.6, maxOutputTokens: 600, json: true },
    );
    const data = extractJson<{ focusKeyword: string; keywords: string[] }>(text);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 3. SEO title + meta description
// ---------------------------------------------------------------------------
export async function aiGenerateSeoMeta(
  formData: FormData,
): Promise<Result<{ seoTitle: string; seoDescription: string }>> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Generate an SEO title tag and meta description for this article.

Title: ${ctx.data.title}
Focus keyword: ${ctx.data.focusKeyword || "(none — infer from title)"}
${ctx.data.body ? `First 1500 chars of body:\n${ctx.data.body.slice(0, 1500)}` : ""}

Return strict JSON:
{ "seoTitle": "...", "seoDescription": "..." }

Rules:
- seoTitle: 50–60 characters. Include the focus keyword near the start. End with a brand suffix " · Saurabh Bhayana" only if it fits within 60 chars.
- seoDescription: 140–155 characters. Include the focus keyword once. End with a benefit or call-to-value (not "click here").
- Both: plain text, no quotes, no markdown.`,
      { system: SYSTEM_BASE, temperature: 0.6, maxOutputTokens: 400, json: true },
    );
    const data = extractJson<{ seoTitle: string; seoDescription: string }>(text);
    return {
      ok: true,
      data: {
        seoTitle: data.seoTitle.trim().slice(0, 200),
        seoDescription: data.seoDescription.trim().slice(0, 300),
      },
    };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 4. Key takeaways (AEO-friendly bullets)
// ---------------------------------------------------------------------------
export async function aiGenerateTakeaways(
  formData: FormData,
): Promise<Result<{ keyTakeaways: string[] }>> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Summarize this article into 5–7 key takeaways. These will appear in a "TL;DR" box at the top of the post and are also used as raw material for AI search engines (ChatGPT, Perplexity, Google AI Overviews) to cite.

Title: ${ctx.data.title}
${ctx.data.focusKeyword ? `Focus keyword: ${ctx.data.focusKeyword}` : ""}
${ctx.data.body ? `Body:\n${ctx.data.body.slice(0, 8000)}` : ""}

Return strict JSON:
{ "keyTakeaways": ["...", "...", "..."] }

Rules:
- 5 to 7 bullets.
- Each bullet: a complete sentence, 90–150 characters, declarative, fact-first.
- Each bullet should be self-contained (LLMs may quote one bullet alone).
- Mention the focus keyword at least once across the set.`,
      { system: SYSTEM_BASE, temperature: 0.5, maxOutputTokens: 800, json: true },
    );
    const data = extractJson<{ keyTakeaways: string[] }>(text);
    return {
      ok: true,
      data: { keyTakeaways: data.keyTakeaways.map((s) => s.trim()).filter(Boolean) },
    };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 5. FAQ block (AEO/GEO bait)
// ---------------------------------------------------------------------------
export async function aiGenerateFaqs(
  formData: FormData,
): Promise<Result<{ faqs: Array<{ question: string; answer: string }> }>> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Generate 5 FAQ pairs for this article. They will become an FAQ section at the end of the post AND a FAQPage JSON-LD schema. Phrase the questions exactly as a buyer would type them into Google or ask ChatGPT.

Title: ${ctx.data.title}
${ctx.data.focusKeyword ? `Focus keyword: ${ctx.data.focusKeyword}` : ""}
${ctx.data.body ? `Body excerpt:\n${ctx.data.body.slice(0, 6000)}` : ""}

Return strict JSON:
{
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}

Rules:
- 5 entries.
- Questions: natural language, 6–14 words, end with "?". Real "people also ask" style.
- Answers: 1–3 sentences, 200–500 characters. Include the focus keyword in at least 2 answers. No bullet lists.
- Don't repeat the article's section headings.`,
      { system: SYSTEM_BASE, temperature: 0.6, maxOutputTokens: 1500, json: true },
    );
    const data = extractJson<{
      faqs: Array<{ question: string; answer: string }>;
    }>(text);
    return {
      ok: true,
      data: {
        faqs: data.faqs
          .map((f) => ({
            question: f.question.trim(),
            answer: f.answer.trim(),
          }))
          .filter((f) => f.question && f.answer),
      },
    };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 6. Social posts
// ---------------------------------------------------------------------------
export async function aiGenerateSocial(
  formData: FormData,
): Promise<
  Result<{
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
  }>
> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Write four platform-native social posts to promote this blog article.

Title: ${ctx.data.title}
${ctx.data.focusKeyword ? `Focus keyword: ${ctx.data.focusKeyword}` : ""}
${ctx.data.body ? `Body excerpt:\n${ctx.data.body.slice(0, 4000)}` : ""}

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
      { system: SYSTEM_BASE, temperature: 0.7, maxOutputTokens: 2500, json: true },
    );
    const data = extractJson<{
      twitter: string;
      linkedin: string;
      facebook: string;
      instagram: string;
    }>(text);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 7. AI optimization audit
// ---------------------------------------------------------------------------
export async function aiOptimizationAudit(
  formData: FormData,
): Promise<Result<{ score: number; checks: Array<{ label: string; ok: boolean; note?: string }> }>> {
  await requireAdmin();
  const ctx = parseCtx(formData);
  if (!ctx.ok) return ctx;

  try {
    const text = await generateText(
      `Audit this blog post for on-page SEO + AEO + GEO readiness. Return a strict JSON checklist.

Title: ${ctx.data.title}
Focus keyword: ${ctx.data.focusKeyword || "(missing)"}
Secondary keywords: ${(ctx.data.keywords ?? []).join(", ") || "(missing)"}
Body length (chars): ${(ctx.data.body ?? "").length}
Body:
${(ctx.data.body ?? "").slice(0, 12000)}

Return:
{
  "score": 0-100,
  "checks": [
    { "label": "Focus keyword in title", "ok": true|false, "note": "optional 1-line hint if not ok" },
    ...
  ]
}

Cover at minimum:
- focus keyword appears in title, first 100 words, at least 2 H2s, conclusion
- meta-friendly title length, meta description length
- one H1 only, sensible H2/H3 hierarchy
- internal links present (hint paths the writer should add)
- alt text for images (look for ![] in body)
- AEO: question-style H2s, FAQ section present, key takeaways early
- GEO: declarative facts, citations to public sources, structured snippets (lists, definitions)
- E-E-A-T: author byline, dates, real examples`,
      { system: SYSTEM_BASE, temperature: 0.4, maxOutputTokens: 2500, json: true },
    );
    const data = extractJson<{
      score: number;
      checks: Array<{ label: string; ok: boolean; note?: string }>;
    }>(text);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 8. Cover image (Gemini → sharp variants → GridFS)
// ---------------------------------------------------------------------------
export async function aiGenerateCoverImage(
  formData: FormData,
): Promise<Result<{ url: string; alt: string; prompt: string }>> {
  await requireAdmin();
  const promptHint = String(formData.get("prompt") ?? "").trim();
  const ctxRes = parseCtx(formData);
  if (!ctxRes.ok) return ctxRes;
  const ctx = ctxRes.data;

  const prompt =
    promptHint ||
    `Editorial 16:9 cover image for an article titled "${ctx.title}". Cinematic, dark navy/charcoal background, subtle electric-cyan accent lighting. Modern minimalist composition with abstract data flow / neural network elements. No text on image. No people. High detail, soft global illumination.`;

  try {
    const image = await generateImage(prompt);
    const buffer = Buffer.from(image.base64, "base64");
    const stored = await processAndStoreImage(buffer, {
      targetWidth: 1600,
      aspectRatio: 1600 / 840,
      use: "post-cover",
      prompt,
      alt: `Cover image: ${ctx.title}`,
    });

    // Optimize alt text via the text model
    let alt = `Cover image: ${ctx.title}`;
    try {
      alt = (
        await generateText(
          `Write a SEO-friendly alt text for a blog cover image.
Article title: ${ctx.title}
Image was generated from this prompt: ${prompt}
Rules: under 125 chars, descriptive of subject, no quotes, no marketing fluff.`,
          { temperature: 0.3, maxOutputTokens: 120 },
        )
      ).trim().replace(/^["']|["']$/g, "");
    } catch {
      // keep fallback alt
    }

    await recordActivity({
      action: "post.ai_cover",
      entity: "post",
      summary: `Generated cover for "${ctx.title}"`,
      metadata: { parentId: stored.parentId },
    });

    return { ok: true, data: { url: stored.url, alt: alt.slice(0, 300), prompt } };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// 9. Inline image
// ---------------------------------------------------------------------------
export async function aiGenerateInlineImage(
  formData: FormData,
): Promise<Result<{ url: string; alt: string; prompt: string; markdown: string }>> {
  await requireAdmin();
  const ctxRes = parseCtx(formData);
  if (!ctxRes.ok) return ctxRes;
  const ctx = ctxRes.data;

  const promptInput = String(formData.get("prompt") ?? "").trim();
  if (!promptInput) {
    return { ok: false, error: "Prompt is required for inline images." };
  }

  const styleSuffix =
    "Editorial illustration, 3:2 aspect ratio, dark background, cyan + white accent palette, no text in image, abstract data-driven visual.";
  const prompt = `${promptInput}. ${styleSuffix}`;

  try {
    const image = await generateImage(prompt);
    const buffer = Buffer.from(image.base64, "base64");
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
          `Write a 1-line, SEO-friendly alt text for this AI-generated illustration. Subject: ${promptInput}. Article: ${ctx.title}. Hard cap 125 chars. Plain English, no quotes.`,
          { temperature: 0.3, maxOutputTokens: 100 },
        )
      ).trim().replace(/^["']|["']$/g, "");
    } catch {
      // keep default
    }

    const markdown = `![${alt}](${stored.url})`;

    await recordActivity({
      action: "post.ai_inline_image",
      entity: "post",
      summary: `Generated inline image for "${ctx.title}"`,
      metadata: { parentId: stored.parentId, prompt: promptInput },
    });

    return {
      ok: true,
      data: { url: stored.url, alt, prompt, markdown },
    };
  } catch (e) {
    return { ok: false, error: errMsg(e) };
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  return "Something went wrong while talking to Gemini.";
}

/**
 * Save AI-generated cover image fields onto the post record (when editing
 * an existing draft). Used by the "Generate cover" button on the edit page.
 */
export async function saveCoverImage(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const url = String(formData.get("url") ?? "");
  const alt = String(formData.get("alt") ?? "");
  const prompt = String(formData.get("prompt") ?? "");
  if (!id || !url) return;
  await connectMongoose();
  await Post.updateOne(
    { _id: id },
    {
      $set: {
        coverUrl: url,
        coverAlt: alt,
        coverPrompt: prompt,
        seoOgImage: url,
        updatedAt: new Date(),
      },
    },
  );
  revalidatePath(`/sb-console/posts/${id}`);
}
