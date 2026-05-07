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

const SLUG = "schema-markup-for-ai";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Schema Markup for AI · Structured Data for LLMs";
const META_DESCRIPTION =
  "Schema markup for AI that makes your content machine-readable for ChatGPT, Perplexity, Gemini, and Google AI Overviews — Article, FAQPage, HowTo, Person, Organization, and entity-graph schema.";

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
        alt: "JSON-LD schema illustration with Person, Organization, and Article markers connecting to AI engines",
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
    q: "What is schema markup for AI?",
    a: "Schema markup for AI is structured data — usually JSON-LD using schema.org vocabulary — that you embed on your pages so AI engines can parse them as entities and facts instead of just paragraphs of text. The same markup that historically helped Google show rich results now does heavier lifting: it tells ChatGPT, Perplexity, Gemini, and AI Overviews exactly who wrote a page, what it claims, and how the entities relate to each other.",
  },
  {
    q: "How is this different from traditional SEO schema?",
    a: "Traditional SEO schema was about earning rich-result eligibility on Google — review stars, recipe cards, FAQ accordions. Schema for AI is broader and more important: it's the foundation AI engines use to decide whether your content is trustworthy and citation-worthy. You still get the rich results, but the bigger payoff is being parsed correctly by every generative engine that reads your page.",
  },
  {
    q: "Which schema types matter most for AI?",
    a: "Six matter the most. Article (with author, publisher, datePublished) for editorial content. FAQPage for question-led pages. HowTo for step-based content. Person for author bios. Organization for the brand entity. Product for commerce. Most engagements add 6–12 schema blocks per page rather than the 1 or 2 most sites ship with — and most of those new blocks are about explicit entity relationships, not rich results.",
  },
  {
    q: "Will adding schema markup actually move my AI citation rate?",
    a: "Yes — measurably, especially on pages that compete for citations on factual or definitional queries. Schema doesn't replace good content; it makes good content parseable. We typically see 20–40% lifts in citation share within 6 weeks of a structured schema rollout across a 30–50 page site, because engines that previously ignored a page now have explicit signals about what it is and who wrote it.",
  },
  {
    q: "Do I need a developer to implement this?",
    a: "Helpful but not required. Most modern CMSes (Webflow, WordPress with the right plugin, Next.js sites) make JSON-LD injection straightforward. We provide either (a) ready-to-paste blocks per page that your editor adds via the CMS, or (b) developer-ready specifications + code samples if you have an engineering team. For Next.js / React sites we ship the actual component code.",
  },
  {
    q: "What's the actual process?",
    a: "Four stages. (1) Schema audit — what's on your site today, what's missing, what's broken. (2) Entity map — define the brand, founder, products, locations, and key authors as machine-readable entities with explicit relationships. (3) Implementation — schema blocks rolled out across page templates and individual pages. (4) Validation — Google's Rich Results Test, Schema.org validator, and our own machine-parse checks against each major LLM.",
  },
  {
    q: "How long does a schema rollout take?",
    a: "Two to four weeks for a typical 30–80 page marketing site. Audit + entity mapping is week one. Implementation + validation is week two through four, depending on how schema injection is set up in your CMS. After rollout, we monitor for AI inclusion changes for the next 30 days and adjust if any schema is being parsed incorrectly.",
  },
  {
    q: "Will this hurt my regular Google rankings?",
    a: "No, the opposite. Google still uses schema for rich results and increasingly uses it for AI Overview source selection. Pages with proper schema rank better in classic SERPs AND get cited more in Overviews. The only caveat: don't fake schema you don't earn (e.g. fake reviews, fake author profiles). Google penalizes that aggressively, and AI engines learn to discount it.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Schema audit",
    description:
      "Page-by-page inventory of existing schema, what's missing, what's misconfigured, and what's actively hurting your AI parse-ability.",
  },
  {
    name: "Entity-graph mapping",
    description:
      "Brand, founder, products, locations, key authors mapped as schema.org entities with explicit relationships — the foundation AI engines use to recognize you.",
  },
  {
    name: "Article + FAQPage + HowTo",
    description:
      "The three schema types AI engines lift most aggressively — applied to editorial content, question-led pages, and step-based guides.",
  },
  {
    name: "Person & Organization schema",
    description:
      "Author bios and the brand entity made machine-readable with expertise signals, sameAs links, and named-entity attribution.",
  },
  {
    name: "Product / Service schema (where applicable)",
    description:
      "Schema for commerce or service pages — exactly what AI engines look for when answering 'best X for Y' or comparison questions.",
  },
  {
    name: "Validation & monitoring",
    description:
      "Google Rich Results Test, Schema.org validator, plus our own AI-parse checks against each major LLM after rollout.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Schema audit",
    body: "We crawl your site and inventory every existing schema block — type, completeness, validity. Most sites we audit have either no schema, broken schema, or only the auto-generated kind from a plugin. Output: a page-by-page list of what's there, what's missing, and what's actively misleading AI engines about your content.",
  },
  {
    n: "02",
    title: "Entity-graph mapping",
    body: "Before writing a line of JSON-LD we define your machine-readable entities: brand, founder, key team members, products, locations, key topics. Each gets an explicit Schema.org type, sameAs links to authoritative profiles (Wikipedia, LinkedIn, GitHub), and explicit relationships (founder → Organization, author → Article, Product → brand). This is where E-E-A-T moves from a marketing slide to actual structured data.",
  },
  {
    n: "03",
    title: "Implementation",
    body: "Schema blocks rolled out across page templates and individual pages. We work with whatever your stack uses — Webflow native, a WordPress plugin, raw JSON-LD components for Next.js / React / Vue. Output: schema present, validated, AI-parseable on every page in scope.",
  },
  {
    n: "04",
    title: "Validation",
    body: "Three layers: Google's Rich Results Test (catches malformed JSON), Schema.org validator (catches type errors), and our own probes against each major LLM that confirm the schema is being parsed correctly. We re-check 30 days after rollout to make sure AI inclusion is moving in the right direction.",
  },
] as const;

