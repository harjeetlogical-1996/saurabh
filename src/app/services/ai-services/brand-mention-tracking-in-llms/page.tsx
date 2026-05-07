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

const SLUG = "brand-mention-tracking-in-llms";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "Brand Mention Tracking in LLMs · ChatGPT, Claude, Gemini";
const META_DESCRIPTION =
  "Continuous brand-mention monitoring across ChatGPT, Claude, Gemini, Perplexity, and Copilot — frequency, sentiment, accuracy, share-of-voice, and alerting on hallucinated facts.";

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
        alt: "Brand-mention monitoring dashboard with line graph, donut charts, and alert markers",
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
    q: "What is brand mention tracking in LLMs?",
    a: "It's continuous monitoring of how major LLMs — ChatGPT, Claude, Gemini, Perplexity, Copilot — talk about your brand. We run a structured set of prompts against each model on a weekly cadence, log every mention, score sentiment and accuracy, and alert you when something material changes (a competitor takes share, a model starts hallucinating facts about you, sentiment shifts).",
  },
  {
    q: "Why do I need this — isn't classic brand monitoring enough?",
    a: "Classic brand monitoring covers the open web — articles, social, reviews. LLM brand mentions are a different surface entirely: they happen inside private conversations between users and AI models. You'll never see them in Google Alerts. But every day, more buying decisions are influenced by what an LLM says about you, often before the user ever visits your site. If you don't track that surface, you're flying blind on it.",
  },
  {
    q: "What exactly do you measure?",
    a: "Six things, weekly: (1) Mention frequency — how often each model mentions your brand across the test prompt set. (2) Sentiment — positive, neutral, negative. (3) Accuracy — are the facts the model states actually correct, or hallucinated. (4) Share of voice — your mention share vs three named competitors. (5) Trend — week-over-week movement. (6) Alerts — material changes that warrant immediate attention.",
  },
  {
    q: "How often do you probe the models?",
    a: "Weekly is standard. We run the full prompt set against each of the six target models on a fixed day — usually Monday — and you get the dashboard update by Tuesday. For high-stakes brands (e.g. fintech, regulated industries) we offer daily probing as an upgrade. Probing more than once a day rarely yields signal worth the noise.",
  },
  {
    q: "Can you alert me to hallucinated facts?",
    a: "Yes — that's one of the highest-value parts of the service. We score every mention for accuracy, flag hallucinations (model states something untrue about you), and alert you within 24 hours of detection. Fixing hallucinations usually requires content / schema work to reinforce the correct fact, which we coordinate with our LLMO and content teams when in scope.",
  },
  {
    q: "Which models do you cover?",
    a: "Six by default: GPT-4 / 5 (via OpenAI API), Claude (Anthropic API), Gemini (Google API), Perplexity (live), Copilot (Bing-derived), and one rotating open-source model (Llama, Mistral, etc.). You can add others on request — Grok, You.com, vertical AI engines (Phind, Kagi). Each model gets its own dashboard tab because the failure modes are model-specific.",
  },
  {
    q: "Do I get raw data or just summary metrics?",
    a: "Both. The dashboard shows summary metrics (frequency, sentiment, share-of-voice, trend) and you can drill into the raw probe outputs — every prompt, every model response, every brand mention with timestamp. Most clients use the summary for weekly review and the raw layer when investigating a specific incident or hallucination.",
  },
  {
    q: "Does this work alongside GEO and LLMO?",
    a: "It's the measurement layer underneath both. GEO and LLMO move citation share and brand presence; tracking proves whether the work is actually moving the needle. Most clients run tracking as a stand-alone retainer first to baseline their starting position, then add GEO or LLMO once they know where the gaps are. Tracking continues through both engagements as the source-of-truth metric.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Custom prompt-set design",
    description:
      "50–150 prompts designed specifically for your category and brand — calibrated to surface the questions your audience actually asks AI.",
  },
  {
    name: "Weekly automated probing",
    description:
      "Full prompt set run against six target models every week. Multiple sessions per probe to capture variance, not just a snapshot.",
  },
  {
    name: "Sentiment & accuracy scoring",
    description:
      "Every mention scored — positive, neutral, negative — and flagged when facts are wrong (hallucination detection).",
  },
  {
    name: "Share-of-voice dashboard",
    description:
      "Your mention share vs three named competitors, per model, week-over-week. Trend lines, not vanity screenshots.",
  },
  {
    name: "Real-time alerts",
    description:
      "Email and Slack alerts on material changes — competitor takes share, accuracy drops, sentiment shifts negative.",
  },
  {
    name: "Quarterly trend reports",
    description:
      "Synthesized 90-day reports with the patterns that matter — what moved, what didn't, what to do about it next quarter.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Prompt-set design",
    body: "We work with you to design 50–150 prompts that capture how your audience actually asks AI about your category. Mix of broad category prompts, mid-funnel comparisons, and bottom-funnel intent. The prompt set becomes the fixed yardstick we measure against — same prompts every week so the data is comparable.",
  },
  {
    n: "02",
    title: "Automated probing",
    body: "Full prompt set runs against ChatGPT, Claude, Gemini, Perplexity, Copilot, and one rotating open-source model every week. Multiple sessions per probe to capture model variance. Every mention is logged with timestamp, model, full response, citation context, and detected entities.",
  },
  {
    n: "03",
    title: "Scoring & analysis",
    body: "Every mention is scored for sentiment (positive / neutral / negative) and accuracy (factually correct / hallucinated / unverifiable). Share-of-voice is computed against three named competitors. Trends roll up week-over-week and quarter-over-quarter into the dashboard.",
  },
  {
    n: "04",
    title: "Alerts & reporting",
    body: "Real-time alerts (email + Slack) on material changes. Weekly summary email. Quarterly trend reports synthesizing patterns. We schedule a 30-minute review call quarterly to walk you through the data and decide what to do about it.",
  },
] as const;

