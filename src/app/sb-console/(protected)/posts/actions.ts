"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Post } from "@/lib/db/models/Post";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { slugify } from "@/lib/slug";

/**
 * Accept either a full URL (https://...) or a same-origin path (/api/...).
 */
const urlOrPath = z
  .string()
  .trim()
  .max(1000)
  .refine(
    (v) =>
      v === "" ||
      v.startsWith("/") ||
      /^https?:\/\//i.test(v),
    "Must be a URL or absolute path (/...)",
  )
  .optional()
  .or(z.literal(""));

const Input = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().max(200).optional().or(z.literal("")),
  excerpt: z.string().trim().max(400).optional().or(z.literal("")),
  body: z.string().trim().min(1).max(200000),
  coverUrl: urlOrPath,
  coverAlt: z.string().trim().max(300).optional().or(z.literal("")),
  coverPrompt: z.string().trim().max(2000).optional().or(z.literal("")),
  seoOgImage: urlOrPath,
  tag: z.string().trim().max(50).optional().or(z.literal("")),
  readMin: z.coerce.number().int().min(1).max(120).default(5),

  focusKeyword: z.string().trim().max(160).optional().or(z.literal("")),

  // Comma-separated input field; we split server-side.
  keywordsCsv: z.string().trim().max(2000).optional().or(z.literal("")),

  // Newline-separated text area; one takeaway per line.
  takeawaysText: z.string().trim().max(5000).optional().or(z.literal("")),

  // FAQs as JSON in a hidden field (managed by client UI).
  faqsJson: z.string().trim().max(20000).optional().or(z.literal("")),

  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),

  socialTwitter: z.string().trim().max(1000).optional().or(z.literal("")),
  socialLinkedin: z.string().trim().max(4000).optional().or(z.literal("")),
  socialFacebook: z.string().trim().max(2000).optional().or(z.literal("")),
  socialInstagram: z.string().trim().max(2500).optional().or(z.literal("")),

  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

type ParsedInput = z.infer<typeof Input>;

function bumpAll(slug?: string) {
  revalidatePath("/sb-console/posts");
  revalidatePath("/blog");
  revalidatePath("/", "layout"); // home blog teaser
  if (slug) revalidatePath(`/${slug}`);
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || "post";
  let candidate = root;
  let i = 2;
  for (let attempt = 0; attempt < 10; attempt++) {
    const existing = await Post.findOne({ slug: candidate }).lean();
    if (!existing || String(existing._id) === excludeId) return candidate;
    candidate = `${root}-${i++}`;
  }
  return `${root}-${Date.now()}`;
}

function parseForm(fd: FormData) {
  return Input.safeParse({
    title: fd.get("title"),
    slug: fd.get("slug") ?? "",
    excerpt: fd.get("excerpt") ?? "",
    body: fd.get("body"),
    coverUrl: fd.get("coverUrl") ?? "",
    coverAlt: fd.get("coverAlt") ?? "",
    coverPrompt: fd.get("coverPrompt") ?? "",
    seoOgImage: fd.get("seoOgImage") ?? "",
    tag: fd.get("tag") ?? "",
    readMin: fd.get("readMin"),

    focusKeyword: fd.get("focusKeyword") ?? "",
    keywordsCsv: fd.get("keywordsCsv") ?? "",
    takeawaysText: fd.get("takeawaysText") ?? "",
    faqsJson: fd.get("faqsJson") ?? "",

    seoTitle: fd.get("seoTitle") ?? "",
    seoDescription: fd.get("seoDescription") ?? "",

    socialTwitter: fd.get("socialTwitter") ?? "",
    socialLinkedin: fd.get("socialLinkedin") ?? "",
    socialFacebook: fd.get("socialFacebook") ?? "",
    socialInstagram: fd.get("socialInstagram") ?? "",

    published: fd.get("published") ?? "",
  });
}

