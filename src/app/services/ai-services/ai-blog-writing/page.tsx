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

const SLUG = "ai-blog-writing";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Blog Writing Services with Human Editing";
const META_DESCRIPTION =
  "AI-assisted blog writing with mandatory human editing — research, outlines, drafts, edits, SEO, and schema in one engagement. Faster than pure-human, far better than pure-AI.";

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
        alt: "Blog post layout illustration with AI-generation and human-edit glyphs",
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
    q: "What is AI-powered blog writing?",
    a: "AI-powered blog writing is editorial content production that uses AI for the heavy lifting (research, outlines, first drafts, variations) while a human editor owns voice, accuracy, and final structure. The output reads like a real human wrote it because a real human edited it — but the cost and speed are AI-grade. Done well, it ships 4–8x faster than pure-human writing without the AI-slop pattern that Google now demotes.",
  },
  {
    q: "Will Google rank AI-written content?",
    a: "Yes, when it's edited. Google's official position is that they reward helpful content regardless of how it's produced — pure AI or pure human or a mix. What they punish is unedited AI slop: generic fluff, factual errors, no original perspective. Our process is built around that distinction. Every post goes through a human editor who fact-checks, adds first-hand experience markers, and rewrites paragraphs that read mechanically.",
  },
  {
    q: "How is this different from pure-AI tools like Jasper or Copy.ai?",
    a: "Tool-only workflows produce a draft and stop. We treat the AI draft as raw material — the editor reorders sections, kills repetition, adds named entities and citations, fact-checks claims, and brings the writing into your brand voice. The final post bears almost no AI fingerprints. Same speed advantage as a tool, but the output is publishable, not a starting point you still have to fix.",
  },
  {
    q: "How long does each blog post take?",
    a: "Most 1500-word posts ship in 36–48 hours from brief to publishable draft. Longer pieces (3000+ words, technical guides) take 3–5 business days. Compare that to 5–10 days for a typical pure-human blog vendor. The speed comes from AI doing the first 60% of the work; the quality comes from the human doing the last 40%.",
  },
  {
    q: "Will the content be original or scraped?",
    a: "Original — every post passes a plagiarism check and an AI-detection check before it ships to you. Modern AI models occasionally regurgitate phrasings from training data; our editing pass catches those and rewrites. We've never had a client get a duplicate-content flag, and we publish AI-detection scores alongside every delivery (under 15% AI is the cut-off; most ship below 5%).",
  },
  {
    q: "Do I keep ownership and copyright?",
    a: "Yes — full ownership transfers to you on delivery. We don't retain any reuse rights. The AI output isn't copyrightable in most jurisdictions, but the human-edited final draft is, and that's what you receive. Standard work-for-hire terms in our agreement.",
  },
  {
    q: "What's included beyond just the writing?",
    a: "Each post includes: keyword research with primary + 4–6 secondary terms, an SEO-optimized title and meta description, internal-link suggestions to your existing content, FAQ schema markup, suggested external citations, and a one-line social hook. We can also generate a featured image via Gemini or supply hand-picked alternatives — your call.",
  },
  {
    q: "What kinds of content do you write?",
    a: "Long-form SEO blog posts, thought-leadership essays, comparison and listicle posts, technical explainers, customer-success-style case studies, content-marketing guides. We don't do news / breaking-event content (where speed beats depth and AI hallucinates often) or regulated content (medical, legal, financial advice — we'll partner with your in-house experts on those).",
  },
] as const;

