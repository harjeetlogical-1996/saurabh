"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { Contact } from "@/lib/db/models";
import { requireAdmin } from "@/lib/auth-server";

const StatusInput = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "in_progress", "won", "lost", "spam"]),
});

export async function updateContactStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = StatusInput.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;
  await connectMongoose();
  await Contact.updateOne(
    { _id: parsed.data.id },
    { $set: { status: parsed.data.status, updatedAt: new Date() } },
  );
  revalidatePath("/sb-console/contacts");
  revalidatePath("/sb-console");
}

export async function deleteContact(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  await Contact.deleteOne({ _id: id });
  revalidatePath("/sb-console/contacts");
  revalidatePath("/sb-console");
}
