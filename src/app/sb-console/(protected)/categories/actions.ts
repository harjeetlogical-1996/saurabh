"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Category } from "@/lib/db/models/Category";
import { Post } from "@/lib/db/models/Post";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { slugify } from "@/lib/slug";

const Input = z.object({
  name: z.string().trim().min(1).max(60),
  slug: z.string().trim().max(80).optional().or(z.literal("")),
  description: z.string().trim().max(300).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

function bumpAll() {
  revalidatePath("/sb-console/categories");
  revalidatePath("/sb-console/posts");
  revalidatePath("/blog");
  revalidatePath("/", "layout");
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base) || "category";
  let candidate = root;
  let i = 2;
  for (let attempt = 0; attempt < 10; attempt++) {
    const existing = await Category.findOne({ slug: candidate }).lean();
    if (!existing || String(existing._id) === excludeId) return candidate;
    candidate = `${root}-${i++}`;
  }
  return `${root}-${Date.now()}`;
}

export async function createCategory(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = Input.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") ?? "",
    description: formData.get("description") ?? "",
    order: formData.get("order"),
    published: formData.get("published") ?? "",
  });
  if (!parsed.success) return;
  await connectMongoose();
  const slug = await uniqueSlug(parsed.data.slug || parsed.data.name);
  const doc = await Category.create({
    name: parsed.data.name,
    slug,
    description: parsed.data.description || undefined,
    order: parsed.data.order,
    published: parsed.data.published,
  });
  await recordActivity({
    action: "category.create",
    entity: "category",
    entityId: String(doc._id),
    summary: parsed.data.name,
  });
  bumpAll();
}

export async function updateCategory(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = Input.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug") ?? "",
    description: formData.get("description") ?? "",
    order: formData.get("order"),
    published: formData.get("published") ?? "",
  });
  if (!parsed.success) return;
  await connectMongoose();
  const existing = await Category.findById(id).lean();
  if (!existing) return;

  let slug = existing.slug;
  const requestedSlug = parsed.data.slug ? slugify(parsed.data.slug) : "";
  if (requestedSlug && requestedSlug !== existing.slug) {
    slug = await uniqueSlug(requestedSlug, id);
  }

  await Category.updateOne(
    { _id: id },
    {
      $set: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description || undefined,
        order: parsed.data.order,
        published: parsed.data.published,
        updatedAt: new Date(),
      },
    },
  );

  // If the display name changed, propagate to posts that used the old name as their `tag`
  // so the public site stays consistent.
  if (existing.name !== parsed.data.name) {
    await Post.updateMany(
      { tag: existing.name },
      { $set: { tag: parsed.data.name } },
    );
  }

  await recordActivity({
    action: "category.update",
    entity: "category",
    entityId: id,
    summary: parsed.data.name,
  });
  bumpAll();
}

export async function deleteCategory(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Category.findById(id).lean();
  if (!doc) return;
  // Refuse to delete if posts still reference this category by name.
  const inUse = await Post.countDocuments({ tag: doc.name });
  if (inUse > 0) {
    await recordActivity({
      action: "category.delete.blocked",
      entity: "category",
      entityId: id,
      summary: `Blocked: ${inUse} post(s) still tagged "${doc.name}"`,
    });
    return;
  }
  await Category.deleteOne({ _id: id });
  await recordActivity({
    action: "category.delete",
    entity: "category",
    entityId: id,
    summary: doc.name,
  });
  bumpAll();
}

export async function seedDefaultCategories(): Promise<void> {
  await requireAdmin();
  await connectMongoose();
  const existing = await Category.countDocuments();
  if (existing > 0) return;
  const defaults = [
    { name: "AI SEO", description: "GEO, AEO, and LLMO playbooks for ranking inside AI search engines.", order: 0 },
    { name: "AI Tools", description: "Tools, stacks, and workflows for marketers in the AI era.", order: 1 },
    { name: "AI Content", description: "Content strategy, hybrid workflows, and what actually ranks on Google.", order: 2 },
    { name: "Digital Marketing", description: "Paid, organic, and brand strategy for founder-led companies.", order: 3 },
    { name: "Web Development", description: "Conversion-focused websites, performance, and frontend craft.", order: 4 },
  ];
  for (const c of defaults) {
    const slug = await uniqueSlug(c.name);
    await Category.create({
      name: c.name,
      slug,
      description: c.description,
      order: c.order,
      published: true,
    });
  }
  await recordActivity({
    action: "category.seed",
    entity: "category",
    summary: `Seeded ${defaults.length} starter categories`,
  });
  bumpAll();
}
