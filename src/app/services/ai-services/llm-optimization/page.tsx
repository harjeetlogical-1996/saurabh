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

const SLUG = "llm-optimization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "LLM Optimization (LLMO) Services for Brand Citations";
const META_DESCRIPTION =
  "LLMO services that get GPT, Claude, Gemini, and Perplexity to cite YOUR brand by name when answering category-relevant questions — entity work, E-E-A-T, distributed presence, and citation tracking.";

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
        alt: "Neural network with citation tags representing brands cited by large language models",
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
    q: "What is LLMO (Large Language Model Optimization)?",
    a: "LLMO is the practice of building enough of the right kind of brand presence on the internet that large language models — GPT, Claude, Gemini, Perplexity, open-source models — name your brand when answering category-relevant questions. Unlike GEO (which focuses on AI search engines that cite live sources) and AEO (which targets answer surfaces in classic search), LLMO targets what the model itself has learned about your brand from its training data and ongoing context windows.",
  },
  {
    q: "How is LLMO different from GEO and AEO?",
    a: "AEO targets the answer layer of classic search (featured snippets, voice). GEO targets generative AI engines that cite sources (Perplexity, ChatGPT with browsing). LLMO targets the model's own knowledge — what it 'knows' about your brand without browsing. The three overlap heavily; we usually run GEO and LLMO as one engagement because both reward distributed, high-quality brand presence across the open web.",
  },
  {
    q: "How do LLMs decide which brands to cite?",
    a: "Two paths. First, training data: the model has read millions of pages, and brands mentioned consistently across credible sources (Wikipedia, news, forums, GitHub, academic papers, structured datasets) become part of its 'knowledge'. Second, runtime context: when an engine has browsing or search-augmented retrieval, it pulls live sources at answer time — that's the GEO surface. LLMO works on the first path; GEO works on the second.",
  },
  {
    q: "How do you get an LLM to learn my brand?",
    a: "By making sure your brand appears, consistently and credibly, across the surfaces LLMs train on. That means a clean Wikipedia presence (where eligible), well-structured About / Author pages with explicit entity markup, contributions to industry-recognized datasets and open repos, citations in news and trade publications, and structured Q&A on community sites the models index. We help plan and execute that distribution.",
  },
  {
    q: "How long does LLMO take to show results?",
    a: "Slower than GEO. Training-data updates roll into LLMs every 6–12 months, so brand presence built today shows up in the next training cycle. We measure proxy signals weekly (brand-mention frequency in retrieval queries, sentiment, accuracy) and budget 3–6 months for material movement in actual model knowledge. Faster wins come from the GEO surface that runs alongside.",
  },
  {
    q: "What does the LLMO process look like?",
    a: "Five stages: (1) Prompt mining — identify the questions LLMs are getting in your category. (2) Brand-mention baseline — measure how each model currently talks about you. (3) Entity & E-E-A-T work — make your brand machine-parseable as a real entity (Wikipedia/Wikidata where eligible, author/org schema, expertise signals). (4) Distributed presence — coordinate citations and structured contributions across the high-trust surfaces models train on. (5) Monitoring — weekly LLM probing across models to track sentiment, accuracy, and citation share.",
  },
  {
    q: "Is LLMO worth it if my budget is small?",
    a: "Honestly, do GEO first. It moves faster, costs less, and the work overlaps. If your category is heavily LLM-influenced — software, B2B SaaS, technical services, education — LLMO compounds and is worth a 6-month commitment. If your category is mostly local or transactional (e.g. local services, ecommerce categories), the GEO + AEO mix gives you 80% of the value at half the cost.",
  },
  {
    q: "Can you fix bad information an LLM has about my brand?",
    a: "Sometimes. If the model has hallucinated facts about your brand, the fix is reinforcement: publishing accurate, well-structured information across the surfaces the model trains on, so the next training cycle absorbs the correction. That works for hallucinations and outdated facts. For genuinely defamatory content, the fix is offline (legal / DMCA / source-site remediation) — the model itself won't change until the source data does.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Prompt mining for your category",
    description:
      "Find the questions LLMs are getting about your space. We sample across models to map the landscape of what users are asking and what models are answering.",
  },
  {
    name: "Brand-mention baseline",
    description:
      "Measure how each model currently mentions you — frequency, accuracy, sentiment. The before-picture you'll iterate against.",
  },
  {
    name: "Entity & E-E-A-T work",
    description:
      "Wikidata/Wikipedia presence (where eligible), Organization/Person schema, author bios with expertise signals — the structured data LLMs use to recognize your brand as an entity.",
  },
  {
    name: "Distributed presence strategy",
    description:
      "A plan to land brand mentions across the high-trust surfaces models train on — Wikipedia, news, structured Q&A, GitHub, datasets, industry publications.",
  },
  {
    name: "Citation-friendly content production",
    description:
      "Long-form factual content that LLMs lift cleanly — clear claims, named entities, source citations of our own. Same craft as GEO content, written for both surfaces.",
  },
  {
    name: "LLM monitoring dashboard",
    description:
      "Weekly automated probes across GPT, Claude, Gemini, Perplexity, and Copilot tracking your brand-mention frequency, sentiment, and citation share over time.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Prompt mining",
    body: "We sample 50–150 prompts across the major LLMs to map what users in your category are actually asking — and what each model is currently answering. The output is a heatmap of category-level prompt coverage and a ranked list of 'questions worth being the answer to'.",
  },
  {
    n: "02",
    title: "Brand-mention baseline",
    body: "We run a structured probe against GPT, Claude, Gemini, Perplexity, and Copilot for every priority prompt. We log how often you're mentioned, with what accuracy, and with what sentiment. Competitors get the same treatment. This is the before-picture we iterate against monthly.",
  },
  {
    n: "03",
    title: "Entity & E-E-A-T work",
    body: "Make your brand machine-parseable. That includes Wikidata/Wikipedia presence where eligibility allows, Organization and Person schema across your site, author bios with expertise signals, and explicit linking between brand entities (founder, products, locations). LLMs weight these heavily when consolidating their model of who you are.",
  },
  {
    n: "04",
    title: "Distributed presence",
    body: "Coordinated execution across the surfaces LLMs train on — guest articles in industry publications, structured contributions to open Q&A communities, GitHub presence (where applicable), curated dataset / benchmark contributions. We don't spam; we land mentions in places that compound over multiple training cycles.",
  },
  {
    n: "05",
    title: "LLM monitoring",
    body: "Weekly automated probes against each major model. The dashboard tracks brand-mention frequency, accuracy of factual claims, sentiment direction, and category-level citation share. We iterate monthly — doubling down on what's moving, replacing what isn't.",
  },
] as const;

