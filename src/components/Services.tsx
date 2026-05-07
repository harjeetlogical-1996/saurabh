import Link from "next/link";
import { Reveal } from "./Reveal";
import { BgFx } from "./BgFx";

const services = [
  {
    code: "S.01",
    label: "Website Development",
    href: "/services/website-development",
    title: "Conversion-focused websites built on modern stacks.",
    body:
      "Custom design, e-commerce, web apps, and integrations. Next.js, Webflow, WordPress, Shopify, engineered for speed, SEO, and the moment money changes hands.",
    items: [
      "Custom Design & UI/UX",
      "Next.js · Webflow · WordPress",
      "Shopify & E-commerce",
      "Web Apps & SaaS",
      "Core Web Vitals & SEO",
      "Maintenance & Integrations",
    ],
  },
  {
    code: "S.02",
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    title: "Full-stack growth marketing, SEO to paid to content.",
    body:
      "SEO, Google &amp; Meta Ads, content, social, email, CRO and analytics, all run as one engine. We chase qualified pipeline and ROAS, not vanity metrics.",
    items: [
      "Technical & On-Page SEO",
      "Google · Meta · LinkedIn Ads",
      "Content & Editorial",
      "Email & Lifecycle",
      "CRO & Landing Pages",
      "GA4 & ROAS Reporting",
    ],
  },
  {
    code: "S.03",
    label: "AI Services · 2026",
    href: "/services/ai-services",
    title: "AI SEO (GEO / AEO / LLMO) + AI growth automations.",
    body:
      "Get cited by ChatGPT, Perplexity, Gemini and Google AI Overviews. Plus AI content engines, AI chatbots, AI sales outreach, and custom AI integrations on your stack.",
    items: [
      "GEO / AEO / LLMO",
      "AI Content & Copy",
      "AI Visual & Video",
      "AI Chatbots & Agents",
      "AI Sales & Outreach",
      "OpenAI / Anthropic API",
    ],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 40% at 80% 20%, rgba(0,240,255,0.12), transparent 60%)",
        }}
      />
      <BgFx variant="subtle" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="text-center max-w-[820px] mx-auto">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            Three services. One mission:{" "}
            <span className="text-[var(--accent)]">your growth.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            Website development, digital marketing, and AI services, built
            end-to-end by an in-house team. Take one. Take all three. We
            engineer them to compound on each other.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.code} delay={i * 120}>
              <article className="group relative h-full glass rounded-2xl p-8 md:p-10 transition-all hover:glass-hover hover:-translate-y-1 flex flex-col">
                <span
                  aria-hidden
                  className="absolute -top-px left-12 right-12 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
                    {s.code} · {s.label}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:rotate-45 transition-all duration-500">
                    +
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-[14px] leading-[1.7] text-[var(--muted)]"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-[13px] leading-[1.45] text-white/90"
                    >
                      <span className="mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-bold">
                        ✓
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:gap-2.5 transition-all self-start"
                >
                  Explore service <span>→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
      <span className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </div>
  );
}
