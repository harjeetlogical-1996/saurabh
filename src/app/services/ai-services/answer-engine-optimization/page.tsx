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

const SLUG = "answer-engine-optimization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Answer Engine Optimization (AEO) Services";
const META_DESCRIPTION =
  "AEO services that win featured snippets, People Also Ask boxes, voice search answers, and AI Overview citations — the answer-layer of search where users never click a link.";

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
        alt: "Featured-answer card connected to voice search, zero-click results, and FAQ surfaces",
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
    q: "What is Answer Engine Optimization (AEO)?",
    a: "AEO is the practice of structuring content so search and AI engines pick it as the direct answer to a user's question — featured snippets, People Also Ask, voice search, knowledge panels, AI Overviews. Where SEO competes for the click, AEO competes for the answer itself. The user often never visits your page, but they hear or read your brand named as the source.",
  },
  {
    q: "How is AEO different from SEO and GEO?",
    a: "SEO optimizes for ranking on a results page. AEO optimizes for being the actual answer pulled from that page — featured snippets, voice replies, FAQ blocks. GEO is the newer cousin focused on generative AI engines (ChatGPT, Perplexity). AEO and GEO overlap heavily — both reward clear factual structure — but AEO is broader and includes voice search, snippet capture, and knowledge-panel work that pre-dates LLMs.",
  },
  {
    q: "Why does AEO matter when nobody clicks the result?",
    a: "Because the brand mention is now the conversion event. When a user asks Google or Alexa a question and your name is in the answer, that's brand impressions, trust, and purchase intent — even without a click. AEO traffic is harder to measure with classic analytics, but it shows up in branded search lift, direct visits, and assisted conversions over the next 30–60 days.",
  },
  {
    q: "What surfaces do you optimize for?",
    a: "Six main surfaces: featured snippets (position zero), People Also Ask boxes, knowledge panels, voice search replies (Google Assistant, Siri, Alexa), FAQ rich results, and AI Overviews / SGE summaries. Each rewards slightly different formatting — a featured-snippet-friendly answer is short and definitional, an AI-Overview answer is longer and more structured. We optimize for all six in parallel.",
  },
  {
    q: "How long does AEO take to show results?",
    a: "Featured snippets and PAA boxes can land in 2–6 weeks once a page is restructured — Google reindexes high-authority pages quickly. Voice and knowledge-panel work takes longer (8–12 weeks) because those surfaces draw on entity graphs that update slowly. Most clients see meaningful answer coverage within a quarter.",
  },
  {
    q: "What does the AEO process look like?",
    a: "Five stages: (1) Question mining — find the questions your audience actually asks. (2) Answer-format authoring — write the answer block that engines lift cleanly: short definition, expanded explanation, supporting list, all on one page. (3) FAQ schema — mark answers up so engines parse them as Q&A pairs. (4) Snippet capture — target specific position-zero opportunities your competitors hold weakly. (5) Voice/AI surface optimization — tune the answer for spoken delivery and AI summarization.",
  },
  {
    q: "Can I do AEO without doing GEO?",
    a: "You can, but the work overlaps so much that it's wasteful. Both reward clear answer blocks, FAQ schema, named entities, and source-worthy structure. We almost always run them as one engagement — same content edits, applied with both surfaces in mind. The only real difference is the measurement dashboard at the end (snippet share vs AI citation share).",
  },
  {
    q: "Will AEO hurt my regular organic rankings?",
    a: "No, the opposite. Pages structured for AEO — clear question-led headings, factual answer blocks, FAQ schema — also rank better in classic SERPs. The format that wins position zero is the same format that signals 'this page directly answers the query', which is exactly what Google's main ranking algorithm rewards too.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Question mining",
    description:
      "Pull the actual questions your audience asks — from search-suggest data, support tickets, sales-call transcripts, and direct sampling against engines.",
  },
  {
    name: "Answer-block authoring",
    description:
      "Write the short factual answer + expanded explanation + supporting list pattern that featured snippets and AI summaries lift cleanly.",
  },
  {
    name: "FAQ + HowTo schema",
    description:
      "FAQPage and HowTo structured data on every relevant page so engines parse Q&A pairs without ambiguity.",
  },
  {
    name: "Snippet capture",
    description:
      "Target specific position-zero opportunities competitors hold with weak content — fastest path to visible traffic lift.",
  },
  {
    name: "Voice & AI surface tuning",
    description:
      "Tune answers for spoken delivery (Google Assistant, Siri, Alexa) and AI Overview summarization — slightly different formatting requirements per surface.",
  },
  {
    name: "Answer-share dashboard",
    description:
      "Weekly tracking of which queries you own, which competitors stole, and your share of category-level answers across all surfaces.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Question mining",
    body: "We pull a ranked list of the questions your audience actually asks. Sources include Google's People Also Ask data, search suggest, AnswerThePublic-style scrapes, support tickets, and sales-call transcripts. The output is 30–80 'questions worth being the answer to' — the spine of everything that follows.",
  },
  {
    n: "02",
    title: "Answer-format authoring",
    body: "Each priority question gets restructured into the format engines reward: a short definitional answer (40–60 words), an expanded explanation, a supporting list or table, and a clear source attribution. We work alongside your editors so brand voice survives the structural shift.",
  },
  {
    n: "03",
    title: "FAQ & HowTo schema",
    body: "FAQPage and HowTo schema markup on every page that has Q&A or step-based content. We also add Article and Organization schema to reinforce authorship and expertise — engines weight these heavily when picking which source to lift.",
  },
  {
    n: "04",
    title: "Snippet capture",
    body: "Targeted snippet hunts. We identify position-zero results your competitors hold with thin content, then build a stronger answer on your domain. Faster wins than trying to rank brand-new queries — you're stealing snippets that Google is already willing to show.",
  },
  {
    n: "05",
    title: "Voice & AI tuning",
    body: "Spoken delivery is different — voice assistants prefer 25–30 word answers in conversational phrasing. AI Overviews prefer longer, structured paragraphs. We tune key pages for both, often via small per-section edits rather than wholesale rewrites.",
  },
] as const;