const SCHEMAS = [
  { name: "Article", line: "Editorial content — author, publisher, datePublished, articleBody." },
  { name: "FAQPage", line: "Question-led pages with explicit Q&A pairs — high citation lift." },
  { name: "HowTo", line: "Step-based guides — AI engines lift these for 'how do I' queries." },
  { name: "Person", line: "Author bios with expertise signals — anchors E-E-A-T." },
  { name: "Organization", line: "Brand entity — sameAs links to LinkedIn, Wikipedia, X." },
  { name: "Product / Service", line: "Commerce and service pages — needed for comparison queries." },
];

const TOC = [
  { id: "what", label: "What is schema for AI" },
  { id: "schemas", label: "Schema types" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function SchemaForAiPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Schema Markup for AI",
          description:
            "Structured data implementation that makes your content machine-readable for AI engines — Article, FAQPage, HowTo, Person, Organization, Product schema.",
          url: URL,
          serviceType: "Schema Markup for AI",
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
          { name: "Schema Markup for AI", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <SchemasSection />
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
            <span className="text-white">Schema Markup for AI</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Schema Markup for AI
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Make your content machine-readable.{" "}
            <span className="text-[var(--accent)]">So AI engines stop guessing.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Schema audit, entity-graph mapping, and JSON-LD implementation
            across Article, FAQPage, HowTo, Person, Organization and Product
            schema — applied so ChatGPT, Perplexity, Gemini, and Google AI
            Overviews parse your pages correctly the first time.
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
            alt="JSON-LD schema illustration with Person, Organization, and Article markers connecting to AI engines"
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
    <Section id="what" eyebrow="01" title="What is schema markup for AI?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Schema markup for AI is structured data — typically JSON-LD
            using schema.org vocabulary — that you embed on your pages so
            AI engines can parse them as entities and facts, not just walls
            of text. The markup is invisible to users but explicit to
            machines.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Same vocabulary that historically powered Google rich results
            now does much heavier lifting. ChatGPT, Perplexity, Gemini, and
            AI Overviews all parse it to decide who wrote a page, what it
            claims, and which entities it mentions. Pages with proper
            schema get cited; pages without it get skipped.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="Schema markup = JSON-LD blocks that translate your page into AI-readable entities (who, what, when, related-to)."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function SchemasSection() {
  return (
    <Section
      id="schemas"
      eyebrow="02"
      title="The six schema types AI engines lift most"
      blurb="Most sites ship with one or two schema blocks per page; we typically add 6–12 to make pages fully parseable."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="schemas"
            alt="Grid illustration of the six core schema types AI engines parse — Person, Organization, Article, FAQPage, HowTo, Product"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCHEMAS.map((s) => (
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
      title="How we run a schema rollout"
      blurb="Four stages over 2–4 weeks for a typical 30–80 page marketing site. Bigger sites scoped accordingly."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage Schema Markup for AI process from audit to validation"
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