const OFFERINGS = [
  {
    name: "Topic + keyword research",
    description:
      "We pick topics around what your audience actually searches — primary keyword, 4–6 secondary terms, search-intent classification per piece.",
  },
  {
    name: "Editor-owned outlines",
    description:
      "A human editor writes the outline before any AI is involved — angle, hierarchy, voice anchors, key claims. The outline is what we agree on before drafting.",
  },
  {
    name: "AI-assisted drafting",
    description:
      "AI handles the first draft against the outline. Specifically the parts AI is genuinely good at: structure, comprehensiveness, paragraph-level prose. Drafts run through our editing layer immediately.",
  },
  {
    name: "Human editing pass",
    description:
      "Voice tuning, fact-checking, deletion of mechanical phrasing, addition of first-hand experience and named entities. The edit is where the post becomes yours.",
  },
  {
    name: "On-page SEO",
    description:
      "Title, meta description, H-tag hierarchy, internal-link suggestions, image alt text, FAQ schema markup — everything Google needs on the page.",
  },
  {
    name: "Plagiarism + AI-detection report",
    description:
      "Every post ships with a Copyscape report plus an AI-detection score. Under 15% AI flag, under 5% in practice. You see the data with the draft.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Topic & keyword research",
    body: "We surface the questions your audience is actually asking — Google search-suggest, AnswerThePublic, AI engine probes. Each topic gets a primary keyword, 4–6 supporting terms, an intent classification (informational, commercial, transactional), and an estimated traffic ceiling. You approve the calendar before we start writing.",
  },
  {
    n: "02",
    title: "Editor-owned outline",
    body: "A human editor — not the AI — drafts the outline. Angle, structure, key claims to make, voice anchors, named sources to cite. The outline gets signed off before any drafting happens, so we don't waste a 1500-word AI draft on the wrong angle.",
  },
  {
    n: "03",
    title: "AI-assisted draft",
    body: "AI generates the first draft against the approved outline. We use Claude or GPT-5 depending on subject matter. The draft is the rough material — comprehensive structure, paragraphs that fill in the outline, citations of public sources where relevant. Never published as-is.",
  },
  {
    n: "04",
    title: "Human editing pass",
    body: "An editor reads every line. Voice tuned to match your brand. Mechanical phrasing rewritten. Facts checked. First-hand experience markers added (specific examples, dated case studies, named outcomes). This step is the difference between AI slop and a post Google will rank.",
  },
  {
    n: "05",
    title: "SEO finalization",
    body: "Title, meta description, H-tag hierarchy, FAQ schema markup, internal-link suggestions to your existing posts, image alt text, OG card config. Plagiarism + AI-detection reports run. You receive the final draft with all the data, ready to publish.",
  },
] as const;

const USE_CASES = [
  { name: "B2B SaaS", line: "Thought-leadership essays, product-led posts, integration guides." },
  { name: "D2C ecommerce", line: "Buying guides, comparison posts, ingredient explainers, lookbooks." },
  { name: "EdTech", line: "Course-prep guides, exam strategy, career-path explainers." },
  { name: "Healthcare & wellness", line: "Treatment-led posts (with your clinician oversight), wellness." },
  { name: "Fintech", line: "Calculator explainers, regulation breakdowns, investing 101." },
  { name: "Real estate", line: "Neighborhood guides, buying-process explainers, market reports." },
];

const TOC = [
  { id: "what", label: "What is AI blog writing" },
  { id: "use-cases", label: "Use cases" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiBlogWritingPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Blog Writing (with human editing)",
          description:
            "AI-assisted blog writing with mandatory human editing. Topic research, editor-owned outlines, AI-drafted, human-finished, fully SEO + schema optimized.",
          url: URL,
          serviceType: "AI Blog Writing",
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
          { name: "AI Blog Writing", url: URL },
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
            <span className="text-white">AI Blog Writing</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Blog Writing
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            AI-fast, human-finished.{" "}
            <span className="text-[var(--accent)]">Not AI-slop.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Topic research, editor-owned outlines, AI-drafted, human-edited,
            SEO-finalized. The speed of an AI tool with the publish-quality
            of a real editor — and a plagiarism + AI-detection report shipped
            with every draft.
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
            alt="Blog post layout illustration with AI-generation sparkle and human-edit pen glyphs"
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
    <Section id="what" eyebrow="01" title="What is AI-powered blog writing?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI-powered blog writing is editorial content production where
            AI does the heavy lifting (research, outline, first draft) and
            a human editor owns voice, accuracy, and structure. Output
            reads like a real human wrote it — because a real human
            actually edited it. Cost and speed are AI-grade; quality is
            editor-grade.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Done well, it ships 4–8x faster than pure-human writing
            without the AI-slop pattern Google now demotes. The trick is
            never publishing what the AI produced — only what the editor
            finished.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="AI fast, human finished. AI gets you 60% of the way. The editor takes you the last 40% — and that 40% is what makes the post rank."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function UseCasesSection() {
  return (
    <Section
      id="use-cases"
      eyebrow="02"
      title="Industries we write for"
      blurb="Long-form posts, thought leadership, comparison content, buying guides — across the verticals where our editorial team has actual category fluency."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="use-cases"
            alt="Grid illustration of six industries we write AI-assisted blog content for"
          />
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
    <Section id="process" eyebrow="04" title="How a blog post gets made" blurb="Same five-stage process every time, because reproducibility is what makes the speed actually safe.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the five-stage AI blog writing process from research to SEO finalization" className="mb-12 rounded-2xl" />
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
