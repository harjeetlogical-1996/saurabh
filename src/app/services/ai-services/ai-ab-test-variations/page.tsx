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

const SLUG = "ai-ab-test-variations";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI A/B Test Variation Creation for CRO Programs";
const META_DESCRIPTION =
  "AI-generated A/B test variants for CTAs, headlines, hero blocks, ads, emails, pricing — hypothesis-led, statistically scoped, A/B-ready packs. Run more tests, learn faster.";

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
        alt: "Two side-by-side A/B test mockups with a small bar chart showing the winning variant",
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
    q: "What is AI A/B test variation creation?",
    a: "It's the production of variant copy, layouts, and creative ideas for A/B testing — at the volume your testing program actually needs to learn at speed. AI generates 10–25 variants against a clear hypothesis; an editor selects 3–5 worth shipping; you run the test. The bottleneck for most CRO programs is not the testing tool, it's running out of variant ideas. We solve that.",
  },
  {
    q: "Won't AI variants all converge on the same idea?",
    a: "If you prompt naively, yes — that's the trap. Our process avoids it by generating across distinct hypothesis vectors (different value props, different urgency framings, different audience anchors), not just rewordings of the same idea. Each variant tests a different mental model of why the user should act, not different phrasings of one. That's the difference between 'AI variants' and 'AI variants worth testing'.",
  },
  {
    q: "What can you generate variants for?",
    a: "Six common test types. CTA copy and design (button text, color, size, placement). Headlines and sub-headlines. Hero block (image / video / mockup). Email subject lines and preview text. Ad creative (headline + description + image angle). Pricing and offer structure (plan naming, price points, anchor framing). We don't run the tests — we feed the variant pipeline that lets your CRO team run more.",
  },
  {
    q: "Do you do the design too, or just copy?",
    a: "Both. Copy variants are the bulk. For visual variants (CTA color, hero layout, ad image direction) we provide either ready-to-test mockups (Figma frames) or briefs your designer can execute. We can also handle full creative production if you want it scoped — usually for ad creative tests where multi-variant production is the bottleneck.",
  },
  {
    q: "How is this different from AI Copywriting?",
    a: "AI Copywriting produces final ad / email / landing copy. A/B Variation Creation produces test material — multiple variants of one specific element (CTA, headline, etc.) under a clear hypothesis, designed to inform what you ship next. Same skills, different framing. Think of one as 'production' and the other as 'experimentation'.",
  },
  {
    q: "How does the hypothesis brief work?",
    a: "Before any variants, we co-write a one-page hypothesis: what we're testing, what change we expect, why, what the success metric is, what the minimum detectable effect needs to be for the test to be worth running. Most CRO failures happen because tests run without a clear hypothesis — we make that step mandatory.",
  },
  {
    q: "Will you also help interpret results?",
    a: "Optional add-on. We offer a results-readout service where after each test we synthesize what won, what didn't, what the result actually means (separating signal from noise), and what test to run next. Most clients add this in month two when they realize raw test results don't auto-translate into next moves.",
  },
  {
    q: "Pricing?",
    a: "Per-pack or monthly retainer. A single test pack (1 hypothesis, 5 ready-to-ship variants, optional design) is fixed-price. Retainers cover a steady stream — 4–8 test packs per month with hypothesis briefs, variants, and optional results readout. Quote sent after a 30-minute scoping call.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Hypothesis brief",
    description:
      "Before variants, a one-page brief: what we're testing, what we expect, success metric, minimum detectable effect. Mandatory step.",
  },
  {
    name: "Variant generation",
    description:
      "10–25 variants per test, generated across distinct hypothesis vectors — different value props, framings, anchors. Not just rewordings.",
  },
  {
    name: "Editor curation",
    description:
      "3–5 strongest variants selected, polished, paired so each tests a different idea. Variants delivered with what each is testing.",
  },
  {
    name: "Visual mockups (when needed)",
    description:
      "Figma frames or briefs your designer can execute. Full creative production for ad-creative tests on request.",
  },
  {
    name: "Test-ready delivery",
    description:
      "Variants delivered in your CRO tool's preferred format (Optimizely, VWO, Google Optimize alternative, native ad-platform variants).",
  },
  {
    name: "Optional results readout",
    description:
      "After each test we synthesize what won, what the result means (signal vs noise), what to test next. The most common upgrade in month two.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Hypothesis brief",
    body: "Before any variants, we co-write a one-page hypothesis: the change we're testing, the expected effect, the success metric, and the minimum detectable effect that makes the test worth running. Most CRO failures happen because tests ran without a clear hypothesis — we make this step non-negotiable.",
  },
  {
    n: "02",
    title: "Variant generation",
    body: "AI generates 10–25 variants against the brief. Critically, we generate across distinct hypothesis vectors (different value props, urgency framings, audience anchors) — not just rewordings of the same idea. That's the difference between variants worth testing and variants that all converge on the same number.",
  },
  {
    n: "03",
    title: "Curation & pairing",
    body: "An editor selects 3–5 strongest variants. Each is polished and paired so the test learns something — Variant A tests value-prop framing, Variant B tests urgency framing, etc. You learn what audience psychology matters, not just which phrasing won by 0.3%.",
  },
  {
    n: "04",
    title: "Test-ready delivery",
    body: "Variants delivered in your CRO tool's preferred format — Optimizely / VWO / native ad-platform variants / direct-write to your CMS. Each variant tagged with its hypothesis vector so your team knows what each is testing for. You plug in and start.",
  },
] as const;

