import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/admin/Button";
import { Field, TextInput, TextArea } from "@/components/admin/Field";
import {
  getAllSettings,
  SETTING_DEFAULTS,
  SECRET_SETTING_KEYS,
  type SettingKey,
} from "@/lib/settings";
import { saveSettings } from "./actions";

export const dynamic = "force-dynamic";

type FieldDef = {
  key: SettingKey;
  label: string;
  hint?: string;
  type?: "text" | "number" | "url" | "select" | "password" | "textarea";
  options?: ReadonlyArray<{ value: string; label: string }>;
  /** Applies to textarea fields */
  rows?: number;
  /** Applies to textarea fields — render with monospace font */
  mono?: boolean;
};

type GroupDef = {
  title: string;
  description: string;
  fields: FieldDef[];
  /** Override the default 2-col grid for fields that need full width */
  cols?: 1 | 2;
};

const groups: GroupDef[] = [
  {
    title: "Hero section",
    description: "The first thing visitors see at the top of the home page.",
    fields: [
      {
        key: "hero.badge",
        label: "Status badge",
        hint: 'Pill text under the navbar. e.g. "Booking 4 founder projects · Q2 2026".',
      },
      {
        key: "hero.cta_primary",
        label: "Primary CTA label",
        hint: "Yellow button in the hero. Sends to /contact.",
      },
      {
        key: "hero.cta_secondary",
        label: "Secondary CTA label",
        hint: "Outline button next to the primary CTA. Sends to /services.",
      },
    ],
  },
  {
    title: "Stats bar",
    description: "Four quick numbers shown directly under the hero.",
    fields: [
      { key: "stats.projects", label: "Stat 1 — value", hint: 'e.g. "50+"' },
      { key: "stats.projects_label", label: "Stat 1 — label" },
      { key: "stats.revenue", label: "Stat 2 — value", hint: 'e.g. "$2M+"' },
      { key: "stats.revenue_label", label: "Stat 2 — label" },
      { key: "stats.countries", label: "Stat 3 — value" },
      { key: "stats.countries_label", label: "Stat 3 — label" },
      { key: "stats.rating", label: "Stat 4 — value" },
      { key: "stats.rating_label", label: "Stat 4 — label" },
    ],
  },
  {
    title: "Contact",
    description: "Used in the contact page footer and the global footer.",
    fields: [
      { key: "contact.email", label: "Public email" },
      {
        key: "contact.location",
        label: "Location",
        hint: 'e.g. "Fatehabad, India"',
      },
      {
        key: "contact.areas_served",
        label: "Areas served",
        hint: 'e.g. "India · US · UK · EU"',
      },
    ],
  },
  {
    title: "Social",
    description: "Linked from the footer.",
    fields: [
      { key: "social.twitter", label: "Twitter / X URL", type: "url" },
      { key: "social.linkedin", label: "LinkedIn URL", type: "url" },
    ],
  },
  {
    title: "Availability",
    description: "Quick toggle for whether you're open to new projects.",
    fields: [
      {
        key: "availability.open",
        label: "Open for new projects?",
        type: "select",
        options: [
          { value: "true", label: "Open — booking new projects" },
          { value: "false", label: "Closed — fully booked" },
        ],
      },
    ],
  },
  {
    title: "Integrations · Gemini AI",
    description:
      "Used by future admin tools (content generation, image generation). The API key is stored encrypted-at-rest by MongoDB Atlas and never sent to the public site or the browser. Get a key from https://aistudio.google.com/apikey.",
    fields: [
      {
        key: "integrations.gemini_api_key",
        label: "Gemini API key",
        type: "password",
        hint: "Leave blank when saving to keep the existing key. Paste a new key to replace it.",
      },
      {
        key: "integrations.gemini_text_model",
        label: "Text model",
        hint: 'Default: "gemini-2.5-flash". Use "gemini-2.5-pro" for higher-quality outputs.',
      },
      {
        key: "integrations.gemini_image_model",
        label: "Image model",
        hint: 'Default: "gemini-2.5-flash-image". Used for AI image generation.',
      },
    ],
  },
  {
    title: "Custom code · <head> & <body>",
    description:
      "Inject HTML snippets like Google Analytics (GA4), Google Tag Manager, Search Console verification, Microsoft Clarity, etc. Anything you paste here renders on every public page (the admin console is excluded). Use carefully — broken HTML here can break the site.",
    cols: 1,
    fields: [
      {
        key: "code.head",
        label: "<head> — top of every page",
        type: "textarea",
        rows: 8,
        mono: true,
        hint: "Best place for analytics snippets, meta verification tags, and font preloads.",
      },
      {
        key: "code.body_start",
        label: "<body> — immediately after opening tag",
        type: "textarea",
        rows: 6,
        mono: true,
        hint: "Best place for GTM noscript fallbacks.",
      },
      {
        key: "code.body_end",
        label: "<body> — just before closing tag",
        type: "textarea",
        rows: 6,
        mono: true,
        hint: "Best place for chat widgets, deferred scripts, and pixel trackers.",
      },
    ],
  },
];

