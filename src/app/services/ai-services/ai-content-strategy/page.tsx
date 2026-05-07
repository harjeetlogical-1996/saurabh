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

const SLUG = "ai-content-strategy";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Content Strategy Services · Plan Content That Compounds";
const META_DESCRIPTION =
  "AI content strategy that plans what to publish, when, and why — audience research, opportunity sizing, content pillars, editorial calendar, and a measurement framework that ties content to revenue.";

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
        alt: "Strategic content roadmap illustration with timeline, pillars, and growth chart",
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
    q: "What is AI content strategy?",
    a: "AI content strategy is the planning layer that decides what to publish, in what order, and why — using AI tools to do the heavy research lifting and a human strategist to make the calls on positioning, voice, and trade-offs. The output is a calendar your team can execute, a measurement framework that ties content to revenue, and a written strategy doc that survives team turnover.",
  },
  {
    q: "How is this different from a regular SEO content plan?",
    a: "A regular SEO content plan is mostly a keyword list. A content strategy is a written argument for why a specific set of topics, in a specific order, will move a specific business metric — and how AI assistance fits across the whole stack (GEO, AEO, LLMO, classic SEO). The keyword list is the smallest output; the bigger output is the rationale and the trade-offs you've consciously chosen.",
  },
  {
    q: "How long does the strategy take to deliver?",
    a: "Three to four weeks for a focused engagement. Week 1 is audience and competitive research. Week 2 is opportunity sizing and pillar definition. Week 3 is the editorial calendar (typically 6 months out, quarter-by-quarter detail). Week 4 is the measurement framework and a debrief workshop with your team.",
  },
  {
    q: "How does AI fit into the strategy itself?",
    a: "Two layers. (1) AI is used in the strategy work — large-scale topic clustering, audience question mining, competitor content audits at scale, gap analysis. Faster and more comprehensive than humans alone. (2) The strategy explicitly plans AI's role in your execution — which content types use AI drafting, which need pure-human, which need GEO / AEO / LLMO investment. Both layers, written down.",
  },
  {
    q: "What deliverables do I receive?",
    a: "Six things. (1) A 30–40 page strategy document. (2) An audience and competitive research report. (3) Three to five content pillars with positioning rationale. (4) A 6-month editorial calendar with topic, intent, format, and AI-assist level per piece. (5) A measurement framework mapping content metrics to business metrics. (6) A 90-minute strategy debrief workshop for your team.",
  },
  {
    q: "Will this work alongside my existing in-house writers?",
    a: "Designed for that. The calendar and pillars are inputs your team executes against; we don't have to be the ones writing every piece. Most engagements end with us doing a smaller subset of pieces (the ones where AI assistance compounds best) and your in-house team owning the rest. The strategy doc is the connective tissue.",
  },
  {
    q: "Can you help us measure if the strategy is actually working?",
    a: "Yes — and we structure the measurement framework before any content ships, not after. We map content output to leading indicators (organic traffic, citation share, email signups, demos requested) and to lagging indicators (pipeline, revenue, retention). The framework includes a quarterly review cadence so course-corrections happen before the calendar drifts.",
  },
  {
    q: "How is this priced?",
    a: "Fixed fee for the strategy engagement (3–4 weeks). After delivery, optional ongoing retainer if you want us to keep iterating the calendar or executing specific pieces. Most clients use the strategy to brief their in-house team or another vendor — we don't lock you into ongoing work.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Audience research",
    description:
      "AI-assisted mining of search data, support tickets, sales calls, and category forums to map what your audience actually asks — and where the demand is concentrated.",
  },
  {
    name: "Competitive content audit",
    description:
      "Three competitors mapped at scale: which topics they own, which they don't, where their content is thin, where AI engines cite them but your content is missing.",
  },
  {
    name: "Content pillar definition",
    description:
      "3–5 pillars that anchor your editorial output — each with a positioning rationale, a topic cluster map, and a 'why this not that' explanation.",
  },
  {
    name: "Editorial calendar",
    description:
      "6 months of content planned: topic, intent, format (blog / guide / comparison / case study), AI-assist level, owner, schema requirements.",
  },
  {
    name: "Measurement framework",
    description:
      "Which content metrics map to which business outcomes, with quarterly review cadence and clear go / kill thresholds for under-performing pieces.",
  },
  {
    name: "Strategy debrief workshop",
    description:
      "90-minute workshop with your team to walk through the strategy, calibrate trade-offs, and lock in the first quarter's execution plan.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Audience research",
    body: "We start by understanding who the content is actually for — pulling search-suggest data, support tickets, sales-call transcripts, category forums, and AI engine prompt logs. The output is a one-page audience persona grounded in evidence, not assumptions.",
  },
  {
    n: "02",
    title: "Opportunity sizing",
    body: "We map demand against current supply — which questions have high search volume but thin existing answers, which topics have AI-engine citation gaps, which formats your competitors are missing. Each opportunity gets a t-shirt size estimate so you can tell the small bets from the big bets.",
  },
  {
    n: "03",
    title: "Content pillar definition",
    body: "We pick 3–5 pillars that anchor the strategy — each with a clear positioning, a topic cluster underneath, and an explicit reason why we're betting on it over alternatives. Pillars are what survive when the calendar gets disrupted, so we get this layer right before the calendar.",
  },
  {
    n: "04",
    title: "Editorial calendar",
    body: "Six months of content planned, quarter-by-quarter detail. For each piece: topic, search intent, format, AI-assist level, schema requirements, owner, expected impact. The calendar is the document your team executes against day-to-day.",
  },
  {
    n: "05",
    title: "Measurement framework",
    body: "Before any content ships, we lock in what success looks like: which content metrics map to which business outcomes, what cadence to review, what triggers a course-correction. Most strategies fail because measurement is bolted on later — ours starts with it.",
  },
] as const;

