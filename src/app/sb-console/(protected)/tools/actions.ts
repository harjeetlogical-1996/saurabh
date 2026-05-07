"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Tool } from "@/lib/db/models/Tool";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";

const Input = z.object({
  code: z.string().trim().min(1).max(12),
  title: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(600),
  cta: z.string().trim().max(60).optional().or(z.literal("")),
  href: z.string().trim().max(1000).optional().or(z.literal("")),
  plan: z.enum(["free", "paid"]).default("free"),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z
    .union([z.literal("on"), z.literal("true"), z.literal(""), z.undefined()])
    .transform((v) => v === "on" || v === "true"),
});

function bumpAll() {
  revalidatePath("/sb-console/tools");
  revalidatePath("/", "layout");
}

function parseForm(fd: FormData) {
  return Input.safeParse({
    code: fd.get("code"),
    title: fd.get("title"),
    body: fd.get("body"),
    cta: fd.get("cta") ?? "",
    href: fd.get("href") ?? "",
    plan: fd.get("plan") ?? "free",
    order: fd.get("order"),
    published: fd.get("published") ?? "",
  });
}

export async function createTool(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  const doc = await Tool.create({
    code: parsed.data.code,
    title: parsed.data.title,
    body: parsed.data.body,
    cta: parsed.data.cta || "Try it free",
    href: parsed.data.href || undefined,
    plan: parsed.data.plan,
    order: parsed.data.order,
    published: parsed.data.published,
  });
  await recordActivity({
    action: "tool.create",
    entity: "tool",
    entityId: String(doc._id),
    summary: parsed.data.title,
  });
  bumpAll();
}

export async function updateTool(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  const parsed = parseForm(formData);
  if (!parsed.success) return;
  await connectMongoose();
  await Tool.updateOne(
    { _id: id },
    {
      $set: {
        code: parsed.data.code,
        title: parsed.data.title,
        body: parsed.data.body,
        cta: parsed.data.cta || "Try it free",
        href: parsed.data.href || undefined,
        plan: parsed.data.plan,
        order: parsed.data.order,
        published: parsed.data.published,
        updatedAt: new Date(),
      },
    },
  );
  await recordActivity({
    action: "tool.update",
    entity: "tool",
    entityId: id,
    summary: parsed.data.title,
  });
  bumpAll();
}

export async function deleteTool(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Tool.findByIdAndDelete(id).lean();
  await recordActivity({
    action: "tool.delete",
    entity: "tool",
    entityId: id,
    summary: doc?.title,
  });
  bumpAll();
}

export async function seedTools(): Promise<void> {
  await requireAdmin();
  await connectMongoose();
  const existing = await Tool.countDocuments({});
  if (existing > 0) return;
  const { seedTools: list } = await import("@/lib/content/tools");
  await Tool.insertMany(
    list.map((t, i) => ({
      code: t.code,
      title: t.title,
      body: t.body,
      cta: t.cta,
      plan: t.plan,
      order: i,
      published: true,
    })),
  );
  await recordActivity({
    action: "tool.seed",
    entity: "tool",
    summary: `Seeded ${list.length} starter tools`,
  });
  bumpAll();
}
