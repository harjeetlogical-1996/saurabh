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

const SLUG = "ai-logo-design";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Logo Design Services · Brand Marks at Studio Quality";
const META_DESCRIPTION =
  "AI-assisted logo design with human direction — 30+ exploratory variants per brief, 3 polished directions, vectorized SVG handoff, full brand-mark system. Faster than agency, more thoughtful than DIY.";

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
        alt: "3x3 grid of abstract logo candidate marks with the chosen direction highlighted",
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
    q: "What is AI-assisted logo design?",
    a: "AI generates 30+ exploratory directions from your brand brief in hours, a designer curates the strongest 3 directions, refines them, and vectorizes the chosen one to a clean SVG with a full brand-mark system. The AI handles the divergent exploration phase that used to take a week of designer hours; the human handles the convergence and polish that AI still can't do.",
  },
  {
    q: "Will my AI-generated logo look generic or amateurish?",
    a: "Without curation, yes — there's a reason AI logo tools have a bad reputation. Our process treats the AI output as raw exploration, not finished work. A designer reviews every variant, picks 3 directions worth refining, redraws them as proper vector marks (not raster), and builds the surrounding brand system. The output is studio-quality; the AI just made the early exploration cheaper and faster.",
  },
  {
    q: "Do I get vector files I can scale forever?",
    a: "Yes. Final logos ship as proper SVGs with named, organized paths — not auto-traced raster outputs that fall apart on close inspection. The vectorization step is one of the highest-leverage parts of our process. SVGs work at favicon size and billboard size from the same source.",
  },
  {
    q: "What's included beyond the logo file?",
    a: "Six things. (1) The primary logomark in SVG, plus PNG export at multiple sizes. (2) Light and dark variants. (3) Horizontal and stacked lockups (mark + wordmark). (4) Favicon-optimized variant (works at 32×32). (5) Brand color palette in HEX, RGB, and HSL. (6) Typography pairing recommendation with primary + secondary fonts. Optional add-on: a one-page brand-style PDF.",
  },
  {
    q: "How long does it take?",
    a: "5–7 business days end-to-end. Day 1: brand brief + AI variant generation. Day 2: designer reviews 30+ variants and picks 3 directions. Days 3–4: refinement and vectorization of the 3 directions. Day 5: client picks one direction; final polish. Days 6–7: full deliverable system shipped. Faster than the 3–6 weeks a typical agency engagement takes.",
  },
  {
    q: "Will I own the rights?",
    a: "Yes — full ownership transfers to you. Logos created with this process are not reused for other clients. We don't generate from template marketplaces. The AI exploration and the human refinement are both unique to your brief, and the final SVG is yours alone.",
  },
  {
    q: "Can I trademark an AI-assisted logo?",
    a: "Yes. The trademark you file is on the final mark — which is human-refined, vectorized, and uniquely tied to your brand. AI exploration in the early phase doesn't affect trademark eligibility, the same way moodboards or sketches don't. We've had multiple clients successfully trademark logos that started life as AI variants. Always check with your IP lawyer for jurisdiction-specific rules.",
  },
  {
    q: "How is this different from using Looka or Canva's AI logo maker?",
    a: "Tools like Looka generate from templated marketplaces — your logo will overlap with hundreds of other brands using the same templates. Our process uses fresh generation per brief plus full human refinement. Output is a unique mark, properly vectorized, with a real brand system around it. Cost is higher than tool-only ($500–2000 vs $20), but the result is something you can build a brand around.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Brand brief workshop",
    description:
      "30-minute call captures brand values, audience, competitors, mood references, must-have / must-avoid signals. Brief is what every variant prompt is generated against.",
  },
  {
    name: "30+ AI direction variants",
    description:
      "Generated across multiple style axes — wordmark, lettermark, abstract mark, emblem, geometric, organic. Volume is the unfair advantage at the exploration stage.",
  },
  {
    name: "3 designer-refined directions",
    description:
      "A designer picks the strongest 3, refines each with proper proportions, optical adjustments, and applies them in 2–3 mockup contexts so you see how each lives.",
  },
  {
    name: "Full vector finalization",
    description:
      "Chosen direction redrawn from scratch in vector — not auto-traced. Clean paths, named layers, optical centering, scalable from favicon to billboard.",
  },
  {
    name: "Brand-mark system",
    description:
      "Light + dark variants, horizontal + stacked lockups, favicon-optimized variant, color palette, typography pairing — everything you need to actually deploy the logo.",
  },
  {
    name: "Optional one-page brand guide",
    description:
      "Mini brand-style PDF with usage rules, clear-space, minimum size, do's and don'ts. Useful when handing off to dev teams or freelance designers later.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brand brief",
    body: "30-minute scoping call. We capture values, audience, competitors, 5–8 mood references you've pulled, must-have signals (e.g. 'must feel premium / approachable / technical'), must-avoid signals (e.g. 'no swooshes, no globes'). Output is a one-page brief that every prompt generates against.",
  },
  {
    n: "02",
    title: "AI variant generation",
    body: "30+ direction variants generated across multiple style axes — wordmark, lettermark, abstract mark, emblem, geometric, organic. We use the right model per axis (Midjourney for organic, Stable Diffusion for clean geometric, DALL-E for type-led). Output is raw exploration, never shipped.",
  },
  {
    n: "03",
    title: "Designer refinement",
    body: "A designer reviews every variant. Strongest 3 directions picked. Each refined — proportions adjusted, optical centering fixed, applied in 2–3 mockup contexts (business card, app icon, signage). You review the 3 directions and pick one to take forward.",
  },
  {
    n: "04",
    title: "Vector finalization & system",
    body: "Chosen direction redrawn from scratch in vector — clean SVG paths, named layers, scalable cleanly. Light + dark variants, horizontal + stacked lockups, favicon-optimized variant. Color palette and typography pairing finalized. Full asset pack delivered.",
  },
] as const;

