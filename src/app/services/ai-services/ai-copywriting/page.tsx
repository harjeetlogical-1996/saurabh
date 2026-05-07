import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  singleServiceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

const SLUG = "ai-copywriting";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Copywriting Services for Ads, Emails & Landing Pages";
const META_DESCRIPTION =
  "AI copywriting that ships variants in hours, not weeks — ad copy, email sequences, landing pages, product descriptions. Briefs in, A/B-ready variants out, human-polished before delivery.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: URL,
    type: "website",
    images: [
      {
        url: `${site.url}/images/services/${SLUG}/hero-1600.jpg`,
        width: 1600,
        height: 900,
        alt: "Stack of ad, email, and landing page creative units with AI sparkle glyph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [`${site.url}/images/services/${SLUG}/hero-1600.jpg`],
  },
};

const FAQS = [
  {
    q: "What is AI copywriting?",
    a: "AI copywriting is short-form, conversion-focused copy production where AI generates many variants quickly and a human copywriter selects, polishes, and ships the strongest ones. The use cases that benefit most: paid ad copy (you need 10 headlines, not one), email subject lines (where variant testing dominates), landing page sections (multiple value-prop angles), product descriptions at e-commerce scale, and SMS / push notifications.",
  },
  {
    q: "How is this different from blog writing?",
    a: "Blog writing is long-form, single-asset, narrative-driven. Copywriting is short-form, multi-variant, conversion-driven. AI is exceptionally good at copywriting because the workflow naturally needs many variants to test — the AI's tendency to produce 'good but not great' is fine when you're testing 10 versions and only the winner ships.",
  },
  {
    q: "Will AI copy actually convert?",
    a: "Mixed honestly: AI copy alone underperforms human copy in head-to-head tests for high-stakes pages (cold ad headlines, sales-page H1s). AI copy + human polish matches or beats human-only copy in most cases. The trick is treating AI output as raw material — pulling the strongest 20% and rewriting the rest. Pure AI copy that ships unedited is what gives the category a bad name.",
  },
  {
    q: "What channels do you cover?",
    a: "Six main channels. Paid ad copy (Google, Meta, LinkedIn) — headlines, descriptions, CTAs at scale. Email — subject lines, preview text, full sequences. Landing pages — hero, value props, social proof, CTAs. Product copy — descriptions for e-commerce catalogs. Social — captions, threads, hooks. SMS / push — short-form lifecycle messaging.",
  },
  {
    q: "How fast can you turn around copy?",
    a: "An ad-copy variant pack (typically 12–20 variants per campaign) ships in 24–48 hours. A complete email sequence (5–7 emails) in 3–5 days. Landing page copy in 2–4 days. The speed advantage over pure-human is biggest when you need many variants — that's where AI assistance compounds.",
  },
  {
    q: "Do I get exclusive copy or shared templates?",
    a: "Exclusive. Every brief is one-to-one — your audience, your voice, your offer. We don't run AI generation across multiple clients in the same pass. The output is yours alone, with full ownership transferred on delivery.",
  },
  {
    q: "Can you match our brand voice?",
    a: "Yes — voice tuning is part of every engagement. We start by ingesting your existing best-performing copy and brand guidelines (if any), build a voice profile that the AI generation honors, and the human polish step catches anything that drifted off-voice. Most clients don't notice which lines were AI-drafted vs human-drafted in the final output.",
  },
  {
    q: "How does pricing work?",
    a: "Per-variant-pack or monthly retainer. Variant packs are scoped by channel and volume (e.g. '20 ad headlines + 5 descriptions for one campaign'). Retainers cover ongoing campaigns, email sequences, and landing-page iterations across the month. Quote sent after a 30-minute scoping call — no per-hour billing.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Ad copy variant packs",
    description:
      "12–20 ad headlines + descriptions per campaign across Google, Meta, and LinkedIn — engineered for the variant testing paid platforms reward.",
  },
  {
    name: "Email sequences",
    description:
      "Subject lines, preview text, full body copy. Welcome flows, lifecycle sequences, broadcast emails, re-engagement campaigns.",
  },
  {
    name: "Landing page copy",
    description:
      "Hero, value-props, social-proof framing, objection-handling, CTA copy. Two or three full versions ready for A/B testing on day one.",
  },
  {
    name: "Product descriptions at scale",
    description:
      "E-commerce catalogs from 50 to 5,000 SKUs. AI generates the volume, a human reviews quality at sample frequency. Cost per SKU drops 70%+.",
  },
  {
    name: "Brand-voice tuning",
    description:
      "Voice profile built from your existing copy. AI generation honors it; human polish catches what drifts. Output reads on-brand even at variant scale.",
  },
  {
    name: "A/B-ready delivery",
    description:
      "Every pack delivered with explicit pairings — Variant A vs Variant B, with notes on what each is testing. Plug into your ads / email / landing tool directly.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    body: "30-minute scoping call captures the audience, the offer, the channel, the brand voice anchors, and the win condition for each variant. We write a one-page brief and you sign off before any AI generation starts. Sounds light, but most failed copy projects fail at this step.",
  },
  {
    n: "02",
    title: "AI variant generation",
    body: "AI generates 3–5x the volume you actually need. For 12 ad headlines we generate 40+ candidates against the brief. Multiple model passes (Claude, GPT) for diversity. Output is raw material — never shipped without polish.",
  },
  {
    n: "03",
    title: "Human polish",
    body: "A copywriter reads every variant. Strongest 20% gets selected. Each selected variant is polished — phrasing tightened, voice tuned, redundancy killed, brand-specific hooks added. The polish step is where AI copy becomes shippable.",
  },
  {
    n: "04",
    title: "A/B-ready delivery",
    body: "Variants delivered grouped for testing. Variant A vs Variant B with notes on what each is testing (headline length, CTA verb, value-prop angle). You can plug them into your ad platform / email tool / landing-page builder directly.",
  },
] as const;

