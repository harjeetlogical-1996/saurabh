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

const SLUG = "perplexity-seo";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Perplexity SEO Services · Win Citations on Perplexity";
const META_DESCRIPTION =
  "Perplexity SEO services that optimize for Perplexity's citation-first algorithm — query-aligned content, source-quality engineering, answer-block authoring, and weekly citation-share tracking.";

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
        alt: "Perplexity-style answer card with numbered citations down the right edge",
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
    q: "What is Perplexity SEO?",
    a: "Perplexity SEO is the work of getting your pages cited inside Perplexity's answers. Perplexity is citation-first by design — every answer ships with a list of numbered sources at the top, and the engine routinely cites 5 to 12 sources per response. That makes Perplexity arguably the best AI search surface to optimize for: visibility is high, the surface is honest, and the algorithm rewards content quality more than domain authority.",
  },
  {
    q: "How does Perplexity decide which sources to cite?",
    a: "Three things, in rough order: query alignment (does this page directly answer the prompt?), source quality (is this domain credible for this topic?), and structure (can the engine extract a clean factual block?). Domain Rating matters less here than on Google — Perplexity will cite a small, well-structured site over a giant authority site if the smaller one answers the question more directly. That makes it a fair surface for newer brands.",
  },
  {
    q: "How is Perplexity SEO different from Google SEO?",
    a: "Google ranks pages on a list and rewards backlinks heavily. Perplexity synthesizes one answer from multiple sources and rewards content that's directly extractable — short factual claims, clean structure, named entities, source citations of your own. The lift on Google often comes weeks or months later; Perplexity citations can appear within days of restructuring a page, because the engine recrawls aggressively for fresh / topical content.",
  },
  {
    q: "How long until I see results?",
    a: "Faster than any other AI surface. Pages restructured for Perplexity citation start appearing as sources within 1–3 weeks. Durable category-level wins (being cited on most prompts in your space) take 6–10 weeks of structured publishing. Perplexity recrawls aggressively, so iteration cycles are tight — we typically see meaningful citation-share movement inside the first month.",
  },
  {
    q: "Does Perplexity SEO send actual traffic?",
    a: "Yes — more than most AI surfaces. Perplexity users click through to sources noticeably more often than ChatGPT users do (the citation chips are right there, prominent, and the engine encourages source verification). Expect 5–15% of citation impressions to convert to actual referral clicks — small numbers in absolute terms early on, but unusually high-intent traffic.",
  },
  {
    q: "What's the actual process you run?",
    a: "Four stages. (1) Query selection — find the questions your audience asks Perplexity in your category. (2) Source-quality engineering — make sure your domain reads as credible for those queries (E-E-A-T signals, author bios, schema). (3) Answer-block authoring — restructure or create pages with the exact format Perplexity lifts cleanly: short factual lead, expanded explanation, supporting list, source citations of our own. (4) Citation-share tracking — weekly probes against Perplexity to log who's being cited and how often.",
  },
  {
    q: "Will this work for a small or new brand?",
    a: "Better than most channels. Perplexity is among the fairest AI surfaces for smaller brands because it doesn't weight domain authority as heavily as Google. If your content is genuinely well-structured and your topic is real, you can earn citations against much larger competitors faster here than anywhere else. We've seen Domain-Rating-30 sites outrank DR-80 sites on Perplexity inside two months.",
  },
  {
    q: "Can I do this without your help?",
    a: "Absolutely — the core moves (clear answer blocks, FAQ schema, named entities, source citations of your own) are publicly documented and not proprietary. What we add is execution speed, prompt mining at scale, the citation-share dashboard, and the iteration discipline to actually move metrics rather than publish-and-hope. Many clients hire us for the first 90 days and then run it in-house once the templates are clear.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Perplexity prompt mining",
    description:
      "We sample 50–150 prompts users in your category actually run on Perplexity — and log the current citation set per prompt.",
  },
  {
    name: "Source-quality engineering",
    description:
      "E-E-A-T signals, author bios, Organization and Person schema — the credibility markers Perplexity weights when picking sources.",
  },
  {
    name: "Answer-block authoring",
    description:
      "Page restructures and new long-form pieces written in the format Perplexity lifts cleanly: short factual lead, expanded explanation, supporting list, citations.",
  },
  {
    name: "Citation-share tracking",
    description:
      "Weekly automated runs against Perplexity. You see citation share, accuracy, sentiment, and movement vs your three competitors.",
  },
  {
    name: "Internal-link mapping",
    description:
      "Perplexity weights related-topic coverage. We map an internal-link graph across your relevant pages so the engine sees a coherent topic cluster.",
  },
  {
    name: "Editorial templates",
    description:
      "Question-led briefs, answer-block templates, and a written guide so your in-house team can keep producing Perplexity-grade content.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Query selection",
    body: "We sample 50–150 prompts users in your category actually run on Perplexity, pulled from search-suggest data, support tickets, sales calls, and direct sampling. Each prompt is logged with the current citation set — who's being cited today and from which domains. Output: a ranked list of prompts worth competing for.",
  },
  {
    n: "02",
    title: "Source-quality engineering",
    body: "Perplexity weights credibility heavily but in domain-agnostic ways. We add Organization, Person, and Article schema; write author bios with real expertise signals; ensure About / Trust pages are crawlable and clean. The work overlaps with E-E-A-T for Google but is more about machine-parseable credibility than offline authority.",
  },
  {
    n: "03",
    title: "Answer-block authoring",
    body: "For each priority prompt, we restructure or create a page in the format Perplexity lifts cleanly: a 40–60 word factual lead, an expanded explanation, a supporting list or comparison, and source citations of our own. Tone stays in your editorial voice — only the structure shifts.",
  },
  {
    n: "04",
    title: "Citation-share tracking",
    body: "Weekly automated probes against Perplexity for every priority prompt. We log citation share, sentiment, accuracy, and how it moves vs three competitors. The dashboard updates weekly; we revisit priorities monthly. Iteration tight — Perplexity rewards fast follow-ups.",
  },
] as const;

