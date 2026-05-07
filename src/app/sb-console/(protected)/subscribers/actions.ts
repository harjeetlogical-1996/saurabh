"use server";

import { revalidatePath } from "next/cache";
import { connectMongoose } from "@/lib/db/mongoose";
import { Subscriber } from "@/lib/db/models";
import { requireAdmin } from "@/lib/auth-server";

export async function deleteSubscriber(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  await Subscriber.deleteOne({ _id: id });
  revalidatePath("/sb-console/subscribers");
  revalidatePath("/sb-console");
}

export async function toggleUnsubscribe(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;
  await connectMongoose();
  const doc = await Subscriber.findById(id);
  if (!doc) return;
  doc.unsubscribed = !doc.unsubscribed;
  await doc.save();
  revalidatePath("/sb-console/subscribers");
}