const PILLARS = [
  { name: "Educational", line: "How-to, definitional, beginner guides — top of funnel." },
  { name: "Thought leadership", line: "Opinion, analysis, original research — brand authority." },
  { name: "Comparison", line: "X vs Y, alternatives, listicle — bottom of funnel." },
  { name: "Research / data", line: "Original studies, surveys, benchmarks — link bait + GEO citations." },
  { name: "Case study", line: "Customer outcomes, before-after — sales enablement + SEO." },
  { name: "FAQ / answer", line: "Q&A blocks for AEO and AI Overviews — direct answer surface." },
];

const TOC = [
  { id: "what", label: "What is AI content strategy" },
  { id: "pillars", label: "Pillar archetypes" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiContentStrategyPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Content Strategy",
          description:
            "Audience research, opportunity sizing, content pillars, editorial calendar, and a measurement framework that ties content to revenue.",
          url: URL,
          serviceType: "AI Content Strategy",
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
          { name: "AI Content Strategy", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <PillarsSection />
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
            <span className="text-white">AI Content Strategy</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Content Strategy
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            A content plan that compounds.{" "}
            <span className="text-[var(--accent)]">Not a list of keywords.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Audience research, opportunity sizing, content pillars, a
            6-month editorial calendar, and a measurement framework that
            ties content to revenue. AI does the research at scale; a
            human strategist makes the calls.
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
          <ServiceImage name="hero" alt="Strategic content roadmap illustration with timeline, pillars, and growth chart" priority />
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
    <Section id="what" eyebrow="01" title="What is AI content strategy?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI content strategy is the planning layer underneath everything
            you publish. It decides what to write, in what order, why, and
            how AI fits in across the whole stack — classic SEO, GEO, AEO,
            LLMO. AI does the research at scale; a human strategist makes
            the calls.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The output isn&apos;t a keyword list — it&apos;s a written
            argument for why a specific set of topics, in a specific
            order, will move a specific business metric. Plus the calendar
            your team executes against and the measurement framework
            that tells you whether it&apos;s working.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI content strategy = the document that survives team turnover. Pillars, calendar, and measurement framework — written down, not stored in someone's head." />
        </Reveal>
      </div>
    </Section>
  );
}

function PillarsSection() {
  return (
    <Section id="pillars" eyebrow="02" title="Six pillar archetypes we plan around" blurb="Most strategies pick 3–5 of these as their content backbone. Each archetype maps to a specific search intent, AI surface, and business outcome.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="pillars" alt="Grid illustration of six content pillar archetypes — educational, thought leadership, comparison, research, case study, FAQ" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PILLARS.map((p) => (
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
    <Section id="process" eyebrow="04" title="How we build the strategy" blurb="Five stages over 3–4 weeks. Output: a 30–40 page strategy doc your team can run on for the next two quarters.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the five-stage AI content strategy process from audience research to measurement" className="mb-12 rounded-2xl" />
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
