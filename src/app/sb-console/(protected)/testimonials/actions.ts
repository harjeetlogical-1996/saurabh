"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Testimonial } from "@/lib/db/models/Testimonial";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";

const Input = z.object({
  body: z.string().trim().min(1).max(1500),
  name: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200).optional().or(z.literal("")),
  avatarUrl: z.string().trim().url().max(1000).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
  featured: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

function bumpAll() {
  revalidatePath("/sb-console/testimonials");
  revalidatePath("/", "layout");
}

function parseForm(fd: FormData) {
  return Input.safeParse({
    body: fd.get("body"),
    name: fd.get("name"),
    role: fd.get("role") ?? "",
    avatarUrl: fd.get("avatarUrl") ?? "",
    order: fd.get("order"),
    published: fd.get("published") ?? "",
    featured: fd.get("featured") ?? "",
  });
}

export async function createTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const doc = await Testimonial.create({
    body: parsed.data.body,
    name: parsed.data.name,
    role: parsed.data.role || undefined,
    avatarUrl: parsed.data.avatarUrl || undefined,
    order: parsed.data.order,
    published: parsed.data.published,
    featured: parsed.data.featured,
  });
  await recordActivity({
    action: "testimonial.create",
    entity: "testimonial",
    entityId: String(doc._id),
    summary: parsed.data.name,
  });
  bumpAll();
}

export async function updateTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  await Testimonial.updateOne(
    { _id: id },
    {
      $set: {
        body: parsed.data.body,
        name: parsed.data.name,
        role: parsed.data.role || undefined,
        avatarUrl: parsed.data.avatarUrl || undefined,
        order: parsed.data.order,
        published: parsed.data.published,
        featured: parsed.data.featured,
        updatedAt: new Date(),
      },
    },
  );
  await recordActivity({
    action: "testimonial.update",
    entity: "testimonial",
    entityId: id,
    summary: parsed.data.name,
  });
  bumpAll();
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Testimonial.findByIdAndDelete(id).lean();
  await recordActivity({
    action: "testimonial.delete",
    entity: "testimonial",
    entityId: id,
    summary: doc?.name,
  });
  bumpAll();
}

export async function seedTestimonials(): Promise<void> {
  await requireAdmin();
  await connectMongoose();
  const existing = await Testimonial.countDocuments({});
  if (existing > 0) return;
  const { seedTestimonials: list } = await import("@/lib/content/testimonials");
  await Testimonial.insertMany(
    list.map((t, i) => ({
      body: t.body,
      name: t.name,
      role: t.role,
      avatarUrl: t.avatarUrl,
      order: i,
      published: true,
      featured: !!t.featured,
    })),
  );
  await recordActivity({
    action: "testimonial.seed",
    entity: "testimonial",
    summary: `Seeded ${list.length} starter testimonials`,
  });
  bumpAll();
}
