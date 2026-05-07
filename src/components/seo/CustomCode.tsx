import { headers } from "next/headers";
import { getAllSettings } from "@/lib/settings";

type Slot = "head" | "body_start" | "body_end";

/**
 * Renders an admin-provided HTML snippet from SiteSettings.
 *
 * - Skipped on `/sb-console/*` and `/api/*` paths (we don't want analytics
 *   firing inside the admin console).
 * - The snippet is inserted as raw HTML; the admin who pastes it is trusted.
 *   This is the same security model as Squarespace / Webflow custom code.
 *
 * Server component. Pulls path from `x-pathname` set by `proxy.ts`.
 */
export async function CustomCode({ slot }: { slot: Slot }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  if (pathname.startsWith("/sb-console") || pathname.startsWith("/api/")) {
    return null;
  }

  const settings = await getAllSettings();
  const code =
    slot === "head"
      ? settings["code.head"]
      : slot === "body_start"
        ? settings["code.body_start"]
        : settings["code.body_end"];

  if (!code || code.trim().length === 0) return null;

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
