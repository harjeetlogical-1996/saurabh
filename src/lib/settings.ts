/**
 * Read-side helpers for SiteSetting. Server-only. Cached per request via
 * Next's `cache()` so multiple components on the same render re-use one read.
 */
import { cache } from "react";
import { connectMongoose } from "@/lib/db/mongoose";
import { SiteSetting } from "@/lib/db/models/SiteSetting";

/** Defaults used when a key isn't in the DB yet. Edit these in the admin UI. */
export const SETTING_DEFAULTS = {
  "hero.badge":
    "Booking 4 founder projects · Q2 2026",
  "hero.cta_primary": "Get a free strategy call",
  "hero.cta_secondary": "See all services",

  "stats.projects": "50+",
  "stats.projects_label": "Websites & growth projects shipped",
  "stats.revenue": "$2M+",
  "stats.revenue_label": "Client revenue generated",
  "stats.countries": "10+",
  "stats.countries_label": "Countries served end-to-end",
  "stats.rating": "4.9★",
  "stats.rating_label": "Average client rating",

  "contact.email": "hello@saurabhbhayana.com",
  "contact.location": "Fatehabad, India",
  "contact.areas_served": "India · US · UK · EU",

  "social.twitter": "",
  "social.linkedin": "https://www.linkedin.com/in/saurabh-bhayana-63240a115/",

  "availability.open": "true", // string for the form, "true"/"false"

  // Integrations (sensitive — masked in admin UI)
  "integrations.gemini_api_key": "",
  "integrations.gemini_text_model": "gemini-2.5-flash",
  "integrations.gemini_image_model": "gemini-2.5-flash-image",

  // Custom code injection (e.g. GA4, GTM, Search Console verification)
  "code.head": "",
  "code.body_start": "",
  "code.body_end": "",

  // Brand assets (uploaded via admin UI). Each value is the GridFS file id
  // of the source upload. Served by /api/brand/<key> with format/size
  // negotiation. Empty string means "use the bundled default".
  "brand.favicon_id": "",
  "brand.logo_id": "",
  "brand.og_image_id": "",

  // Logo display sizing. Stored as the rendered height in pixels — width
  // auto from the image's aspect ratio. Defaults match the bundled
  // logomark so falling back doesn't change layout.
  "brand.logo_height_navbar": "32",
  "brand.logo_height_footer": "36",
} as const;

export type SettingKey = keyof typeof SETTING_DEFAULTS;

/**
 * Keys whose values must never be sent to the client. The admin UI shows
 * a masked input ("••••••••") and only updates the DB when the admin types
 * a new value. Reads stay server-only via `getSetting()`.
 */
export const SECRET_SETTING_KEYS = new Set<SettingKey>([
  "integrations.gemini_api_key",
]);

export function isSecretKey(key: string): key is SettingKey {
  return SECRET_SETTING_KEYS.has(key as SettingKey);
}

/**
 * Read all settings as a plain object {key: value}. Falls back to defaults
 * for any key not yet stored in the DB.
 *
 * Wrapped in React's cache() so a single page render hits Mongo once.
 */
export const getAllSettings = cache(
  async (): Promise<Record<string, string>> => {
    try {
      await connectMongoose();
      const docs = await SiteSetting.find({}).lean();
      const out: Record<string, string> = { ...SETTING_DEFAULTS };
      for (const d of docs) {
        out[d.key] = String(d.value ?? "");
      }
      return out;
    } catch (err) {
      console.warn("[getAllSettings] DB unavailable, using defaults:", err);
      return { ...SETTING_DEFAULTS };
    }
  },
);

/** Convenience accessor with default fallback. */
export async function getSetting<K extends SettingKey>(
  key: K,
): Promise<string> {
  const all = await getAllSettings();
  return all[key] ?? SETTING_DEFAULTS[key];
}