const CHANNELS = [
  { name: "Paid ads", line: "Google, Meta, LinkedIn — headlines, descriptions, CTAs at variant scale." },
  { name: "Email", line: "Subject lines, preview text, sequences. Highest variant-testing leverage." },
  { name: "Landing pages", line: "Hero, value-props, objection-handling, CTA. Multiple A/B-ready versions." },
  { name: "Product copy", line: "E-commerce catalogs at scale. Cost per SKU drops 70%+." },
  { name: "Social", line: "Captions, threads, hooks. LinkedIn, X, Instagram." },
  { name: "SMS / push", line: "Short-form lifecycle messaging — character limits force tightness." },
];

const TOC = [
  { id: "what", label: "What is AI copywriting" },
  { id: "channels", label: "Channels we cover" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiCopywritingPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Copywriting",
          description:
            "Short-form, conversion-focused copywriting at scale — ad copy, email sequences, landing pages, product descriptions. AI variants, human-polished, A/B-ready.",
          url: URL,
          serviceType: "AI Copywriting",
          image: `/images/services/${SLUG}/hero-1600.jpg`,
          offerings: OFFERINGS.map((o) => ({
            name: o.name,
            description: o.description,
          })),
        })}
      />
      <JsonLd
        id="ld-breadcrumbs"
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
          { name: "AI Services", url: `${site.url}/services/ai-services` },
          { name: "AI Copywriting", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <ChannelsSection />
        <WhatYouGet />
        <ProcessSection />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 grid lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-7">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
            <Link href="/services" className="hover:text-[var(--accent)] transition-colors">Services</Link>
            <span className="text-[var(--line-2)]">/</span>
            <Link href="/services/ai-services" className="hover:text-[var(--accent)] transition-colors">AI Services</Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">AI Copywriting</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Copywriting
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Twenty headlines.{" "}
            <span className="text-[var(--accent)]">By Tuesday.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Ad copy, email sequences, landing pages, product descriptions —
            briefs in, A/B-ready variants out, human-polished before
            delivery. Speed of an AI tool, conversion quality of a real
            copywriter.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link href="/contact" className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all">
              Start a project <span>→</span>
            </Link>
            <Link href="/services/ai-services" className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium">
              All AI services
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <ServiceImage name="hero" alt="Stack of ad, email, and landing page creative units with AI sparkle glyph" priority />
        </Reveal>
      </div>
    </header>
  );
}

