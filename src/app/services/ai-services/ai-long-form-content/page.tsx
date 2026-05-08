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

const SLUG = "ai-long-form-content";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Long-Form Content Writing · 10K+ Word Pillar Guides";
const META_DESCRIPTION =
  "AI-assisted long-form content production — 10,000+ word pillar guides, ebooks, whitepapers, and definitive resources that rank, get cited by AI engines, and convert.";

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
        alt: "Tall long-form guide document with chapter sections and sticky chapter nav",
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
    q: "What counts as long-form content here?",
    a: "10,000 words and up. Definitive guides, ebooks, state-of-X reports, industry benchmarks, whitepapers, knowledge-base hubs. Anything substantial enough to be the definitive resource on a topic — not just a regular blog post that happens to be long.",
  },
  {
    q: "Why does long-form still matter in the AI era?",
    a: "Long-form is one of the most reliable plays for AI engine citations and Google rankings simultaneously. AI engines (ChatGPT, Perplexity, Gemini) cite comprehensive sources for nuanced questions. Google rewards depth on competitive head terms. A single 12,000-word pillar piece often out-earns 30 thinner blog posts because each section gets cited independently across both surfaces.",
  },
  {
    q: "How do you keep 10,000+ words feeling like one piece, not stitched chapters?",
    a: "Editor-owned outline up front, written before any AI involvement. The outline locks the angle, voice anchors, internal callbacks, and how each chapter feeds the next. AI then drafts within that frame chapter-by-chapter. The editing pass tightens transitions and unifies voice. Most readers can't tell where one chapter ended and the next began.",
  },
  {
    q: "Will Google rank a 10K-word piece without seeing it as bloated?",
    a: "Yes — when the length is justified by the question. Pieces written for already-comprehensive queries (definitive guide, state-of-X reports, ultimate handbooks) reward depth. We don't pad. If a topic deserves 4,000 words, we ship 4,000. We don't artificially inflate to 10K to hit a length target.",
  },
  {
    q: "How long does a 10K-word piece take?",
    a: "3–4 weeks end-to-end. Week 1 is research and outline. Week 2 is AI drafting (chapter by chapter). Week 3 is the editing pass — voice tuning, fact-checking, transitions, callbacks. Week 4 is SEO finalization, schema, internal linking, design layout (if we're shipping the visual side too). Faster turnarounds possible for clients with tight deadlines.",
  },
  {
    q: "What's included beyond the writing?",
    a: "Topic + keyword research, editor-owned outline, AI drafting, full human editing pass, fact-checking with named-source citations, on-page SEO (title, meta, H-tags, schema), internal-link suggestions to your existing content, FAQ section with FAQPage schema, suggested external citations, optional design layout for ebook / PDF distribution. Plagiarism + AI-detection report included.",
  },
  {
    q: "Will it actually rank or just sit there?",
    a: "We track. Every long-form piece we ship gets a baseline ranking probe at week 0 and a follow-up at week 12. We've shipped pieces that ranked top-3 for head terms inside 90 days; we've also shipped pieces that took 6 months. Topic competition matters more than effort here. We tell you upfront what to expect for your specific topic, not what marketing teams want to hear.",
  },
  {
    q: "How is it priced?",
    a: "Per-piece, scoped by length and research depth. A 10,000-word definitive guide on an established topic costs less than a 12,000-word original-research report (which needs survey or data work). Quote sent after a 30-minute scoping call. No per-hour billing.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Topic + keyword research",
    description:
      "Validate the topic deserves 10K+ words. Primary keyword + 8–15 secondary terms + every long-tail variation worth covering in chapters.",
  },
  {
    name: "Editor-owned outline",
    description:
      "Before any AI. Chapter structure, angle, voice anchors, internal callbacks — the document that holds the piece together.",
  },
  {
    name: "AI chapter drafting",
    description:
      "Chapter by chapter against the approved outline. Best model per chapter (Claude for nuance, GPT for structure, Gemini for facts).",
  },
  {
    name: "Editorial polish",
    description:
      "Full human pass on every chapter. Voice tuned, transitions tightened, mechanical phrasing rewritten, callbacks added, fact-checking.",
  },
  {
    name: "On-page SEO + schema",
    description:
      "Title, meta, H-hierarchy, FAQ schema, table of contents anchors, internal-link map to your existing posts, optional Article schema.",
  },
  {
    name: "Plagiarism + AI-detection",
    description:
      "Every piece ships with Copyscape report and AI-detection score. Under 15% AI flag, under 5% in practice.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Topic & keyword research",
    body: "First we validate the topic deserves 10K+ words. Search volume, competitor depth, AI-engine citation gaps, and intent classification. Output is one page: primary keyword, secondary terms, why this length is justified, expected ranking ceiling, and what 'success' looks like at month 3 and month 12.",
  },
  {
    n: "02",
    title: "Editor-owned outline",
    body: "A human editor — not the AI — writes the outline. Every chapter title, the argument it makes, key claims, named sources to cite, internal callbacks, voice anchors. The outline becomes the document we both sign off on before AI gets involved. Most failed long-form pieces fail at this step, not at the draft step.",
  },
  {
    n: "03",
    title: "AI chapter drafting",
    body: "Chapter by chapter, not all at once. We pick the best model for each chapter type — Claude for nuanced argument, GPT for structured comprehensive coverage, Gemini for fact-heavy sections. Each chapter draft is 1500–3000 words depending on the outline allocation.",
  },
  {
    n: "04",
    title: "Editorial polish",
    body: "Full editing pass on every chapter. Voice tuned to your brand. Transitions between chapters tightened. Mechanical phrasing rewritten. Fact-checking with named-source citations. Callbacks added so the piece reads like one document, not stitched chapters. This is the longest step — typically a full week for a 10K piece.",
  },
  {
    n: "05",
    title: "SEO finalization",
    body: "Title, meta description, H-tag hierarchy, table-of-contents anchors, FAQ schema, internal-link map to your existing content. Plagiarism + AI-detection reports run. Optional design layout if we're shipping a PDF / ebook variant alongside the web version.",
  },
] as const;