const TEST_TYPES = [
  { name: "CTA copy & design", line: "Button text, color, placement. Highest-leverage, fast-cycle test." },
  { name: "Headlines / sub-heads", line: "Hero H1s, blog post titles, ad headlines. Pattern-based variants." },
  { name: "Hero block", line: "Image / video / mockup direction. Layout + asset variants." },
  { name: "Email subjects", line: "Subject lines + preview text. High-volume variant testing fits here." },
  { name: "Ad creative", line: "Headline + description + image direction. Multi-variant for paid." },
  { name: "Pricing / offers", line: "Plan naming, anchor structure, price-point tests." },
];

const TOC = [
  { id: "what", label: "What is variant creation" },
  { id: "test-types", label: "Test types" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AbTestPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI A/B Test Variation Creation",
          description:
            "AI-generated A/B test variants for CTAs, headlines, hero, ads, emails, pricing. Hypothesis-led, editor-curated, A/B-ready, with optional results readout.",
          url: URL,
          serviceType: "A/B Test Variation Creation",
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
          { name: "AI A/B Test Variations", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <TestTypesSection />
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
            <span className="text-white">AI A/B Test Variations</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · A/B Test Variation Creation
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Run more tests.{" "}
            <span className="text-[var(--accent)]">Learn faster.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Hypothesis briefs, AI-generated variants across distinct vectors,
            editor curation, test-ready delivery. The variant pipeline your
            CRO program needs to actually learn at speed — not just publish.
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
          <ServiceImage name="hero" alt="Two side-by-side A/B test mockups with a small bar chart showing the winning variant" priority />
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
    <Section id="what" eyebrow="01" title="What is AI A/B test variation creation?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            It&apos;s the production of variant copy, layouts, and creative
            ideas for A/B testing — at the volume your testing program
            actually needs. AI generates 10–25 variants against a clear
            hypothesis; an editor selects 3–5 worth shipping; you run the
            test.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The bottleneck for most CRO programs isn&apos;t the testing
            tool. It&apos;s running out of variant ideas worth testing.
            Generating across distinct hypothesis vectors (not just
            rewordings) is the difference between AI variants that all
            converge on the same number and AI variants that actually
            inform what you ship next.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="A/B variant creation = the variant pipeline behind your CRO program. Hypothesis-led, multi-vector, test-ready packs." />
        </Reveal>
      </div>
    </Section>
  );
}

function TestTypesSection() {
  return (
    <Section id="test-types" eyebrow="02" title="Six test types we generate variants for" blurb="Each type has its own variant patterns and minimum-detectable-effect requirements. We calibrate per type — not one-size-fits-all.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="test-types" alt="Grid illustration of six A/B test types — CTA, headline, hero, email subject, ad creative, pricing" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEST_TYPES.map((t) => (
              <li key={t.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{t.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{t.line}</div>
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
    <Section id="process" eyebrow="04" title="How a variant pack runs" blurb="Four stages, scoped per test. Hypothesis brief mandatory — most CRO failures trace back to skipping it.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage A/B test variation process" className="mb-12 rounded-2xl" />
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