const SURFACES = [
  { name: "Featured snippets", line: "Position zero on Google. Short factual answers win." },
  { name: "People Also Ask", line: "Accordion of related questions. FAQ schema is the unlock." },
  { name: "Knowledge panels", line: "Entity-driven. Schema + brand mentions build the panel." },
  { name: "Voice search", line: "Google Assistant, Siri, Alexa. Conversational answer length." },
  { name: "FAQ rich results", line: "Question-led headings + FAQPage schema." },
  { name: "AI Overviews / SGE", line: "Longer structured answers. E-E-A-T-heavy sources win." },
];

const TOC = [
  { id: "what", label: "What is AEO" },
  { id: "aeo-vs-seo", label: "AEO vs SEO" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "surfaces", label: "Surfaces" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AeoPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Answer Engine Optimization (AEO)",
          description:
            "Win featured snippets, People Also Ask, voice search, knowledge panels, FAQ rich results, and AI Overviews — the answer layer of search.",
          url: URL,
          serviceType: "Answer Engine Optimization",
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
          { name: "Answer Engine Optimization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <AeoVsSeo />
        <WhatYouGet />
        <ProcessSection />
        <SurfacesSection />
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
            <Link href="/services" className="hover:text-[var(--accent)] transition-colors">Services</Link>
            <span className="text-[var(--line-2)]">/</span>
            <Link href="/services/ai-services" className="hover:text-[var(--accent)] transition-colors">AI Services</Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">AEO</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Answer Engine Optimization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Be the answer.{" "}
            <span className="text-[var(--accent)]">Not just a link near it.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            We win the answer layer of search — featured snippets, People Also
            Ask, voice replies, knowledge panels, FAQ rich results, AI
            Overviews. Question mining, answer-format authoring, FAQ schema,
            snippet capture, and weekly answer-share tracking.
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
            alt="Featured-answer card connected to voice search, zero-click results, and FAQ surfaces"
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
    <Section id="what" eyebrow="01" title="What is Answer Engine Optimization?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Answer Engine Optimization is the work of getting your content
            picked as the direct answer to a user&apos;s question — featured
            snippets, People Also Ask, voice search, knowledge panels, FAQ
            rich results, AI Overviews. The user often never clicks through;
            the answer (and your brand name as the source) is delivered
            directly inside the search experience.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            That sounds like lost traffic, but it&apos;s a different metric:
            answer impressions and brand mentions. Both compound — branded
            search lifts, direct visits rise, and assisted conversions show
            up in your dashboard 30 to 60 days later.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="AEO = optimizing for the answer, not the click. SEO ranks your page; AEO gets your page lifted as the actual reply."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function AeoVsSeo() {
  const rows = [
    {
      attr: "Goal",
      seo: "Click through to your site.",
      aeo: "Be quoted as the source — click is optional.",
    },
    {
      attr: "Primary surface",
      seo: "Blue-link organic results.",
      aeo: "Snippets, PAA, voice, knowledge panels, AI Overviews.",
    },
    {
      attr: "Content shape",
      seo: "Long, comprehensive, keyword-rich.",
      aeo: "Question-led, short factual answer + expansion + list.",
    },
    {
      attr: "Schema priority",
      seo: "Helpful but not always required.",
      aeo: "FAQPage / HowTo schema is the unlock for several surfaces.",
    },
    {
      attr: "Time to first results",
      seo: "3–6 months for new domains.",
      aeo: "Snippets in 2–6 weeks; voice + panels in 8–12.",
    },
    {
      attr: "Measurement",
      seo: "Rankings, CTR, organic traffic.",
      aeo: "Snippet share, voice impressions, branded search lift.",
    },
  ];

  return (
    <Section id="aeo-vs-seo" eyebrow="02" title="AEO vs SEO — what changes">
      <Reveal>
        <p className="max-w-[760px] text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
          AEO doesn&apos;t replace SEO; it adds the answer-layer on top.
          Here&apos;s the practical split.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="grid grid-cols-12 bg-[var(--surface)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">Attribute</div>
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">SEO</div>
            <div className="col-span-4 px-5 py-3 text-[var(--accent)]">AEO</div>
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
              <div className="col-span-4 px-5 py-4 text-white/90">{r.aeo}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[var(--muted)] max-w-[760px] leading-[1.7]">
          We almost always run AEO and GEO together — the page restructuring overlaps almost completely, and you get coverage across both surfaces in one engagement.
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
      title="How we run an AEO engagement"
      blurb="Five stages, run as a 12-week sprint or an ongoing retainer depending on your starting point."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the five-stage AEO process from question mining to voice search optimization"
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

function SurfacesSection() {
  return (
    <Section
      id="surfaces"
      eyebrow="05"
      title="Surfaces we optimize for"
      blurb="Six answer surfaces deliver the bulk of zero-click and voice impressions today. We optimize across all of them."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="surfaces"
            alt="Grid illustration of the answer surfaces AEO targets — featured snippets, People Also Ask, knowledge panels, voice, FAQ, AI overviews"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SURFACES.map((s) => (
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
