"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { SiteSetting } from "@/lib/db/models/SiteSetting";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { SETTING_DEFAULTS, SECRET_SETTING_KEYS, type SettingKey } from "@/lib/settings";

/**
 * Save site settings from the admin form. Accepts `formData` directly so it
 * can be wired with `<form action={...}>` without client JS.
 *
 * Only keys present in SETTING_DEFAULTS are accepted (whitelist).
 */
export async function saveSettings(formData: FormData): Promise<void> {
  await requireAdmin();
  await connectMongoose();

  const allowedKeys = Object.keys(SETTING_DEFAULTS) as SettingKey[];
  const updates: Array<{ key: string; value: string }> = [];

  for (const key of allowedKeys) {
    const raw = formData.get(key);
    if (typeof raw !== "string") continue;
    const trimmed = raw.trim();

    // Secrets: empty submission means "don't touch" (so the masked field
    // stays as-is when the admin saves without retyping the key).
    if (SECRET_SETTING_KEYS.has(key)) {
      if (trimmed.length === 0) continue;
      updates.push({ key, value: trimmed });
      continue;
    }

    // Light validation for known boolean-like fields
    if (key === "availability.open") {
      const norm = trimmed === "true" || trimmed === "1" ? "true" : "false";
      updates.push({ key, value: norm });
    } else {
      updates.push({ key, value: trimmed });
    }
  }

  if (updates.length === 0) return;

  const InputArr = z.array(
    z.object({
      key: z.string().min(1),
      // Allow large values for custom code injection (head/body snippets).
      value: z.string().max(20000),
    }),
  );
  const parsed = InputArr.safeParse(updates);
  if (!parsed.success) return;

  await Promise.all(
    parsed.data.map((u) =>
      SiteSetting.updateOne(
        { key: u.key },
        {
          $set: { value: u.value, updatedAt: new Date() },
          $setOnInsert: {
            key: u.key,
            label: u.key,
            type: "string",
            group: u.key.split(".")[0] ?? "general",
            createdAt: new Date(),
          },
        },
        { upsert: true },
      ),
    ),
  );

  await recordActivity({
    action: "settings.update",
    entity: "settings",
    summary: `Updated ${parsed.data.length} setting${parsed.data.length === 1 ? "" : "s"}`,
    metadata: { keys: parsed.data.map((p) => p.key) },
  });

  revalidatePath("/sb-console/settings");
  revalidatePath("/", "layout"); // re-render anything on the public site that reads settings
}