function shape(parsed: ParsedInput) {
  const keywords =
    parsed.keywordsCsv && parsed.keywordsCsv.trim().length > 0
      ? parsed.keywordsCsv
          .split(/[,;\n]/)
          .map((k) => k.trim().toLowerCase())
          .filter(Boolean)
      : [];

  const keyTakeaways =
    parsed.takeawaysText && parsed.takeawaysText.trim().length > 0
      ? parsed.takeawaysText
          .split(/\r?\n/)
          .map((s) => s.trim().replace(/^[-•]\s*/, ""))
          .filter(Boolean)
      : [];

  let faqs: Array<{ question: string; answer: string }> = [];
  if (parsed.faqsJson && parsed.faqsJson.trim().length > 0) {
    try {
      const arr = JSON.parse(parsed.faqsJson);
      if (Array.isArray(arr)) {
        faqs = arr
          .map((f) => ({
            question: String(f?.question ?? "").trim(),
            answer: String(f?.answer ?? "").trim(),
          }))
          .filter((f) => f.question && f.answer);
      }
    } catch {
      // ignore — invalid JSON keeps faqs empty
    }
  }

  return {
    title: parsed.title,
    excerpt: parsed.excerpt || undefined,
    body: parsed.body,
    coverUrl: parsed.coverUrl || undefined,
    coverAlt: parsed.coverAlt || undefined,
    coverPrompt: parsed.coverPrompt || undefined,
    seoOgImage: parsed.seoOgImage || undefined,
    tag: parsed.tag || undefined,
    readMin: parsed.readMin,
    focusKeyword: parsed.focusKeyword || undefined,
    keywords,
    keyTakeaways,
    faqs,
    seoTitle: parsed.seoTitle || undefined,
    seoDescription: parsed.seoDescription || undefined,
    social: {
      twitter: parsed.socialTwitter || undefined,
      linkedin: parsed.socialLinkedin || undefined,
      facebook: parsed.socialFacebook || undefined,
      instagram: parsed.socialInstagram || undefined,
    },
  };
}

export async function createPost(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const slug = await uniqueSlug(parsed.data.slug || parsed.data.title);
  const author = session.user as unknown as { id?: string; name?: string };
  const data = shape(parsed.data);
  const doc = await Post.create({
    ...data,
    slug,
    published: parsed.data.published,
    publishedAt: parsed.data.published ? new Date() : undefined,
    authorId: author?.id,
    authorName: author?.name,
  });
  await recordActivity({
    action: "post.create",
    entity: "post",
    entityId: String(doc._id),
    summary: parsed.data.title,
  });
  bumpAll(slug);
  redirect(`/sb-console/posts/${doc._id}`);
}

export async function updatePost(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const existing = await Post.findById(id).lean();
  if (!existing) return;

  let slug = existing.slug;
  const requestedSlug = parsed.data.slug ? slugify(parsed.data.slug) : "";
  if (requestedSlug && requestedSlug !== existing.slug) {
    slug = await uniqueSlug(requestedSlug, id);
  }

  const wasPublished = existing.published;
  const becomesPublished = parsed.data.published;
  const data = shape(parsed.data);

  await Post.updateOne(
    { _id: id },
    {
      $set: {
        ...data,
        slug,
        published: becomesPublished,
        publishedAt:
          becomesPublished && !wasPublished
            ? new Date()
            : becomesPublished
              ? existing.publishedAt ?? new Date()
              : undefined,
        updatedAt: new Date(),
      },
    },
  );
  await recordActivity({
    action: "post.update",
    entity: "post",
    entityId: id,
    summary: parsed.data.title,
  });
  bumpAll(slug);
  if (existing.slug !== slug) bumpAll(existing.slug);
}

export async function deletePost(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Post.findByIdAndDelete(id).lean();
  await recordActivity({
    action: "post.delete",
    entity: "post",
    entityId: id,
    summary: doc?.title,
  });
  bumpAll(doc?.slug);
  redirect("/sb-console/posts");
}