const DELIVERABLES = [
  { name: "Vector SVG primary mark", line: "Clean paths, named layers, scales cleanly from favicon to billboard." },
  { name: "Light + dark variants", line: "Optimized for both light and dark backgrounds. PNG exports included." },
  { name: "Horizontal + stacked lockups", line: "Mark + wordmark combinations for navbar, footer, business cards." },
  { name: "Favicon-optimized variant", line: "Simplified mark that reads cleanly at 32×32 browser tab size." },
  { name: "Color palette", line: "Primary + secondary + accent in HEX, RGB, HSL. Accessibility-checked." },
  { name: "Typography pairing", line: "Recommended primary + secondary fonts with weight + size guidance." },
];

const TOC = [
  { id: "what", label: "What is AI logo design" },
  { id: "deliverables", label: "Deliverables" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiLogoDesignPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Logo Design",
          description:
            "AI-assisted logo design with human direction. 30+ AI variants, 3 designer-refined directions, full vector handoff, complete brand-mark system.",
          url: URL,
          serviceType: "AI Logo Design",
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
          { name: "AI Logo Design", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <DeliverablesSection />
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
            <span className="text-white">AI Logo Design</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Logo Design
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            30 directions in a day.{" "}
            <span className="text-[var(--accent)]">One mark you can build a brand on.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            AI handles the early divergent exploration. A designer handles
            the convergence, vector finalization, and brand system. Faster
            than agency, more thoughtful than DIY tools — with a real SVG
            file you actually own.
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
          <ServiceImage name="hero" alt="3x3 grid of abstract logo candidate marks with the chosen direction highlighted" priority />
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
    <Section id="what" eyebrow="01" title="What is AI-assisted logo design?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI generates 30+ exploratory directions from your brief in
            hours; a designer curates the strongest 3, refines each, and
            vectorizes the chosen one. The AI handles the divergent
            exploration phase that used to take a week of designer hours;
            the human handles the convergence and polish that AI still
            can&apos;t do.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Cheaper than agency. More thoughtful than DIY tools. The
            difference is the curation + vectorization layer — that&apos;s
            what turns AI exploration into a mark you can actually build a
            brand around.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI logo design = AI does breadth, designer does depth + vector. Studio quality at a fraction of the timeline." />
        </Reveal>
      </div>
    </Section>
  );
}

function DeliverablesSection() {
  return (
    <Section id="deliverables" eyebrow="02" title="Six deliverables in your final pack" blurb="A logo file alone isn't enough to deploy a brand. We ship the full system around it.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="deliverables" alt="Grid illustration of six logo design deliverables" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DELIVERABLES.map((d) => (
              <li key={d.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{d.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{d.line}</div>
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
    <Section id="process" eyebrow="04" title="How a logo gets designed" blurb="Four stages over 5–7 business days. Faster than the 3–6 weeks a typical agency engagement takes.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI logo design process" className="mb-12 rounded-2xl" />
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
