"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getMongoDb } from "@/lib/db/mongo-client";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";

function bumpAll() {
  revalidatePath("/sb-console/users");
  revalidatePath("/sb-console");
}

function asObjectId(id: string) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function setUserRole(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const id = formData.get("id");
  const role = formData.get("role");
  if (typeof id !== "string" || typeof role !== "string") return;
  if (role !== "user" && role !== "admin") return;

  // Refuse to demote yourself — prevents accidental lockout.
  const me = (session.user as unknown as { id?: string }).id;
  if (id === me && role !== "admin") return;

  const db = await getMongoDb();
  const _id = asObjectId(id);
  if (!_id) return;
  await db
    .collection("user")
    .updateOne({ _id }, { $set: { role, updatedAt: new Date() } });
  await recordActivity({
    action: "user.role",
    entity: "user",
    entityId: id,
    summary: `Set role to ${role}`,
  });
  bumpAll();
}

export async function setUserSuspended(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const id = formData.get("id");
  const suspended = formData.get("suspended") === "true";
  if (typeof id !== "string") return;
  const me = (session.user as unknown as { id?: string }).id;
  if (id === me) return; // can't suspend yourself

  const db = await getMongoDb();
  const _id = asObjectId(id);
  if (!_id) return;
  await db
    .collection("user")
    .updateOne({ _id }, { $set: { suspended, updatedAt: new Date() } });
  // Also kill any active sessions when suspending
  if (suspended) {
    await db.collection("session").deleteMany({ userId: id });
  }
  await recordActivity({
    action: suspended ? "user.suspend" : "user.unsuspend",
    entity: "user",
    entityId: id,
    summary: suspended ? "Suspended" : "Reactivated",
  });
  bumpAll();
}

export async function deleteUser(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const me = (session.user as unknown as { id?: string }).id;
  if (id === me) return; // can't delete yourself

  const db = await getMongoDb();
  const _id = asObjectId(id);
  if (!_id) return;

  const userDoc = await db.collection("user").findOne({ _id });
  await db.collection("user").deleteOne({ _id });
  // Cascade: kill linked accounts + sessions so Better Auth stays consistent.
  await db.collection("account").deleteMany({ userId: id });
  await db.collection("session").deleteMany({ userId: id });

  await recordActivity({
    action: "user.delete",
    entity: "user",
    entityId: id,
    summary: userDoc?.email ?? id,
  });
  bumpAll();
}