const METRICS = [
  { name: "Mention frequency", line: "How often each model names your brand across the prompt set." },
  { name: "Sentiment", line: "Positive / neutral / negative scoring per mention." },
  { name: "Accuracy", line: "Facts the model states — correct, hallucinated, unverifiable." },
  { name: "Share of voice", line: "Your mention share vs three named competitors per model." },
  { name: "Trend direction", line: "Week-over-week and quarter-over-quarter movement." },
  { name: "Alerts", line: "Material changes flagged in real time via email and Slack." },
];

const TOC = [
  { id: "what", label: "What is LLM tracking" },
  { id: "metrics", label: "Metrics we track" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function BrandTrackingPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Brand Mention Tracking in LLMs",
          description:
            "Continuous brand-mention monitoring across ChatGPT, Claude, Gemini, Perplexity, and Copilot. Frequency, sentiment, accuracy, share-of-voice, and real-time alerts.",
          url: URL,
          serviceType: "LLM Brand Mention Tracking",
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
          { name: "Brand Mention Tracking in LLMs", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <MetricsSection />
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
            <span className="text-white">Brand Mention Tracking in LLMs</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · LLM Brand Mention Tracking
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Know what AI says about you.{" "}
            <span className="text-[var(--accent)]">Every week. Across every model.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Continuous monitoring across ChatGPT, Claude, Gemini, Perplexity,
            and Copilot. Frequency, sentiment, accuracy, share-of-voice, and
            real-time alerts on hallucinations or competitor share-shifts.
            The measurement layer under every GEO and LLMO engagement.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Start tracking <span>→</span>
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
            alt="Brand-mention monitoring dashboard with line graph, donut charts, and alert markers"
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
    <Section id="what" eyebrow="01" title="What is brand mention tracking in LLMs?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            It&apos;s continuous monitoring of how major LLMs talk about
            your brand. Every week, we run a calibrated prompt set against
            ChatGPT, Claude, Gemini, Perplexity, and Copilot, log every
            mention, and score it for sentiment and accuracy.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Classic brand monitoring covers the open web. LLM tracking
            covers a different surface — the private conversations between
            users and AI models, where buying decisions are increasingly
            shaped before users ever visit a website. Without tracking,
            you&apos;re blind on it.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="LLM brand tracking = the GA4 of AI search. Frequency, sentiment, accuracy, share-of-voice — measured weekly across every major model."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function MetricsSection() {
  return (
    <Section
      id="metrics"
      eyebrow="02"
      title="What we measure"
      blurb="Six metrics tracked weekly across six models. Each metric maps to a decision you'll actually make — not vanity numbers."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="metrics"
            alt="Grid illustration of six brand-mention metrics — frequency, sentiment, accuracy, share-of-voice, trend, alerts"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {METRICS.map((m) => (
              <li key={m.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{m.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{m.line}</div>
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
    <Section id="process" eyebrow="04" title="How tracking runs" blurb="Four stages, set up in week one. Then it just runs — weekly probes, real-time alerts, quarterly trend reports.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage brand-mention tracking process from prompt-set design to alerting" className="mb-12 rounded-2xl" />
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
