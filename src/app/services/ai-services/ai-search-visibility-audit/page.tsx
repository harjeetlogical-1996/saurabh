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

const SLUG = "ai-search-visibility-audit";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Search Visibility Audit · ChatGPT, Perplexity & More";
const META_DESCRIPTION =
  "An AI search visibility audit shows exactly where your brand appears (and where it doesn't) across ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot — with a 90-day action plan.";

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
        alt: "Dashboard illustration showing brand-mention metrics across multiple AI search engines",
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
    q: "What is an AI search visibility audit?",
    a: "An AI search visibility audit is a structured probe of every major AI engine — ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, Copilot — to measure how often your brand is named when users ask category-relevant questions. You get a detailed snapshot of your current AI presence, your competitors' presence, and a ranked list of fixes that will move the metrics.",
  },
  {
    q: "How is this different from a regular SEO audit?",
    a: "An SEO audit checks your site against Google's ranking algorithm — keywords, backlinks, page speed, technical health. An AI search audit ignores all that and asks a different question: when an AI engine answers a real user question in your category, does it mention you, your competitor, or nobody you've heard of? Different surface, different signals, different fixes.",
  },
  {
    q: "Why do I need this audit before hiring you for GEO or LLMO?",
    a: "Honestly, you don't always — but it's the cheapest way to know if the work is worth doing. The audit costs a fraction of an ongoing engagement and tells you exactly where the gaps are. Some brands are already cited well across most engines and don't need GEO; others are invisible and need a 90-day rebuild. The audit makes that call data-driven instead of a guess.",
  },
  {
    q: "How long does the audit take?",
    a: "Two weeks end-to-end. Week one is data collection — running 50 to 100 category-level prompts against each of the six target engines, logging every brand mention with frequency, accuracy, and sentiment. Week two is analysis — comparing against three competitors, identifying patterns, and building the prioritized action plan. You get a 30-page report plus a debrief call.",
  },
  {
    q: "What engines do you probe?",
    a: "Six by default: ChatGPT (with browsing), Perplexity, Google AI Overviews / SGE, Google Gemini, Anthropic's Claude, and Microsoft Copilot. We can add others on request — open-source LLMs, You.com, specific vertical engines (Phind for developers, etc). Each engine gets its own section in the report because the gaps and the fixes are usually engine-specific.",
  },
  {
    q: "What does the final report contain?",
    a: "Four sections: (1) Citation-share dashboard — your brand-mention frequency vs three competitors, per engine. (2) Query-by-query map — exactly which prompts cite you, which cite competitors, which cite nobody. (3) Accuracy and sentiment breakdown — when you are mentioned, are the facts right and the tone neutral or positive? (4) 90-day action plan — ranked list of content, schema, and presence fixes with expected impact and effort.",
  },
  {
    q: "Can I run the audit again later to measure improvement?",
    a: "Yes — that's the point. The first audit is your baseline. We re-run a slim version every 90 days to track movement. Most engagements lock in 4 audits a year so you can see what worked, what didn't, and where to redirect effort. Same prompts, same engines, comparable numbers.",
  },
  {
    q: "What inputs do you need from me?",
    a: "Three things: (1) Your three top competitors — we'll use them as the comparison set. (2) The 5–10 category-level questions a buyer would ask AI to research a purchase like yours. (3) Access to your current SEO + analytics stack (Search Console, GA4) so we can correlate AI visibility with actual brand-search and direct-traffic lift. That's it — no tracking pixels, no code changes.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Citation-share dashboard",
    description:
      "Per-engine measurement of how often your brand is mentioned vs three competitors across 50–100 category prompts.",
  },
  {
    name: "Query-by-query map",
    description:
      "Every prompt we tested, who got cited, what was said. The granular data you'd otherwise need a research team to gather.",
  },
  {
    name: "Accuracy & sentiment audit",
    description:
      "When you are mentioned, are the facts correct? Is the tone neutral or positive? We flag every misstatement and dated claim.",
  },
  {
    name: "Competitor benchmarking",
    description:
      "Three competitors compared on the same prompts — which engines they own, which they don't, and where there's room for you to take share.",
  },
  {
    name: "90-day action plan",
    description:
      "Ranked list of content, schema, and brand-presence fixes with expected impact and effort. Built so a single editor can execute it.",
  },
  {
    name: "Debrief call & follow-up",
    description:
      "60-minute walkthrough with your team plus a 30-day check-in to clarify questions and revise priorities as you start executing.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Query selection",
    body: "We work with you to identify 50–100 category-level prompts a real buyer would ask an AI engine while researching a purchase like yours. The list mixes broad category questions (best X for Y), mid-funnel comparisons (X vs Y), and bottom-funnel intent (which X integrates with Y). This becomes the test set every engine is probed against.",
  },
  {
    n: "02",
    title: "Engine probing",
    body: "Each prompt is run against ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot. Multiple sessions, freshly seeded, so we capture variance — not just the one answer the model happened to give that day. Every brand mention is logged with frequency, accuracy, sentiment, and the source the engine cited (when available).",
  },
  {
    n: "03",
    title: "Competitor benchmarking",
    body: "Same prompts, same engines, three competitors. We map the entire category — who owns which engine, who's invisible, who's doing the work that's lifting their citation share. This is where the action plan starts forming, because the gaps in the comparison are the highest-leverage fixes.",
  },
  {
    n: "04",
    title: "Action plan & debrief",
    body: "We synthesize everything into a 30-page report plus a ranked action plan: which pages to restructure for citations, which schema to add, which brand-presence gaps to close. Then a 60-minute call to walk you and your team through it. Optional 30-day check-in to revise priorities once you start executing.",
  },
] as const;

