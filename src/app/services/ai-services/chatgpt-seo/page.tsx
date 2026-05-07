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

const SLUG = "chatgpt-seo";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "ChatGPT SEO Services · Get Cited Inside ChatGPT Answers";
const META_DESCRIPTION =
  "ChatGPT SEO that gets your brand cited as a source inside ChatGPT's answers — prompt mining, browsing-source optimization, citation-friendly content, and weekly citation tracking.";

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
        alt: "Chat-window illustration showing a brand cited as a source in a ChatGPT-style answer",
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
    q: "What is ChatGPT SEO?",
    a: "ChatGPT SEO is the work of getting your brand cited as a source when ChatGPT answers a relevant user question. It splits into two paths: ranking inside ChatGPT's web-browsing layer (when the model fetches live pages and quotes them) and being part of ChatGPT's trained-in knowledge (so it cites you from memory). Both paths reward different signals — we work on both.",
  },
  {
    q: "Does ChatGPT actually cite sources?",
    a: "Yes, more than people realize. With browsing on, ChatGPT routinely names sources inline when answering factual questions — recipe sites, product reviews, news, B2B research. Without browsing, it still mentions brands by name when they're well-represented in its training data. The gap between 'never gets traffic from ChatGPT' and 'gets cited multiple times a week' is almost always a few well-structured pages and consistent brand presence.",
  },
  {
    q: "How is ChatGPT SEO different from Google SEO?",
    a: "Google SEO ranks your page on a results list and rewards backlinks, page authority, and keyword targeting. ChatGPT SEO competes for inclusion in a single, synthesized answer — and the model rewards different signals: clear factual claims, citation-worthy structure, freshness for time-sensitive queries, and how often your brand shows up across the open web. Both stack — fixing one usually helps the other.",
  },
  {
    q: "How long does ChatGPT SEO take to show results?",
    a: "The browsing-side wins are fast: pages restructured for citation can start being quoted in 2–4 weeks, especially for fresh / news-adjacent queries where ChatGPT browses live. The memory-side (ChatGPT citing you without browsing) is slower — that depends on the next training cycle, which is months out. We aim for first-evidence wins inside a month and durable wins by month four.",
  },
  {
    q: "Do I need a Plus subscription or any tooling?",
    a: "No — we run all the probing on our side. You don't need ChatGPT Plus, you don't need to install tracking. The audit and ongoing tracking happen via automated query runs we operate against the public ChatGPT API (and Plus, where browsing is on). You get the dashboard. You don't have to touch anything.",
  },
  {
    q: "What's the actual process?",
    a: "Four stages. (1) Prompt mining — find the questions your audience asks ChatGPT about your category. (2) Browsing-source optimization — restructure or create the pages ChatGPT will fetch when those prompts hit (clear answer blocks, named entities, FAQ schema). (3) Citation-friendly content — write or rewrite long-form pieces with the structure ChatGPT lifts cleanly. (4) Citation tracking — weekly probes against ChatGPT to log who's being cited, with what accuracy, and how often.",
  },
  {
    q: "Will ChatGPT SEO send me traffic?",
    a: "Some — and the kind that does come is unusually high-intent (users who asked ChatGPT a buying-stage question and clicked through). But the bigger value is brand impressions: every time ChatGPT names you as a source, that's an unpaid mention to a high-attention user. We measure both — referral traffic AND citation share — because the second compounds even when the first looks small.",
  },
  {
    q: "Is ChatGPT SEO compatible with regular SEO?",
    a: "More than compatible — they reinforce each other. Pages structured for ChatGPT citation (clear answers, factual claims, schema) also rank better in Google. The only friction is editorial: ChatGPT-friendly pages tend to be more direct and less keyword-stuffed than legacy SEO copy. If your existing SEO is already modern, there's no tradeoff. If it's full of fluff, the rewrite usually lifts both surfaces at once.",
  },
] as const;

