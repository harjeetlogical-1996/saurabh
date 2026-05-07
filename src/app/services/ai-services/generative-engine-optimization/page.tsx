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

const SLUG = "generative-engine-optimization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

// Layout's template appends " · Saurabh Bhayana", so keep this suffix-free.
const META_TITLE = "Generative Engine Optimization (GEO) Services";
const META_DESCRIPTION =
  "GEO services that get your brand cited inside ChatGPT, Perplexity, Gemini, Google AI Overviews, and Claude — content restructuring, AI-readable schema, and citation tracking in one engagement.";

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
        alt: "Brand being cited inside AI answer cards across ChatGPT, Perplexity, Gemini, and Google AI Overviews",
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
    q: "What is Generative Engine Optimization (GEO)?",
    a: "GEO is the practice of structuring your content so that generative AI engines — ChatGPT, Perplexity, Google's AI Overviews, Gemini, Claude, Copilot — pick your brand as a source when they answer relevant user questions. Think of it as SEO for the answer layer of search instead of the link layer. Where SEO got you a blue link on a results page, GEO gets you cited by name inside the AI's actual answer.",
  },
  {
    q: "How is GEO different from regular SEO?",
    a: "Regular SEO optimizes for ranking on a results page — the user clicks through to your site to read the answer. GEO optimizes for the answer itself — the AI reads your page, summarizes it, and cites you as a source without the user ever visiting. Both matter, but they reward different things: SEO rewards backlinks and on-page keywords, GEO rewards citation-friendly structure, named entities, and clear factual claims that an LLM can lift in one sentence.",
  },
  {
    q: "Which AI engines does GEO target?",
    a: "We optimize across the six engines that drive most AI-influenced search today: ChatGPT (with browsing), Perplexity, Google's AI Overviews / SGE, Google Gemini, Anthropic's Claude, and Microsoft Copilot. Each has slightly different citation behavior — Perplexity is the most citation-heavy, Google AI Overviews is the most conservative — and the same content needs to be tuned to land across all of them.",
  },
  {
    q: "How long does GEO take to show results?",
    a: "Faster than traditional SEO. AI engines reindex more frequently and ingest content more aggressively, so a well-structured page can start appearing as a citation in 2 to 4 weeks. Lasting visibility — being the default citation for a category of question — usually takes 8 to 12 weeks of structured publishing plus monitoring.",
  },
  {
    q: "What does the GEO process actually involve?",
    a: "Five steps: (1) AI search audit — track where your brand currently shows up across engines and where competitors do. (2) Query mining — find the questions your audience is asking AI assistants. (3) Content restructuring — rewrite or expand pages so they answer those questions in formats AI engines lift cleanly. (4) Schema and entity work — add structured data that helps AI understand authorship, expertise, and relationships. (5) Citation tracking — monitor weekly which engines now cite you, and iterate.",
  },
  {
    q: "Can you measure GEO results?",
    a: "Yes — we track three things weekly: how often your brand appears as a cited source across each engine, what queries you're being cited for, and what share of category-level questions you own. The data comes from a mix of automated query runs against each engine plus brand-mention scrapers. You get a dashboard with the trend lines, not vanity screenshots.",
  },
  {
    q: "Will GEO hurt my traditional SEO rankings?",
    a: "No. Everything we do for GEO — clearer headings, named entities, factual answer blocks, schema markup — also helps traditional SEO. The two strategies stack. The only tension is editorial: GEO rewards being explicitly citation-worthy, which sometimes means rewriting a paragraph that was technically ranking but reading as fluff. We flag those tradeoffs before changing.",
  },
  {
    q: "Do I need a lot of existing content for GEO to work?",
    a: "Not necessarily, but it helps. If you have an existing site with even 10–20 well-targeted articles, we restructure those first — usually the highest-impact move. If you're starting from zero, we help plan a 12-week publishing sprint focused on the questions AI assistants are already getting in your space, written for citation from day one.",
  },
] as const;