export default async function SettingsPage() {
  const values = await getAllSettings();

  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="Site settings"
        description="Edit dynamic content, integrations, and head/body code without redeploying. Changes take effect on the next page load."
        breadcrumbs={[
          { label: "Console", href: "/sb-console" },
          { label: "Site settings" },
        ]}
      />

      <form
        action={saveSettings}
        className="px-6 md:px-10 py-10 max-w-[920px] space-y-10"
      >
        {groups.map((group) => (
          <section
            key={group.title}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-9"
          >
            <div>
              <h2 className="font-display text-[20px] tracking-tight text-white">
                {group.title}
              </h2>
              <p className="mt-1.5 text-[13px] text-[var(--muted)] leading-[1.6] max-w-[640px]">
                {group.description}
              </p>
            </div>

            <div
              className={`mt-7 grid gap-5 ${
                group.cols === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {group.fields.map((f) => {
                const current = values[f.key] ?? SETTING_DEFAULTS[f.key] ?? "";
                const isSecret = SECRET_SETTING_KEYS.has(f.key);
                const hasSecret = isSecret && current.length > 0;

                if (f.type === "select" && f.options) {
                  return (
                    <Field key={f.key} label={f.label} hint={f.hint}>
                      <select
                        name={f.key}
                        defaultValue={current}
                        className="h-11 w-full rounded-lg bg-[var(--bg)] border border-[var(--line)] px-3 text-[14px] text-white outline-none focus:border-[var(--accent)] transition-colors"
                      >
                        {f.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  );
                }

                if (f.type === "textarea") {
                  return (
                    <Field key={f.key} label={f.label} hint={f.hint}>
                      <TextArea
                        name={f.key}
                        defaultValue={current}
                        rows={f.rows ?? 6}
                        spellCheck={false}
                        className={
                          f.mono
                            ? "font-mono text-[12px] leading-[1.6]"
                            : undefined
                        }
                      />
                    </Field>
                  );
                }

                if (f.type === "password") {
                  return (
                    <Field
                      key={f.key}
                      label={f.label}
                      hint={f.hint}
                      // Show a tiny "set" indicator next to label when value exists.
                    >
                      <div className="space-y-2">
                        <TextInput
                          name={f.key}
                          type="password"
                          autoComplete="new-password"
                          placeholder={
                            hasSecret
                              ? "•••••••••• (leave blank to keep)"
                              : "Paste your API key"
                          }
                        />
                        <div className="text-[11px] font-mono text-[var(--muted)]">
                          {hasSecret ? (
                            <span className="text-[var(--accent)]">
                              ✓ Key is set ({maskedHint(current)})
                            </span>
                          ) : (
                            "No key configured yet"
                          )}
                        </div>
                      </div>
                    </Field>
                  );
                }

                return (
                  <Field key={f.key} label={f.label} hint={f.hint}>
                    <TextInput
                      name={f.key}
                      type={f.type ?? "text"}
                      defaultValue={current}
                    />
                  </Field>
                );
              })}
            </div>
          </section>
        ))}

        <div className="flex items-center justify-between gap-4 sticky bottom-0 bg-[var(--bg)] border-t border-[var(--line)] -mx-6 md:-mx-10 px-6 md:px-10 py-4">
          <p className="text-[12px] text-[var(--muted)] font-mono">
            Changes apply site-wide on next request.
          </p>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}

/** Render only the first 4 + last 4 chars of a secret for a "you set this" hint. */
function maskedHint(value: string): string {
  const v = value.trim();
  if (v.length <= 8) return "••••";
  return `${v.slice(0, 4)}••••${v.slice(-4)}`;
}
