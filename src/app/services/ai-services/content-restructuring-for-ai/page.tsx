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

const SLUG = "content-restructuring-for-ai";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Content Restructuring for AI · Make Your Pages Citable";
const META_DESCRIPTION =
  "Content restructuring for AI that turns your existing pages into citation-friendly, AI-parseable assets — Q&A blocks, factual leads, named entities, FAQ schema, and citation tracking.";

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
        alt: "Before-and-after illustration of dense paragraphs being restructured for AI parsing",
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
    q: "What is content restructuring for AI?",
    a: "It's the work of taking content you've already written — blog posts, landing pages, support docs, knowledge bases — and reorganizing it so AI engines can parse it cleanly and lift it as a source. The words don't always change much; the structure changes a lot. Short factual lead at the top, expanded explanation underneath, supporting list or comparison, named entities, source citations of your own. Same brand voice, very different machine-readability.",
  },
  {
    q: "Why does AI need content restructured? Isn't good writing enough?",
    a: "Good writing for humans is often bad input for AI. Long opening paragraphs that 'set up' a topic, narrative leads that defer the answer, vague claims with no named entities — all of that is fine for human readers but invisible to AI engines that need a clear factual hook to lift. Restructuring keeps the human-readable layer intact while adding the machine-parseable structure on top.",
  },
  {
    q: "How is this different from writing new content?",
    a: "Restructuring uses what you already have. Most clients have hundreds of well-written pages that just aren't AI-friendly. Restructuring is faster and cheaper than authoring net-new content, and the existing pages already rank for something — so you preserve their classic SEO value while adding AI citation upside. We typically restructure 30–80 priority pages in the first sprint.",
  },
  {
    q: "What changes structurally?",
    a: "Six patterns get applied wherever they fit. (1) Factual lead — first paragraph answers the page's question in 40–60 words. (2) Q&A blocks — common follow-up questions answered explicitly with FAQ schema. (3) Numbered or stepped lists where the content is process-oriented. (4) Comparison tables for 'X vs Y' content. (5) Named-source citations of our own throughout. (6) Explicit named entities — people, products, places, dates — instead of pronouns and vague references.",
  },
  {
    q: "How long does restructuring 30–50 pages take?",
    a: "Four to six weeks for a focused sprint. Week one is the audit and the restructuring plan per page. Weeks two through five are the actual rewrites, applied directly in your CMS. Week six is QA — schema validation, AI parse-checks, and a baseline citation probe to compare against six weeks later when we measure the lift.",
  },
  {
    q: "Will this hurt our existing rankings?",
    a: "No, almost always the opposite. Pages restructured for AI parsing read more directly, lead with the answer, and use cleaner heading hierarchy — exactly the signals Google's main ranking algorithm rewards too. We see classic SEO rankings improve on restructured pages 70–80% of the time, and citation share lift on the AI surfaces is a separate, additive win.",
  },
  {
    q: "Do I need to bring my editors and writers in?",
    a: "Yes — we don't go silent on brand voice. Every restructured page goes through your editor for voice review before it ships. Our role is the structural rewrite (where the answer goes, what gets bulleted, where schema is added). Your editors keep the writing in your house style. Most teams find this collaboration tightens both sides — your writers learn AI patterns, our restructure stays in voice.",
  },
  {
    q: "How do you measure that restructuring worked?",
    a: "Two before-and-after probes: classic Google rankings on the target keywords (we expect to hold or improve), and citation share across ChatGPT, Perplexity, Google AI Overviews, and Gemini for the queries each page targets. We baseline at week 0 and remeasure at week 8 to give the engines time to recrawl. Most pages show measurable AI citation lift in that window.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Content audit",
    description:
      "Page-by-page inventory of what's there, what's working, and what's invisible to AI engines today.",
  },
  {
    name: "Per-page restructuring plan",
    description:
      "For each priority page: which restructuring patterns to apply, what schema to add, what entities to surface explicitly.",
  },
  {
    name: "Rewrite-in-place execution",
    description:
      "Edits applied directly in your CMS — same URL, same brand voice, restructured for AI parse-ability.",
  },
  {
    name: "Schema implementation",
    description:
      "FAQ, Article, HowTo, Person, Organization schema added per page where relevant — the markup AI engines lean on heavily.",
  },
  {
    name: "Editorial templates",
    description:
      "Templates and a written guide so your in-house team can keep producing AI-grade content without us after the engagement.",
  },
  {
    name: "Before/after citation tracking",
    description:
      "Baseline citation probe at week zero, follow-up probe at week eight — the data that proves restructuring actually moved the needle.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Audit",
    body: "We crawl your priority pages and assess each one against the AI-parseability checklist: clear factual lead, explicit Q&A blocks, named entities, schema, source citations. Most pages we audit hit 30–50% of the checklist. Output is a sortable spreadsheet of every page, what it's missing, and the expected lift if we fix it.",
  },
  {
    n: "02",
    title: "Restructuring plan",
    body: "For each priority page (typically 30–80 in the first sprint) we draft a concrete plan: what to add, what to move, what to delete. Editor review before any keystrokes — your team signs off on each plan so we don't change anything you didn't agree to.",
  },
  {
    n: "03",
    title: "Rewrite-in-place",
    body: "Edits go directly into your CMS — same URLs, same brand voice. We work alongside your editors so structural changes don't break voice. Schema (Article, FAQ, HowTo, Person, Organization) gets added in the same pass. Each page ships when both we and your editors sign off.",
  },
  {
    n: "04",
    title: "Validation & tracking",
    body: "Schema validators (Google's Rich Results Test + schema.org) catch malformed markup. AI parse-checks confirm engines see the new structure. Baseline citation probe runs the day before launch; follow-up probe at week eight measures actual citation lift. Findings synthesized into a one-page summary with next-sprint recommendations.",
  },
] as const;

