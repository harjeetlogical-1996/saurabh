"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { CaseStudy } from "@/lib/db/models/CaseStudy";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { slugify } from "@/lib/slug";

const Input = z.object({
  client: z.string().trim().min(1).max(120),
  sector: z.string().trim().max(120).optional().or(z.literal("")),
  title: z.string().trim().min(1).max(300),
  metric: z.string().trim().max(60).optional().or(z.literal("")),
  coverUrl: z.string().trim().url().max(1000).optional().or(z.literal("")),
  coverAlt: z.string().trim().max(200).optional().or(z.literal("")),
  summary: z.string().trim().max(2000).optional().or(z.literal("")),
  slug: z.string().trim().max(200).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
  featured: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

function bumpAll() {
  revalidatePath("/sb-console/case-studies");
  revalidatePath("/", "layout");
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || "case";
  let candidate = root;
  let i = 2;
  for (let attempt = 0; attempt < 10; attempt++) {
    const existing = await CaseStudy.findOne({ slug: candidate }).lean();
    if (!existing || String(existing._id) === excludeId) return candidate;
    candidate = `${root}-${i++}`;
  }
  return `${root}-${Date.now()}`;
}

function parseForm(fd: FormData) {
  return Input.safeParse({
    client: fd.get("client"),
    sector: fd.get("sector") ?? "",
    title: fd.get("title"),
    metric: fd.get("metric") ?? "",
    coverUrl: fd.get("coverUrl") ?? "",
    coverAlt: fd.get("coverAlt") ?? "",
    summary: fd.get("summary") ?? "",
    slug: fd.get("slug") ?? "",
    order: fd.get("order"),
    published: fd.get("published") ?? "",
    featured: fd.get("featured") ?? "",
  });
}

export async function createCaseStudy(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const slug = await uniqueSlug(parsed.data.slug || parsed.data.client);
  const doc = await CaseStudy.create({
    slug,
    client: parsed.data.client,
    sector: parsed.data.sector || undefined,
    title: parsed.data.title,
    metric: parsed.data.metric || undefined,
    coverUrl: parsed.data.coverUrl || undefined,
    coverAlt: parsed.data.coverAlt || undefined,
    summary: parsed.data.summary || undefined,
    order: parsed.data.order,
    published: parsed.data.published,
    featured: parsed.data.featured,
  });
  await recordActivity({
    action: "case.create",
    entity: "case-study",
    entityId: String(doc._id),
    summary: parsed.data.client,
  });
  bumpAll();
}

export async function updateCaseStudy(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const existing = await CaseStudy.findById(id).lean();
  if (!existing) return;
  let slug = existing.slug;
  const requested = parsed.data.slug ? slugify(parsed.data.slug) : "";
  if (requested && requested !== existing.slug) {
    slug = await uniqueSlug(requested, id);
  }
  await CaseStudy.updateOne(
    { _id: id },
    {
      $set: {
        slug,
        client: parsed.data.client,
        sector: parsed.data.sector || undefined,
        title: parsed.data.title,
        metric: parsed.data.metric || undefined,
        coverUrl: parsed.data.coverUrl || undefined,
        coverAlt: parsed.data.coverAlt || undefined,
        summary: parsed.data.summary || undefined,
        order: parsed.data.order,
        published: parsed.data.published,
        featured: parsed.data.featured,
        updatedAt: new Date(),
      },
    },
  );
  await recordActivity({
    action: "case.update",
    entity: "case-study",
    entityId: id,
    summary: parsed.data.client,
  });
  bumpAll();
}

export async function deleteCaseStudy(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await CaseStudy.findByIdAndDelete(id).lean();
  await recordActivity({
    action: "case.delete",
    entity: "case-study",
    entityId: id,
    summary: doc?.client,
  });
  bumpAll();
}
