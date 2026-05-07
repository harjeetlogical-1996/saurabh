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

const SLUG = "google-ai-overviews-optimization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Google AI Overviews & SGE Optimization Services";
const META_DESCRIPTION =
  "Get included in Google's AI Overviews (formerly SGE). E-E-A-T engineering, AI-readable schema, query-aligned content, and weekly inclusion tracking — built for the new Google answer surface.";

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
        alt: "Google AI Overview synthesized answer card with linked source thumbnails",
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
    q: "What are Google AI Overviews?",
    a: "Google AI Overviews — earlier called SGE (Search Generative Experience) — are the AI-generated summary cards that now appear at the top of many Google search results. They synthesize an answer from 3 to 8 cited sources, push organic links further down, and increasingly own the user's first impression. AI Overviews appear on a growing share of informational queries and most 'how to', 'what is', and comparison searches.",
  },
  {
    q: "How is this different from featured snippets?",
    a: "Featured snippets pull from one source. AI Overviews synthesize from many. Snippets are extractive (lifted directly from a page); Overviews are generative (Google's model rewrites the answer in its own voice and cites sources beneath). The optimization moves overlap — both reward clear answers and FAQ schema — but Overviews are noticeably more conservative: they prefer established domains and well-attributed sources over newer entrants.",
  },
  {
    q: "Do AI Overviews actually steal traffic?",
    a: "It depends on the query. For 'how do I' and definitional queries, click-through rates drop sharply when an Overview appears. For comparison and buying-stage queries, CTR holds up — users still need to validate the answer before purchasing. Most clients see a 15–35% drop in informational-query CTR but stable or improved CTR on commercial-intent queries. The fix is to be IN the Overview when it shows, not just under it.",
  },
  {
    q: "How do I get included in an AI Overview?",
    a: "Five things matter. (1) Strong E-E-A-T signals — author bios, expertise markers, Organization schema. (2) Established domain authority — Overviews lean conservative on source selection. (3) Direct query-aligned answers — the page should answer the exact question, not a related one. (4) AI-readable schema — Article, FAQ, HowTo, Person, Organization. (5) Coverage of the surrounding topic cluster — Overviews favor sites that demonstrate depth, not just one good page.",
  },
  {
    q: "How long does it take to see results?",
    a: "Typically 4–8 weeks for first inclusion on priority queries, 8–14 weeks for durable category coverage. AI Overviews lean conservative so the timeline is slower than Perplexity but faster than LLMO (which depends on training cycles). Most engagements track inclusion-share weekly and see meaningful movement inside the second month.",
  },
  {
    q: "Can newer / smaller brands get included?",
    a: "Yes, but it's harder than on Perplexity. Google's AI Overviews lean toward established domains because they inherit the trust signals from classic Google ranking. The fastest path for a smaller brand is: (1) cover one narrow topic deeply with 8–15 well-structured pages, (2) build legitimate authorial expertise around it, (3) target the 'long tail' Overviews where competition is thinner. Inclusion in those then signals authority for the head terms over time.",
  },
  {
    q: "What's the actual process you run?",
    a: "Four stages. (1) Query mining — find the queries in your category where an AI Overview shows AND the inclusion is winnable. (2) E-E-A-T engineering — author bios, schema, About / Trust pages, expertise signals — the credibility moves Google weights heavily on this surface. (3) Query-aligned content — restructure or create pages that answer the exact target question, with the surrounding topic cluster filled out. (4) Inclusion tracking — weekly automated checks against the Google search results page to log Overview inclusion across priority queries.",
  },
  {
    q: "Will AI Overview optimization help my regular Google rankings?",
    a: "Almost always yes. The signals Google uses to pick AI Overview sources — E-E-A-T, schema, author expertise, semantic depth — are the same signals that increasingly drive top-10 rankings. Pages restructured for Overview inclusion typically gain organic positions inside 60–90 days, even on queries where no Overview shows.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Overview-eligible query mining",
    description:
      "Find queries in your category where an AI Overview shows AND your inclusion is realistic — winnable opportunities, not aspirational ones.",
  },
  {
    name: "E-E-A-T engineering",
    description:
      "Author bios with real expertise signals, Organization and Person schema, About / Trust pages, named-author attribution — the credibility stack Google's AI Overviews weight heavily.",
  },
  {
    name: "AI-readable schema",
    description:
      "Article, FAQ, HowTo, Person, Organization schema — tuned for parsing by Google's generative layer, not just classic search.",
  },
  {
    name: "Query-aligned content",
    description:
      "Pages or page-sections rewritten to directly answer the target query, with the surrounding topic cluster filled out so Google sees coherent depth.",
  },
  {
    name: "Inclusion tracking",
    description:
      "Weekly automated checks against the Google search results page logging Overview inclusion across 50–150 priority queries — yours and three competitors.",
  },
  {
    name: "Editorial templates",
    description:
      "Briefs, answer-block templates, and a written guide so your in-house team can keep producing Overview-eligible content after the engagement.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Overview-eligible query mining",
    body: "We sample 50–150 queries in your category, run them, and flag the ones where (a) an AI Overview appears and (b) the source set looks winnable for a domain like yours. Output: a ranked list separating likely wins, stretch wins, and queries where the Overview belongs to entrenched giants and isn't worth fighting for.",
  },
  {
    n: "02",
    title: "E-E-A-T engineering",
    body: "We add Organization and Person schema, write proper author bios with real expertise signals, fix About and Trust pages, and ensure named authorship is consistent across the site. Google's Overviews lean conservative — credibility signals matter more here than on any other AI surface we work on.",
  },
  {
    n: "03",
    title: "Query-aligned content",
    body: "For each priority query, we restructure or create a page that answers the exact question, with the surrounding topic cluster filled out (5–10 supporting pages). Coverage breadth signals topic authority, which Google weights when choosing Overview sources. Tone stays in your editorial voice.",
  },
  {
    n: "04",
    title: "Inclusion tracking",
    body: "Weekly automated checks against the Google search results page. We log Overview inclusion per query, who's being cited, and movement vs three competitors. The dashboard updates weekly. We iterate monthly — doubling down on what's gaining inclusion, replacing what isn't.",
  },
] as const;