const OFFERINGS = [
  {
    name: "AI search visibility audit",
    description:
      "We track where your brand appears across ChatGPT, Perplexity, Gemini, Claude, AI Overviews, and Copilot — and where competitors are taking your share of citations.",
  },
  {
    name: "Query mining for AI",
    description:
      "Find the high-intent questions your audience asks AI assistants. We extract these from search data, customer support logs, and sampled engine queries.",
  },
  {
    name: "Citation-friendly content restructuring",
    description:
      "Rewrite existing pages so AI engines lift them cleanly — clear answer blocks, named entities, fact-first paragraphs, source-worthy structure.",
  },
  {
    name: "AI-readable schema markup",
    description:
      "Article, FAQ, HowTo, Organization, Person, and product schema tuned for AI parsing — including author / E-E-A-T signals AI weighs heavily.",
  },
  {
    name: "Citation tracking dashboard",
    description:
      "Weekly automated runs against each engine showing which queries cite you, which cite competitors, and the trend across both.",
  },
  {
    name: "Editorial workflow for GEO",
    description:
      "A handover doc and templates so your in-house team can keep publishing GEO-grade content after the engagement ends.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "AI search audit",
    body: "We run a baseline check across all six target engines. For 30–50 of your category's most-asked questions, we record who's being cited — you, your competitors, or random publishers. The output is a one-page heatmap showing where you're invisible and where you already have a foothold worth defending.",
  },
  {
    n: "02",
    title: "Query mining",
    body: "We pull the actual prompts your audience runs at AI assistants. Sources include search-suggest data, support tickets, sales-call transcripts, and direct sampling against each engine. This becomes a ranked list of 'questions worth being the answer to' — the foundation for everything that comes next.",
  },
  {
    n: "03",
    title: "Content restructuring",
    body: "Existing pages get rewritten — or new ones authored — so an AI engine can lift them cleanly. That means short factual lead paragraphs, named entities, FAQ-style sub-sections, source citations of our own. We work alongside your editors so brand voice stays intact while structure shifts.",
  },
  {
    n: "04",
    title: "Schema & entity work",
    body: "We add Article, FAQ, HowTo, and Organization schema tuned for AI parsing. Author bios, expertise signals, and entity relationships are made explicit. This is where E-E-A-T moves from a marketing slide to actual structured data on your pages — the kind LLMs weight when picking who to cite.",
  },
  {
    n: "05",
    title: "Citation tracking & iteration",
    body: "Weekly automated runs against each engine. You see in a dashboard which queries cite you this week vs last, which competitors stole share, and which content is doing the heavy lifting. We iterate monthly — doubling down on what's working and rewriting what isn't.",
  },
] as const;

const ENGINES = [
  {
    name: "ChatGPT",
    line: "Heaviest citation footprint. With browsing on, cites top organic-style sources.",
  },
  {
    name: "Perplexity",
    line: "Citation-first by design. Source quality matters more than authority.",
  },
  {
    name: "Google AI Overviews",
    line: "Conservative — mostly cites established domains. E-E-A-T-heavy.",
  },
  {
    name: "Gemini",
    line: "Increasingly cites sources, especially on factual / news-adjacent queries.",
  },
  {
    name: "Claude",
    line: "Cites less often but rewards clear factual structure when it does.",
  },
  {
    name: "Microsoft Copilot",
    line: "Bing-derived sources. Strong B2B and enterprise category coverage.",
  },
];

const TOC = [
  { id: "what", label: "What is GEO" },
  { id: "geo-vs-seo", label: "GEO vs SEO" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "engines", label: "Engines we cover" },
  { id: "faq", label: "FAQs" },
] as const;