const FACTORS = [
  { name: "Query alignment", line: "Does the page directly answer the exact prompt? Highest-leverage factor." },
  { name: "Source freshness", line: "Perplexity prefers recently updated content for time-sensitive queries." },
  { name: "Authority signals", line: "Author bios, schema, About / Trust pages — domain-agnostic credibility." },
  { name: "Outbound citations", line: "Perplexity trusts pages that themselves cite credible sources." },
  { name: "Parseable structure", line: "Clean H2/H3 hierarchy, FAQ blocks, factual lead — easier to lift." },
  { name: "Topic cluster depth", line: "Coverage across related queries reinforces topical authority." },
];

const TOC = [
  { id: "what", label: "What is Perplexity SEO" },
  { id: "factors", label: "Ranking factors" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function PerplexitySeoPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Perplexity SEO",
          description:
            "Optimize for Perplexity's citation-first algorithm. Query-aligned content, source-quality engineering, answer-block authoring, and weekly citation-share tracking.",
          url: URL,
          serviceType: "Perplexity SEO",
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
          { name: "Perplexity SEO", url: URL },
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
            <span className="text-white">Perplexity SEO</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Perplexity SEO
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Be source [1] on Perplexity.{" "}
            <span className="text-[var(--accent)]">The fairest AI surface for smaller brands.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Perplexity ships citations on every answer and weights content
            quality over domain authority. We engineer the source-quality
            signals, query-aligned answers, and topic cluster depth that
            puts your brand in the citation list — usually within weeks.
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
            alt="Perplexity-style answer card with numbered citations down the right edge"
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
    <Section id="what" eyebrow="01" title="What is Perplexity SEO?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Perplexity SEO is the work of getting your pages cited inside
            Perplexity&apos;s synthesized answers. Unlike most AI engines,
            Perplexity is citation-first by design — every response ships
            with a list of numbered sources, and a typical answer cites 5 to
            12 of them.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The result is the fairest AI search surface today for smaller
            and newer brands. Perplexity weights content quality more than
            domain authority, so a well-structured DR-30 site can earn
            citations against DR-80 incumbents. We&apos;ve seen it inside
            two months on real engagements.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="Perplexity SEO = engineering the page-level signals (clear answers, schema, source citations) that make you one of the numbered sources in Perplexity's answer."
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
      title="What Perplexity actually rewards"
      blurb="Six factors, in rough order of leverage. Perplexity weights query alignment more than any single factor — including domain authority."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="factors"
            alt="Grid illustration of the six factors that drive Perplexity citations"
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
      title="How we run a Perplexity SEO engagement"
      blurb="Four stages run as a 12-week sprint. Iteration cycles are tight because Perplexity recrawls aggressively."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage Perplexity SEO process from query selection to citation-share tracking"
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
