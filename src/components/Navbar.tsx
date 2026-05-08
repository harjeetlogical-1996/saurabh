import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

type Sub = { label: string; href: string; desc?: string };
type Item = { label: string; href: string; subs?: Sub[] };

const items: Item[] = [
  {
    label: "Services",
    href: "/services",
    subs: [
      {
        label: "Website Development",
        href: "/services/website-development",
        desc: "Design, e-commerce, CMS, web apps & integrations",
      },
      {
        label: "Digital Marketing",
        href: "/services/digital-marketing",
        desc: "SEO, paid ads, content, social, email & analytics",
      },
      {
        label: "AI Services",
        href: "/services/ai-services",
        desc: "GEO, AI content, video, chatbots & web apps · 2026",
      },
    ],
  },
  { label: "Technologies", href: "/technologies" },
  { label: "Tools", href: "/#tools" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

export async function Navbar() {
  // Optional admin-uploaded logo. Empty string = use the bundled CSS logomark.
  const settings = await getAllSettings();
  const logoId = settings["brand.logo_id"] || "";
  const logoUrl = logoId ? `/api/brand/logo?v=${logoId}` : "";
  // Admin-tunable logo height (px). Clamp so a typo can't wreck the navbar.
  const navHeight = clampPx(settings["brand.logo_height_navbar"], 16, 80, 32);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(10,10,10,0.7)] border-b border-[var(--line)]">
      <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: `${navHeight}px` }}
              className="w-auto max-w-[260px] object-contain"
              width={260}
              height={navHeight}
            />
          ) : (
            <>
              <Logomark />
              <span className="font-display text-[19px] tracking-tight">
                Saurabh<span className="text-[var(--accent)]">.</span>
              </span>
            </>
          )}
        </Link>

        <ul className="hidden md:flex items-center gap-9 text-[13px] text-[var(--muted)]">
          {items.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                {item.label}
                {item.subs && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="transition-transform group-hover:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />

              {item.subs && (
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px] z-50">
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    {item.subs.map((s, idx) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block group/sub p-3 rounded-xl hover:bg-[var(--bg)] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)]">
                              0{idx + 1}
                            </span>
                            <span className="text-[14px] font-medium text-white">
                              {s.label}
                            </span>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[var(--muted)] -translate-x-1 group-hover/sub:translate-x-0 group-hover/sub:text-[var(--accent)] transition-all"
                            aria-hidden
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                        {s.desc && (
                          <p className="mt-1.5 ml-7 text-[12px] leading-[1.5] text-[var(--muted)]">
                            {s.desc}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:inline-flex h-9 items-center text-[13px] text-[var(--muted)] hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex h-9 items-center gap-1.5 bg-[var(--accent)] text-black text-[13px] font-semibold px-4 rounded-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_var(--accent-glow)]"
          >
            <span className="relative z-10">Contact us</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Logomark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] text-black overflow-hidden border border-[var(--accent)]">
      <span className="font-display text-[14px] leading-none relative z-10">
        sb
      </span>
      <span className="absolute inset-0 animate-spin-slow">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-black" />
      </span>
    </span>
  );
}

/**
 * Parse an admin-string-stored pixel height into a safe number.
 * Returns `fallback` if the value is missing, non-numeric, or out of range.
 */
function clampPx(
  raw: string | undefined,
  min: number,
  max: number,
  fallback: number,
): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}