export default function GeoPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Generative Engine Optimization (GEO)",
          description:
            "Get your brand cited inside ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, and Copilot. AI search audit, query mining, content restructuring, schema, and citation tracking.",
          url: URL,
          serviceType: "Generative Engine Optimization",
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
          { name: "Generative Engine Optimization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <GeoVsSeo />
        <WhatYouGet />
        <ProcessSection />
        <EnginesSection />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Sections ---------- */

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
            <Link href="/services" className="hover:text-[var(--accent)] transition-colors">
              Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <Link href="/services/ai-services" className="hover:text-[var(--accent)] transition-colors">
              AI Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">GEO</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Generative Engine Optimization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Get cited inside the answer.{" "}
            <span className="text-[var(--accent)]">Not just ranked next to it.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            We get your brand named inside ChatGPT, Perplexity, Gemini, Google AI
            Overviews, Claude, and Copilot. AI search audit, query mining,
            citation-friendly content restructuring, AI-readable schema, and
            weekly citation tracking — built around the questions your audience
            actually asks.
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
            alt="Illustration of a brand being cited inside AI answer cards across ChatGPT, Perplexity, Gemini, and Google AI Overviews"
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
    <Section id="what" eyebrow="01" title="What is Generative Engine Optimization?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Generative Engine Optimization is the work of structuring your
            content so that AI engines — ChatGPT, Perplexity, Google AI
            Overviews, Gemini, Claude, Copilot — pick your brand as a source
            when they answer your audience&apos;s questions.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Where SEO won you a blue link on a results page, GEO wins you a
            named citation inside the AI&apos;s answer itself. Same goal —
            being the source — different mechanic. AI engines don&apos;t
            reward backlinks the same way; they reward content they can lift
            cleanly, with clear claims, named entities, and source-worthy
            structure. We make your pages exactly that.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="GEO = SEO for the answer layer. SEO got you ranked on a results page. GEO gets you cited inside the AI's actual answer — the new front page of search."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function GeoVsSeo() {
  const rows = [
    {
      attr: "Optimization target",
      seo: "Ranking position on a results page.",
      geo: "Being cited as a source inside an AI answer.",
    },
    {
      attr: "User journey",
      seo: "User clicks through to your site to read the answer.",
      geo: "User reads the answer in the AI; sees your brand cited.",
    },
    {
      attr: "Primary signals",
      seo: "Backlinks, on-page keywords, page authority.",
      geo: "Citation-friendly structure, named entities, factual clarity.",
    },
    {
      attr: "Schema priority",
      seo: "Helpful but not always required.",
      geo: "Critical — AI engines parse schema for authorship and expertise.",
    },
    {
      attr: "Time to first results",
      seo: "3–6 months for new domains.",
      geo: "2–4 weeks for first citations on well-structured pages.",
    },
    {
      attr: "Measurement",
      seo: "Rankings, organic traffic, click-through rate.",
      geo: "Citation share per query, brand-mention frequency, engine coverage.",
    },
  ];

  return (
    <Section id="geo-vs-seo" eyebrow="02" title="GEO vs SEO — what changes">
      <Reveal>
        <p className="max-w-[760px] text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
          GEO doesn&apos;t replace SEO; it adds a new optimization surface on
          top of it. Here&apos;s the honest split — useful when you&apos;re
          deciding what to invest in this quarter.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="grid grid-cols-12 bg-[var(--surface)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">Attribute</div>
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">SEO</div>
            <div className="col-span-4 px-5 py-3 text-[var(--accent)]">GEO</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.attr}
              className={`grid grid-cols-12 text-[14px] leading-[1.55] ${
                i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]/40"
              }`}
            >
              <div className="col-span-4 px-5 py-4 border-r border-[var(--line)] text-white">{r.attr}</div>
              <div className="col-span-4 px-5 py-4 border-r border-[var(--line)] text-[var(--muted)]">{r.seo}</div>
              <div className="col-span-4 px-5 py-4 text-white/90">{r.geo}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[var(--muted)] max-w-[760px] leading-[1.7]">
          We almost always run them together. The two stacks compound — GEO-grade pages also rank better in classic SERPs.
        </p>
      </Reveal>
    </Section>
  );
}

function WhatYouGet() {
  return (
    <Section
      id="what-you-get"
      eyebrow="03"
      title="What you get with us"
      blurb="The deliverables — written down, so the scope is the scope."
    >
      <Reveal>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFERINGS.map((o, i) => (
            <li
              key={o.name}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/60 transition-colors"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                <span className="h-px w-6 bg-[var(--accent)]" />
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.02em] text-white">
                {o.name}
              </h3>
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
      eyebrow="04"
      title="How we run a GEO engagement"
      blurb="The same five steps every time, run as a 12-week sprint or an ongoing retainer depending on your starting point."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the five-stage GEO process from AI search audit to citation tracking"
          className="mb-12 rounded-2xl"
        />
      </Reveal>
      <ol className="space-y-6">
        {PROCESS.map((step) => (
          <Reveal key={step.n}>
            <li className="grid grid-cols-12 gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
              <div className="col-span-12 md:col-span-3">
                <div className="font-display text-[44px] leading-none text-[var(--accent)] tracking-tight">{step.n}</div>
                <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
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

function EnginesSection() {
  return (
    <Section
      id="engines"
      eyebrow="05"
      title="Engines we optimize for"
      blurb="Six engines drive the bulk of AI-influenced search today. We optimize for citation across all of them — each rewards slightly different signals."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="engines"
            alt="Grid illustration showing the major generative engines GEO targets — ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews, and Copilot"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ENGINES.map((e) => (
              <li
                key={e.name}
                className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors"
              >
                <div className="text-[14px] font-medium text-white">{e.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{e.line}</div>
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
      eyebrow="06"
      title="Frequently asked questions"
      blurb="The questions we actually get on scoping calls — answered honestly, not in marketing voice."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {FAQS.map((f) => (
          <Reveal key={f.q}>
            <details className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] open:border-[var(--accent)]/60 transition-colors">
              <summary className="cursor-pointer list-none p-5 md:p-6 flex items-start justify-between gap-4">
                <span className="font-display text-[16px] md:text-[17px] leading-[1.35] text-white">{f.q}</span>
                <span aria-hidden className="mt-1 shrink-0 text-[var(--accent)] transition-transform group-open:rotate-45 text-[20px] leading-none">
                  +
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] leading-[1.75] text-[var(--muted)]">{f.a}</div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Building blocks ---------- */

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

/* ---------- Image component ---------- */

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
    <picture
      className={`block aspect-[16/9] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] ${className}`}
    >
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