const MODELS = [
  { name: "GPT (OpenAI)", line: "Largest training corpus. High citation share for established brands." },
  { name: "Claude (Anthropic)", line: "Conservative on facts. Rewards clean structured presence." },
  { name: "Gemini (Google)", line: "Strong on web-grounded entities. Wikidata helps materially." },
  { name: "Perplexity", line: "Browsing-augmented. GEO + LLMO both move the needle here." },
  { name: "Copilot (Microsoft)", line: "Bing + GPT blend. B2B and enterprise category strength." },
  { name: "Open-source LLMs", line: "Llama, Mistral, etc. Public dataset presence is the unlock." },
];

const TOC = [
  { id: "what", label: "What is LLMO" },
  { id: "llmo-vs", label: "LLMO vs GEO/AEO" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "models", label: "Models we cover" },
  { id: "faq", label: "FAQs" },
] as const;

export default function LlmoPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Large Language Model Optimization (LLMO)",
          description:
            "Get GPT, Claude, Gemini, Perplexity, and Copilot to cite your brand by name in category-relevant questions. Entity work, E-E-A-T, distributed presence, and weekly LLM monitoring.",
          url: URL,
          serviceType: "Large Language Model Optimization",
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
          { name: "LLM Optimization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <LlmoVsRest />
        <WhatYouGet />
        <ProcessSection />
        <ModelsSection />
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
            <span className="text-white">LLMO</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Large Language Model Optimization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Be the brand the model already knows.{" "}
            <span className="text-[var(--accent)]">By name.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            We engineer the brand presence — across Wikipedia, structured
            data, news, GitHub, and the rest of the open web — that makes
            GPT, Claude, Gemini, Perplexity, and Copilot name you when
            users ask about your category. Long game, big compounding payoff.
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
            alt="Neural network with citation tags representing brands cited by large language models"
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
    <Section id="what" eyebrow="01" title="What is Large Language Model Optimization?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            LLMO is the work of building enough of the right kind of brand
            presence across the open web that large language models name
            your brand when they answer category-relevant questions. Unlike
            GEO (which targets engines that cite live sources), LLMO
            targets what the model itself has internalized from its
            training data.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            It&apos;s a long game — training-data updates roll into LLMs
            every 6–12 months — but the payoff compounds. Once a model has
            learned your brand as the default answer for a category-level
            question, every user across that model&apos;s install base
            hears your name without you paying for the impression.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="GEO gets you cited live (engine fetches your page). LLMO gets you cited from memory (the model has already learned your brand)."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function LlmoVsRest() {
  const rows = [
    {
      attr: "Where it lives",
      geo: "Live engine retrieval (Perplexity, ChatGPT browsing).",
      aeo: "Classic search answer surfaces (snippets, PAA, voice).",
      llmo: "Inside the LLM's trained-in knowledge.",
    },
    {
      attr: "Time to results",
      geo: "2–4 weeks for first citations.",
      aeo: "2–6 weeks for snippet capture.",
      llmo: "3–6 months (next training cycle).",
    },
    {
      attr: "Primary signals",
      geo: "Citation-friendly page structure.",
      aeo: "FAQ schema + answer-block format.",
      llmo: "Distributed presence + entity recognition.",
    },
    {
      attr: "Best for",
      geo: "Category authority on AI search engines.",
      aeo: "Zero-click impressions in classic search.",
      llmo: "Default brand citation in model knowledge.",
    },
    {
      attr: "Run together",
      geo: "Stacks with LLMO and AEO.",
      aeo: "Stacks with GEO and SEO.",
      llmo: "Stacks with GEO. Long-cycle.",
    },
  ];

  return (
    <Section id="llmo-vs" eyebrow="02" title="LLMO vs GEO vs AEO">
      <Reveal>
        <p className="max-w-[760px] text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
          Three optimization surfaces, three timelines, three measurement
          frames. Most engagements run two of the three together.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="grid grid-cols-12 bg-[var(--surface)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div className="col-span-3 px-5 py-3 border-r border-[var(--line)]">Attribute</div>
            <div className="col-span-3 px-5 py-3 border-r border-[var(--line)]">GEO</div>
            <div className="col-span-3 px-5 py-3 border-r border-[var(--line)]">AEO</div>
            <div className="col-span-3 px-5 py-3 text-[var(--accent)]">LLMO</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.attr}
              className={`grid grid-cols-12 text-[14px] leading-[1.55] ${
                i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]/40"
              }`}
            >
              <div className="col-span-3 px-5 py-4 border-r border-[var(--line)] text-white">{r.attr}</div>
              <div className="col-span-3 px-5 py-4 border-r border-[var(--line)] text-[var(--muted)]">{r.geo}</div>
              <div className="col-span-3 px-5 py-4 border-r border-[var(--line)] text-[var(--muted)]">{r.aeo}</div>
              <div className="col-span-3 px-5 py-4 text-white/90">{r.llmo}</div>
            </div>
          ))}
        </div>
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
      title="How we run an LLMO engagement"
      blurb="Five stages run as a 6-month minimum retainer — LLM training cycles are slow, so we plan for compounding wins, not quick spikes."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the five-stage LLMO process from prompt mining to brand-presence monitoring"
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

function ModelsSection() {
  return (
    <Section
      id="models"
      eyebrow="05"
      title="Models we optimize for"
      blurb="Six model families cover the bulk of LLM-influenced search and conversation today. Each rewards slightly different presence signals."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="models"
            alt="Grid illustration of the major LLMs LLMO targets — GPT, Claude, Gemini, Perplexity, Copilot, and open-source models"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODELS.map((m) => (
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
