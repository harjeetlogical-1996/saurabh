"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { getAuth } from "@/lib/auth";
import { requireUser } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";

const NameInput = z.object({
  name: z.string().trim().min(1).max(100),
});

const PasswordInput = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(200),
});

export async function updateName(
  _prevState: { ok?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  await requireUser();
  const parsed = NameInput.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: "Name is required (1-100 chars)." };

  try {
    const h = await headers();
    await getAuth().api.updateUser({
      headers: h,
      body: { name: parsed.data.name },
    });
    await recordActivity({
      action: "account.update_name",
      entity: "user",
      summary: `Renamed to "${parsed.data.name}"`,
    });
    revalidatePath("/sb-console");
    revalidatePath("/sb-console/account");
    return { ok: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Could not update name.",
    };
  }
}

export async function changePassword(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  await requireUser();
  const parsed = PasswordInput.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) {
    return {
      error: "New password must be at least 8 characters.",
    };
  }
  try {
    const h = await headers();
    await getAuth().api.changePassword({
      headers: h,
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: true,
      },
    });
    await recordActivity({
      action: "account.change_password",
      entity: "user",
      summary: "Changed password",
    });
    return { ok: true };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "Could not change password. Check the current password.",
    };
  }
}

export async function revokeSessionAction(formData: FormData): Promise<void> {
  await requireUser();
  const token = formData.get("token");
  if (typeof token !== "string" || !token) return;
  try {
    const h = await headers();
    await getAuth().api.revokeSession({
      headers: h,
      body: { token },
    });
    await recordActivity({
      action: "session.revoke",
      entity: "session",
      entityId: token,
      summary: "Revoked session",
    });
    revalidatePath("/sb-console/account");
  } catch (err) {
    console.error("[revokeSession] failed", err);
  }
}

export async function revokeOtherSessionsAction(): Promise<void> {
  await requireUser();
  try {
    const h = await headers();
    await getAuth().api.revokeOtherSessions({ headers: h });
    await recordActivity({
      action: "session.revoke_others",
      entity: "session",
      summary: "Signed out all other devices",
    });
    revalidatePath("/sb-console/account");
  } catch (err) {
    console.error("[revokeOtherSessions] failed", err);
  }
}
