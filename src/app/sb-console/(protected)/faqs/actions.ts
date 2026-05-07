"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Faq } from "@/lib/db/models/Faq";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";

const Input = z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(5000),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

function bumpAll() {
  revalidatePath("/sb-console/faqs");
  revalidatePath("/", "layout");
}

export async function createFaq(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = Input.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    order: formData.get("order"),
    published: formData.get("published") ?? "",
  });
  if (!parsed.success) return;
  await connectMongoose();
  const doc = await Faq.create({ ...parsed.data, page: "home" });
  await recordActivity({
    action: "faq.create",
    entity: "faq",
    entityId: String(doc._id),
    summary: parsed.data.question.slice(0, 120),
  });
  bumpAll();
}

export async function updateFaq(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = Input.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    order: formData.get("order"),
    published: formData.get("published") ?? "",
  });
  if (!parsed.success) return;
  await connectMongoose();
  await Faq.updateOne({ _id: id }, { $set: { ...parsed.data, updatedAt: new Date() } });
  await recordActivity({
    action: "faq.update",
    entity: "faq",
    entityId: id,
    summary: parsed.data.question.slice(0, 120),
  });
  bumpAll();
}

export async function deleteFaq(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Faq.findByIdAndDelete(id).lean();
  await recordActivity({
    action: "faq.delete",
    entity: "faq",
    entityId: id,
    summary: doc?.question?.slice(0, 120),
  });
  bumpAll();
}

export async function seedFromStaticList(): Promise<void> {
  await requireAdmin();
  await connectMongoose();
  const existing = await Faq.countDocuments({ page: "home" });
  if (existing > 0) return;
  // Lazy-import to keep this action server-only.
  const { seedFaqs } = await import("@/lib/content/faqs");
  await Faq.insertMany(
    seedFaqs.map((f, i) => ({
      question: f.q,
      answer: f.a,
      order: i,
      published: true,
      page: "home",
    })),
  );
  await recordActivity({
    action: "faq.seed",
    entity: "faq",
    summary: `Seeded ${seedFaqs.length} starter FAQs`,
  });
  bumpAll();
}
