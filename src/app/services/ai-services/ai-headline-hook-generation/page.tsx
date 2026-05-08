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

const SLUG = "ai-headline-hook-generation";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Headline & Hook Generation Services for Higher CTR";
const META_DESCRIPTION =
  "AI-generated headline and hook variants for blog posts, ads, emails, landing pages, and social — 20+ variants per asset, editor-curated, A/B-ready, with proven hook patterns baked in.";

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
        alt: "Stack of three headline cards with a small bar chart highlighting the winner",
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
    q: "What is AI headline and hook generation?",
    a: "It's the production of high-volume headline and hook variants for any asset that lives or dies on its first line — blog posts, ads, emails, landing pages, social posts, video scripts. AI generates 20–40 variants against tested hook patterns; an editor curates the strongest 5–10 for A/B testing. The variant volume is what AI is unusually good at; the curation is what saves you from publishing a flat hook.",
  },
  {
    q: "Why is this a separate service from blog writing or copywriting?",
    a: "Because the workflow is fundamentally different. Blog writing produces one finished long-form asset. Headline generation produces many small variants and treats them as test material. The skills overlap but the volume, format, and selection logic are distinct enough that running them in one engagement waters both down. Most clients use this in parallel with their existing writing process — bring the existing post, get a stack of stronger headline options.",
  },
  {
    q: "Will AI hooks actually convert?",
    a: "On their own, mid. AI hooks alone underperform human hooks in head-to-head tests for high-stakes assets (cold ad headlines, sales-page H1s). AI hooks + editor curation + tested patterns match or beat human-only hooks, in faster cycles. The trick is volume of variants: testing 5 strong AI-derived hooks beats testing 1 'great' human-only hook, every time.",
  },
  {
    q: "What hook patterns do you use?",
    a: "Six core patterns: curiosity question (poses an unanswered question), numbered listicle (specific, scannable), X vs Y comparison (decision-stage intent), urgency / time-bound (scarcity hook), social-proof anchor (authority signal), contrarian / pattern-interrupt (challenges expectation). We benchmark each pattern against the asset type — long-form rewards curiosity questions; ads reward urgency + social proof.",
  },
  {
    q: "How many variants do I get per asset?",
    a: "20–40 generated, 5–10 curated, A/B-ready. For a single blog post we might generate 25 title variants and ship 6 strongest ones organized by pattern (so you can A/B test pattern type, not just phrasing). For an ad campaign we typically ship 12–20 ad-headline variants per campaign across hook patterns.",
  },
  {
    q: "What inputs do you need?",
    a: "The asset (blog post, ad brief, landing page, email body — whatever the headline is for), the audience description, the action you want them to take, and 1–2 examples of headlines you've liked from competitors. That last part matters more than people realize; pattern preferences vary by audience and we calibrate to yours.",
  },
  {
    q: "How fast is the turnaround?",
    a: "24–48 hours for a single-asset variant pack. Same-day delivery available for ad campaigns where you need to start testing tomorrow. Bulk back-catalog projects (100+ legacy posts that need new titles) run in 5–10 days depending on volume.",
  },
  {
    q: "Pricing?",
    a: "Per-pack or monthly retainer. A single-asset pack (20 generated + 6 curated) is fixed-price. Retainers cover ongoing variant generation across blogs, ads, emails, and landing pages — usually 4–8 packs a month with the brand voice profile baked in. Quote sent after a 30-minute scoping call.",
  },
] as const;