const USE_CASES = [
  { name: "Definitive guides", line: "'The complete guide to X' — competing with established head terms." },
  { name: "Original data reports", line: "Survey-based or proprietary-data reports. Strongest link bait." },
  { name: "Ebooks", line: "PDF download for lead capture. Web + PDF variants from one source." },
  { name: "Whitepapers", line: "B2B technical or strategic deep-dives. Sales-enablement-friendly." },
  { name: "State-of-X reports", line: "Industry benchmarks, annual recurring asset, citation-magnet." },
  { name: "Knowledge-base hubs", line: "Long-form pillar pages with 20+ subtopic pages linked underneath." },
];

const TOC = [
  { id: "what", label: "What is long-form here" },
  { id: "use-cases", label: "Use cases" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiLongFormPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Long-Form Content (10K+ word guides)",
          description:
            "AI-assisted long-form content — pillar guides, ebooks, whitepapers, state-of-X reports. Editor-owned outlines, AI chapter drafts, full editing, SEO + schema.",
          url: URL,
          serviceType: "AI Long-Form Content",
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
          { name: "AI Long-Form Content", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <UseCasesSection />
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
            <span className="text-white">AI Long-Form Content</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Long-Form Content
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Be the definitive resource.{" "}
            <span className="text-[var(--accent)]">Not the 35th blog post.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            10,000+ word pillar guides, ebooks, whitepapers, and state-of-X
            reports. Editor-owned outlines, AI chapter drafts, full editorial
            polish, SEO + schema. The single asset that out-earns 30 thin
            blog posts.
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
          <ServiceImage name="hero" alt="Tall long-form guide document with table-of-contents, chapter sections, and a sticky chapter nav" priority />
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
    <Section id="what" eyebrow="01" title="What counts as long-form here?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            10,000 words and up. Definitive guides, ebooks, state-of-X
            reports, industry benchmarks, whitepapers, knowledge-base hubs.
            Anything substantial enough to be the definitive resource on a
            topic — not just a regular blog post that happens to be long.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Long-form is one of the most reliable plays for AI engine
            citations and Google rankings simultaneously. AI engines cite
            comprehensive sources. Google rewards depth on competitive head
            terms. A single 12,000-word pillar often out-earns 30 thinner
            blog posts because each section gets cited independently
            across both surfaces.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="Long-form here = 10K+ words. The single piece that becomes the definitive resource — not a stretched-out blog." />
        </Reveal>
      </div>
    </Section>
  );
}

function UseCasesSection() {
  return (
    <Section id="use-cases" eyebrow="02" title="What we ship as long-form" blurb="Six categories where the depth pays off. Smaller pieces don't earn the chapter-level citation footprint that compounds across AI engines and Google.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="use-cases" alt="Grid illustration of six long-form use cases — definitive guide, data report, ebook, whitepaper, state-of-X report, industry benchmark" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USE_CASES.map((u) => (
              <li key={u.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{u.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{u.line}</div>
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
    <Section id="process" eyebrow="04" title="How a 10K-word piece gets made" blurb="Five stages over 3–4 weeks. Editor-owned outline before AI involvement is the move that makes long-form survive editing.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the five-stage AI long-form content process from research to SEO finalization" className="mb-12 rounded-2xl" />
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