const PATTERNS = [
  { name: "Factual lead", line: "First 40–60 words answer the page's question directly." },
  { name: "Q&A blocks", line: "Follow-up questions answered explicitly, FAQ schema attached." },
  { name: "Numbered steps", line: "Process content broken into ordered, parseable steps." },
  { name: "Comparison tables", line: "X vs Y queries lifted cleanly from structured tables." },
  { name: "Named-source citations", line: "Pages that cite credible sources are themselves cited more." },
  { name: "Explicit entities", line: "Real names, products, places, dates — not pronouns or vague refs." },
];

const TOC = [
  { id: "what", label: "What is restructuring" },
  { id: "patterns", label: "Restructuring patterns" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function ContentRestructuringPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Content Restructuring for AI",
          description:
            "Restructure existing content so AI engines can parse and cite it. Q&A blocks, factual leads, named entities, FAQ schema, and citation lift tracking.",
          url: URL,
          serviceType: "Content Restructuring for AI",
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
          { name: "Content Restructuring for AI", url: URL },
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
            <span className="text-white">Content Restructuring for AI</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Content Restructuring for AI
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Same words. Different structure.{" "}
            <span className="text-[var(--accent)]">Suddenly cited.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Most of your existing pages aren&apos;t bad — they&apos;re just
            invisible to AI. We restructure the content you already have
            into the format ChatGPT, Perplexity, and Google AI Overviews
            lift cleanly. Same brand voice, very different machine-readability.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Start a project <span>→</span>
            </Link>
            <Link
              href="/services/ai-services"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              All AI services
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <ServiceImage
            name="hero"
            alt="Before-and-after illustration showing dense paragraphs being restructured into a clean Q&A and list format for AI parsing"
            priority
          />
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
    <Section id="what" eyebrow="01" title="What is content restructuring for AI?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Content restructuring for AI is the work of taking content you
            already have and reorganizing it so AI engines parse and cite
            it. Most clients we work with have 50+ pages of well-written
            content that AI engines simply don&apos;t lift — not because
            the writing is bad, but because the structure is wrong for
            machine consumption.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Restructuring is faster and cheaper than authoring new
            content. The existing pages already rank for something, so we
            preserve their classic SEO value while adding the AI citation
            upside. Same URLs, same brand voice — different structure,
            different parse-ability.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="Content restructuring = preserving what you wrote, fixing how it's organized. Same words, different structure, suddenly citation-worthy."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function PatternsSection() {
  return (
    <Section
      id="patterns"
      eyebrow="02"
      title="The six patterns we apply"
      blurb="Six structural moves that AI engines reward. Most pages benefit from 3–5 of them; a fully restructured page usually has all six."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="patterns"
            alt="Grid illustration of six restructuring patterns — factual lead, Q&A blocks, numbered steps, tables, citations, named entities"
          />
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
    <Section id="process" eyebrow="04" title="How a restructuring sprint runs" blurb="Four stages over 4–6 weeks. Most clients restructure 30–80 priority pages in the first sprint, then iterate quarterly.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage content restructuring process from audit to citation lift validation" className="mb-12 rounded-2xl" />
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
      <img
        src={`${base}-1600.jpg`}
        srcSet={`${base}-800.jpg 800w, ${base}-1600.jpg 1600w`}
        sizes="(max-width: 768px) 100vw, 720px"
        alt={alt}
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
