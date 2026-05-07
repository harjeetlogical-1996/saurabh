"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoose } from "@/lib/db/mongoose";
import { SiteSetting } from "@/lib/db/models/SiteSetting";
import { requireAdmin } from "@/lib/auth-server";
import { recordActivity } from "@/lib/admin/audit";
import { SETTING_DEFAULTS, SECRET_SETTING_KEYS, type SettingKey } from "@/lib/settings";
import {
  isBrandAssetKind,
  settingKeyFor,
  uploadBrandSource,
  deleteBrandSource,
  type BrandAssetKind,
} from "@/lib/brand-assets";

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

/**
 * Upload a brand asset (favicon, logo, or og_image) from the admin settings
 * page. Stores the source file in GridFS, deletes the previous source if
 * any, and writes the new GridFS id to the matching setting key.
 *
 * Form data:
 *   kind  → "favicon" | "logo" | "og_image"
 *   file  → File (image/png, image/jpeg, image/svg+xml, image/x-icon)
 */
const ALLOWED_BRAND_MIMES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);
const MAX_BRAND_BYTES = 4 * 1024 * 1024; // 4 MB ceiling — favicons/logos are tiny

export async function uploadBrandAsset(formData: FormData): Promise<void> {
  await requireAdmin();

  const kindRaw = String(formData.get("kind") ?? "");
  if (!isBrandAssetKind(kindRaw)) {
    throw new Error(`Invalid brand asset kind: ${kindRaw}`);
  }
  const kind: BrandAssetKind = kindRaw;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided.");
  }
  if (file.size > MAX_BRAND_BYTES) {
    throw new Error(`File too large (max ${MAX_BRAND_BYTES / 1024 / 1024} MB).`);
  }
  if (!ALLOWED_BRAND_MIMES.has(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const newId = await uploadBrandSource(kind, buffer, file.type);

  // Replace the old source. We do this AFTER upload succeeds so a failed
  // upload can't strand the brand without an asset.
  await connectMongoose();
  const settingKey = settingKeyFor(kind);
  const existing = await SiteSetting.findOne({ key: settingKey }).lean();
  const previousId = (existing?.value as string | undefined) ?? "";

  await SiteSetting.updateOne(
    { key: settingKey },
    {
      $set: { value: newId, updatedAt: new Date() },
      $setOnInsert: {
        key: settingKey,
        label: settingKey,
        type: "string",
        group: "brand",
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  if (previousId && previousId !== newId) {
    await deleteBrandSource(previousId);
  }

  await recordActivity({
    action: "brand.asset_upload",
    entity: "settings",
    summary: `Uploaded new ${kind} (${(file.size / 1024).toFixed(1)} KB)`,
    metadata: { kind, contentType: file.type, sizeBytes: file.size },
  });

  revalidatePath("/sb-console/settings");
  revalidatePath("/", "layout");
}

/** Clear a brand asset, falling back to bundled defaults. */
export async function clearBrandAsset(formData: FormData): Promise<void> {
  await requireAdmin();
  const kindRaw = String(formData.get("kind") ?? "");
  if (!isBrandAssetKind(kindRaw)) return;
  const kind: BrandAssetKind = kindRaw;

  await connectMongoose();
  const settingKey = settingKeyFor(kind);
  const existing = await SiteSetting.findOne({ key: settingKey }).lean();
  const previousId = (existing?.value as string | undefined) ?? "";

  await SiteSetting.updateOne(
    { key: settingKey },
    { $set: { value: "", updatedAt: new Date() } },
    { upsert: true },
  );

  if (previousId) await deleteBrandSource(previousId);

  await recordActivity({
    action: "brand.asset_clear",
    entity: "settings",
    summary: `Cleared ${kind}`,
    metadata: { kind },
  });

  revalidatePath("/sb-console/settings");
  revalidatePath("/", "layout");
}