const OFFERINGS = [
  {
    name: "20–40 generated variants",
    description:
      "Per asset, against six tested hook patterns. Volume is the unfair advantage — testing 6 hooks beats picking one and hoping.",
  },
  {
    name: "Editor curation",
    description:
      "Strongest 5–10 selected, polished, organized by pattern so you can A/B test pattern type (not just phrasing).",
  },
  {
    name: "Six tested hook patterns",
    description:
      "Curiosity question, numbered listicle, X vs Y comparison, urgency, social proof, contrarian. Calibrated per asset type.",
  },
  {
    name: "Brand voice tuning",
    description:
      "Voice profile from your existing best-performing hooks. AI generation honors it; curation catches drift.",
  },
  {
    name: "A/B-ready delivery",
    description:
      "Variants delivered grouped for testing — Variant A vs Variant B with notes on what each is testing. Plug into your CMS / ad tool / email platform.",
  },
  {
    name: "Performance learning loop",
    description:
      "Optional: feed test results back to us monthly. We refine the voice profile and pattern weighting based on what's actually winning.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief",
    body: "30-minute scoping call captures the asset (blog post, ad, email, landing page), the audience, the action you want, and 2–3 hooks you've liked from competitors. We write a one-page brief — what we're optimizing for and against. Half the failed headline projects fail at this step.",
  },
  {
    n: "02",
    title: "Variant generation",
    body: "AI generates 20–40 variants against the six hook patterns. Multiple model passes (Claude, GPT) for diversity. Brand voice profile baked in. Output is raw — never shipped without curation.",
  },
  {
    n: "03",
    title: "Editor curation",
    body: "An editor reads every variant. Strongest 5–10 selected. Each is polished — phrasing tightened, voice tuned, pattern-specific quirks fixed. Selected variants organized by pattern so you can test pattern type, not just phrasing.",
  },
  {
    n: "04",
    title: "A/B-ready delivery",
    body: "Pack delivered in your preferred format — CSV, Google Sheets, Notion, direct CMS write. Each variant tagged with its hook pattern and what it's testing for. You plug into your testing tool and start.",
  },
] as const;

const PATTERNS = [
  { name: "Curiosity question", line: "Poses unanswered question. Best for blog posts and email subjects." },
  { name: "Numbered listicle", line: "Specific, scannable. Strong CTR on social and Google search." },
  { name: "X vs Y comparison", line: "Decision-stage intent. Best for ads, comparison content." },
  { name: "Urgency / time-bound", line: "Scarcity hook. Strong on ads, sale emails, launch pages." },
  { name: "Social proof anchor", line: "Authority signal (e.g. '50K founders use this'). Trust-driven." },
  { name: "Contrarian / interrupt", line: "Challenges expectation. Pattern-interrupt for content + Reels." },
];

const TOC = [
  { id: "what", label: "What is hook generation" },
  { id: "patterns", label: "Hook patterns" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiHeadlinePage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Headline & Hook Generation",
          description:
            "20+ headline and hook variants per asset, editor-curated against six tested hook patterns, A/B-ready for blog, ads, email, and landing pages.",
          url: URL,
          serviceType: "AI Headline & Hook Generation",
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
          { name: "AI Headline & Hook Generation", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <PatternsSection />
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
            <span className="text-white">AI Headline & Hook Generation</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Headline & Hook Generation
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Test 6 hooks.{" "}
            <span className="text-[var(--accent)]">Not pick one and pray.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            20–40 headline / hook variants per asset, against six tested
            patterns, editor-curated, A/B-ready. Same speed as ChatGPT-by-yourself,
            without the flat hooks that come out of one-shot prompts.
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
          <ServiceImage name="hero" alt="Three stacked headline cards with a small bar chart highlighting the winning variant" priority />
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
    <Section id="what" eyebrow="01" title="What is AI headline & hook generation?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            It&apos;s the production of high-volume headline and hook
            variants for any asset that lives or dies on its first line —
            blog posts, ads, emails, landing pages, video scripts. AI
            generates 20–40 variants against tested hook patterns; an
            editor curates the strongest 5–10 for A/B testing.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The variant volume is what AI is unusually good at. The
            curation is what saves you from publishing a flat hook. AI
            hooks alone underperform human hooks; AI variants + editor
            curation match or beat human-only — in faster cycles, with
            more tests run.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="Hook generation = AI produces 20+ variants, editor picks the best 6, you A/B test pattern types. Volume is the edge." />
        </Reveal>
      </div>
    </Section>
  );
}

function PatternsSection() {
  return (
    <Section id="patterns" eyebrow="02" title="Six tested hook patterns" blurb="Each pattern matches a different audience psychology. We calibrate which patterns to weight per asset type and per audience.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="patterns" alt="Grid illustration of six headline patterns — curiosity, numbered, comparison, urgency, social proof, contrarian" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PATTERNS.map((p) => (
              <li key={p.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{p.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{p.line}</div>
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
    <Section id="process" eyebrow="04" title="How a hook pack runs" blurb="Four stages, 24–48 hour turnaround per pack. Same-day available for ad campaigns.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI headline generation and testing process" className="mb-12 rounded-2xl" />
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