const REPORT_SECTIONS = [
  { name: "Citation-share dashboard", line: "Per-engine brand-mention frequency vs competitors." },
  { name: "Query-by-query map", line: "Exact prompts, exact citations, exact gaps." },
  { name: "Accuracy & sentiment", line: "Where the facts are wrong or the tone is off." },
  { name: "Competitor heatmap", line: "Which engines competitors own; which are open." },
  { name: "Source-citation log", line: "Which sources each engine relies on for your category." },
  { name: "90-day action plan", line: "Prioritized fixes with impact and effort estimates." },
];

const TOC = [
  { id: "what", label: "What is the audit" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "report", label: "What's in the report" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AuditPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Search Visibility Audit",
          description:
            "Two-week structured audit of your brand's visibility across ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot — with citation-share dashboard, competitor benchmarking, and a 90-day action plan.",
          url: URL,
          serviceType: "AI Search Visibility Audit",
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
          { name: "AI Search Visibility Audit", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <WhatYouGet />
        <ProcessSection />
        <ReportSection />
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
            <span className="text-white">AI Search Visibility Audit</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Search Visibility Audit
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Find out exactly where AI engines{" "}
            <span className="text-[var(--accent)]">name your brand. And where they don&apos;t.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            A two-week structured audit across ChatGPT, Perplexity, Google AI
            Overviews, Gemini, Claude, and Copilot. Citation-share dashboard,
            competitor benchmarking, accuracy & sentiment scoring, and a
            90-day action plan ranked by impact and effort.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Book the audit <span>→</span>
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
            alt="Dashboard illustration showing brand-mention metrics across multiple AI search engines"
            priority
          />
        </Reveal>
      </div>
    </header>
  );
}

function Toc() {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-[var(--line)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono pr-3 border-r border-[var(--line)]">
          On this page
        </span>
        {TOC.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="shrink-0 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40"
          >
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function WhatIs() {
  return (
    <Section id="what" eyebrow="01" title="What is an AI search visibility audit?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            An AI search visibility audit is a structured probe of every
            major AI engine — ChatGPT, Perplexity, Google AI Overviews,
            Gemini, Claude, Copilot — to measure how often your brand is
            named when buyers in your category ask the questions that
            actually matter to them.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            You get a detailed snapshot of your current visibility, the
            same snapshot for three competitors, and a ranked action plan
            to close the gaps. Two weeks. One report. A clear before-picture
            you can iterate against.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="When to run it"
            body="Before any GEO / AEO / LLMO engagement — so you know exactly which fixes will move the needle. Or every 90 days as a benchmark, once you've started doing the work."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function WhatYouGet() {
  return (
    <Section
      id="what-you-get"
      eyebrow="02"
      title="What you get"
      blurb="A 30-page report, six structured deliverables, and a debrief call where everything gets explained in plain language."
    >
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
    <Section
      id="process"
      eyebrow="03"
      title="How the audit runs"
      blurb="Four stages. Two weeks. Roughly 50 hours of structured work behind the scenes."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage AI search visibility audit process from query selection to action plan"
          className="mb-12 rounded-2xl"
        />
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

function ReportSection() {
  return (
    <Section
      id="report"
      eyebrow="04"
      title="What's in the final report"
      blurb="A 30-page document organized so a single editor or marketer can execute the action plan without needing translation."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="report"
            alt="Grid illustration of the four report sections — citation share, trend, competitor comparison, and engine heatmap"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REPORT_SECTIONS.map((s) => (
              <li key={s.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{s.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{s.line}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="05"
      title="Frequently asked questions"
      blurb="The questions we actually get on scoping calls — answered honestly, not in marketing voice."
    >
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

function Section({
  id,
  eyebrow,
  title,
  blurb,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  children: React.ReactNode;
}) {
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

function ServiceImage({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
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