const FACTORS = [
  { name: "E-E-A-T signals", line: "Author bios, expertise markers, Organization schema — heaviest factor here." },
  { name: "Source freshness", line: "Overviews refresh frequently; recent content gets selected more often." },
  { name: "Established authority", line: "Conservative source selection — domain trust matters more than on Perplexity." },
  { name: "AI-readable schema", line: "Article, FAQ, HowTo, Person — Google's generative layer parses these aggressively." },
  { name: "Query-aligned content", line: "Pages must answer the exact query, not a related one." },
  { name: "Topic cluster depth", line: "5–10 supporting pages on a topic signals coherent expertise." },
];

const TOC = [
  { id: "what", label: "What are AI Overviews" },
  { id: "factors", label: "Inclusion factors" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function GoogleAiOverviewsPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Google AI Overviews / SGE Optimization",
          description:
            "Get included in Google's AI Overviews. E-E-A-T engineering, AI-readable schema, query-aligned content, and weekly inclusion tracking.",
          url: URL,
          serviceType: "Google AI Overviews Optimization",
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
          { name: "Google AI Overviews Optimization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <FactorsSection />
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
            <span className="text-white">Google AI Overviews</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Google AI Overviews Optimization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Be cited inside Google&apos;s answer.{" "}
            <span className="text-[var(--accent)]">Not just below it.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            AI Overviews now sit at the top of more than half of Google&apos;s
            informational results. We engineer the E-E-A-T, schema, and
            query-aligned content that gets your domain picked as one of
            the cited sources.
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
            alt="Google AI Overview synthesized answer card with linked source thumbnails"
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
    <Section id="what" eyebrow="01" title="What are Google AI Overviews?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Google AI Overviews — formerly SGE — are the AI-generated
            summary cards that now sit at the top of a growing share of
            Google&apos;s search results pages. Each Overview synthesizes an
            answer from 3 to 8 cited sources and pushes the regular organic
            results further down the page.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            For most informational queries, the Overview is now the user&apos;s
            first interaction with the search results — and increasingly the
            only one. Being inside that Overview is no longer optional for
            brands that depend on Google traffic. Being just below it
            isn&apos;t the same outcome anymore.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="AI Overviews = Google's generative answer cards. They cite 3–8 sources and now appear on the majority of informational queries."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function FactorsSection() {
  return (
    <Section
      id="factors"
      eyebrow="02"
      title="What Google AI Overviews actually reward"
      blurb="Six factors, in rough order of leverage. AI Overviews lean conservative — credibility signals matter more here than on any other AI search surface."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="factors"
            alt="Grid illustration of the six factors that drive inclusion in Google AI Overviews"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FACTORS.map((f) => (
              <li key={f.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{f.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{f.line}</div>
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
    <Section
      id="what-you-get"
      eyebrow="03"
      title="What you get with us"
      blurb="The deliverables — written down, so the scope is the scope."
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
      eyebrow="04"
      title="How we run an AI Overviews engagement"
      blurb="Four stages, run as a 12-week sprint or an ongoing retainer depending on your starting point."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage Google AI Overviews optimization process"
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