function Toc() {
  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-[var(--line)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono pr-3 border-r border-[var(--line)]">On this page</span>
        {TOC.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="shrink-0 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40">
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function WhatIs() {
  return (
    <Section id="what" eyebrow="01" title="What is AI copywriting?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI copywriting is short-form, conversion-focused copy
            production where AI generates many variants quickly and a
            human copywriter selects, polishes, and ships the strongest
            ones. It works best in workflows that already need 10+
            variants — paid ads, email subject lines, landing-page
            sections, product descriptions at scale.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Pure AI copy that ships unedited is what gives the category a
            bad name. AI variants + human polish is where the speed
            advantage compounds without the conversion penalty.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI copywriting = many AI variants, a human picks the best 20%, polishes them, ships A/B-ready packs. Speed without the slop." />
        </Reveal>
      </div>
    </Section>
  );
}

function ChannelsSection() {
  return (
    <Section id="channels" eyebrow="02" title="Channels we cover" blurb="Six channels where the AI variant + human polish workflow compounds best. Each gets its own briefing and delivery format.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="channels" alt="Grid illustration of six copywriting channels — ads, email, landing pages, social, SMS/push, product copy" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHANNELS.map((c) => (
              <li key={c.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{c.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{c.line}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function WhatYouGet() {
  return (
    <Section id="what-you-get" eyebrow="03" title="What you get with us" blurb="The deliverables — written down, so the scope is the scope.">
      <Reveal>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFERINGS.map((o, i) => (
            <li key={o.name} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/60 transition-colors">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                <span className="h-px w-6 bg-[var(--accent)]" />
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.02em] text-white">{o.name}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--muted)]">{o.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section id="process" eyebrow="04" title="How a copywriting brief runs" blurb="Four stages, scoped to channel and volume. Most variant packs ship in 24–48 hours.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI copywriting process from brief to A/B testing" className="mb-12 rounded-2xl" />
      </Reveal>
      <ol className="space-y-6">
        {PROCESS.map((step) => (
          <Reveal key={step.n}>
            <li className="grid grid-cols-12 gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
              <div className="col-span-12 md:col-span-3">
                <div className="font-display text-[44px] leading-none text-[var(--accent)] tracking-tight">{step.n}</div>
                <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] text-white">{step.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/85">{step.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" eyebrow="05" title="Frequently asked questions" blurb="The questions we actually get on scoping calls — answered honestly, not in marketing voice.">
      <div className="grid md:grid-cols-2 gap-4">
        {FAQS.map((f) => (
          <Reveal key={f.q}>
            <details className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] open:border-[var(--accent)]/60 transition-colors">
              <summary className="cursor-pointer list-none p-5 md:p-6 flex items-start justify-between gap-4">
                <span className="font-display text-[16px] md:text-[17px] leading-[1.35] text-white">{f.q}</span>
                <span aria-hidden className="mt-1 shrink-0 text-[var(--accent)] transition-transform group-open:rotate-45 text-[20px] leading-none">+</span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] leading-[1.75] text-[var(--muted)]">{f.a}</div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Section({ id, eyebrow, title, blurb, children }: { id: string; eyebrow: string; title: string; blurb?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-32 border-b border-[var(--line)] bg-[var(--bg)]">
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            Section {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.03em]">{title}</h2>
          {blurb && <p className="mt-4 max-w-[720px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">{blurb}</p>}
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

function Callout({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-6">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">{label}</div>
      <p className="mt-3 text-[14.5px] leading-[1.7] text-white/90">{body}</p>
    </div>
  );
}

function ServiceImage({ name, alt, className = "", priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  const base = `/images/services/${SLUG}/${name}`;
  return (
    <picture className={`block aspect-[16/9] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] ${className}`}>
      <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes="(max-width: 768px) 100vw, 720px" />
      <source type="image/webp" srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes="(max-width: 768px) 100vw, 720px" />
      <img src={`${base}-1600.jpg`} srcSet={`${base}-800.jpg 800w, ${base}-1600.jpg 1600w`} sizes="(max-width: 768px) 100vw, 720px" alt={alt} width={1600} height={900} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} className="w-full h-full object-cover" />
    </picture>
  );
}