const OFFERINGS = [
  {
    name: "ChatGPT prompt mining",
    description:
      "We sample the questions users actually ask ChatGPT about your category — across both Plus (with browsing) and the standard API.",
  },
  {
    name: "Browsing-source optimization",
    description:
      "Restructure pages so ChatGPT lifts them cleanly when it browses — short factual lead, expanded explanation, named entities, FAQ schema.",
  },
  {
    name: "Citation-friendly content production",
    description:
      "Long-form pieces written from the ground up to be citation-worthy — clear claims, sources of our own, scannable structure.",
  },
  {
    name: "ChatGPT visibility tracking",
    description:
      "Weekly probes across 50–150 prompts. You see citation share, accuracy, sentiment, and how it moves vs your three competitors.",
  },
  {
    name: "Knowledge-cycle planning",
    description:
      "A roadmap for the slower memory-side wins — distributed presence and authority signals that ride the next ChatGPT training cycle.",
  },
  {
    name: "Editorial templates",
    description:
      "Templates and a written guide so your in-house team can keep producing ChatGPT-grade content after the engagement.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Prompt mining",
    body: "We sample 50–150 prompts users in your category actually ask ChatGPT — pulled from search-suggest data, support tickets, sales-call transcripts, and direct sampling. Both browsing-on and browsing-off variants. Output: a ranked list of 'prompts worth being the answer to'.",
  },
  {
    n: "02",
    title: "Browsing-source optimization",
    body: "ChatGPT with browsing fetches live pages. We restructure the pages it's most likely to fetch — for the prompts that matter — into citation-friendly format. Short factual answer up top, expanded explanation, named entities, FAQ schema, source citations. The same edits help Google snippets and Perplexity, so the work compounds.",
  },
  {
    n: "03",
    title: "Citation-friendly content",
    body: "New long-form pieces authored from scratch around the priority prompts. Each one written for both the ChatGPT browsing surface AND classic search. Clear claims, source-worthy structure, internal links, schema. Your editors stay involved so brand voice survives.",
  },
  {
    n: "04",
    title: "Citation tracking",
    body: "Weekly automated probes against ChatGPT for every priority prompt. We log citation share, accuracy, sentiment, and how it moves vs three competitors. You see the trend in a dashboard — not a one-off screenshot. We iterate monthly.",
  },
] as const;

const FACTORS = [
  { name: "Source freshness", line: "Browsing-on ChatGPT prefers recent, dated content for time-sensitive queries." },
  { name: "Authority & E-E-A-T", line: "Established domains and clear author expertise win disproportionately." },
  { name: "Clear factual claims", line: "Short, verifiable claims get lifted; vague paragraphs don't." },
  { name: "Source citations of your own", line: "ChatGPT trusts pages that themselves cite credible sources." },
  { name: "Conversational format", line: "Q&A blocks, FAQ schema, scannable structure — easier to lift." },
  { name: "Brand presence breadth", line: "How often you appear across the open web feeds the memory-side." },
];

const TOC = [
  { id: "what", label: "What is ChatGPT SEO" },
  { id: "factors", label: "Ranking factors" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function ChatGptSeoPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "ChatGPT SEO",
          description:
            "Get cited as a source inside ChatGPT answers — prompt mining, browsing-source optimization, citation-friendly content, and weekly citation tracking.",
          url: URL,
          serviceType: "ChatGPT SEO",
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
          { name: "ChatGPT SEO", url: URL },
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
            <span className="text-white">ChatGPT SEO</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · ChatGPT SEO
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Get cited inside ChatGPT.{" "}
            <span className="text-[var(--accent)]">Not just in the index it crawled three years ago.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            ChatGPT routinely names sources when answering factual and
            buying-stage questions. We engineer the pages and presence that
            get your brand picked — prompt mining, browsing-source
            optimization, citation-friendly content, and weekly tracking.
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
            alt="Chat-window illustration showing a brand cited as a source in a ChatGPT-style answer"
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
    <Section id="what" eyebrow="01" title="What is ChatGPT SEO?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            ChatGPT SEO is the work of getting your brand named as a source
            when ChatGPT answers a relevant question. It plays out across
            two surfaces — ChatGPT&apos;s live browsing layer (where it
            fetches and quotes pages in real time) and ChatGPT&apos;s
            trained-in memory (where it mentions brands without browsing).
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The browsing surface moves fast — well-structured pages get
            cited within weeks. The memory surface moves slowly, on the
            cadence of training-data updates. We work both in parallel so
            you compound across short and long horizons.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="ChatGPT SEO = engineering the pages and presence that make ChatGPT pick your brand as a source inside its synthesized answer."
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
      title="What ChatGPT actually rewards"
      blurb="The signals that move ChatGPT citation share, in rough order of leverage. Same factors apply across browsing and memory surfaces, with slightly different weights."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="factors"
            alt="Grid illustration of the six factors that drive ChatGPT citations — freshness, authority, clear claims, citations, conversational format, and source diversity"
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
      title="How we run a ChatGPT SEO engagement"
      blurb="Four stages, run as a 12-week sprint or an ongoing retainer depending on your starting point."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage ChatGPT SEO process from prompt mining to citation tracking"
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
