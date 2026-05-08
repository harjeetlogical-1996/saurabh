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

const SLUG = "ai-translation-localization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Translation & Localization Services for 30+ Languages";
const META_DESCRIPTION =
  "AI-powered translation with native-speaker review and cultural localization — websites, marketing copy, product catalogs, support docs across 30+ languages, delivered in days not weeks.";

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
        alt: "Two document cards connected by a translation arrow with abstract language glyph badges",
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
    q: "What is AI translation and localization?",
    a: "AI translation is converting text from one language to another using machine learning models (Google Gemini, Claude, GPT, DeepL). Localization is the bigger job — adapting tone, cultural references, units, currency, idioms, legal nuance, and design for the target market. Translation alone gives you readable text; localization makes it feel native. We do both, with a native-speaker review on every project.",
  },
  {
    q: "Why not just use Google Translate?",
    a: "Google Translate is fine for understanding a foreign menu — not for marketing copy that's supposed to convert. Pure-machine translation produces text that's grammatically correct but tonally flat, culturally clumsy, and visibly machine-translated to a native speaker. Conversion rates drop. Trust drops. Our process keeps the speed of AI but adds native-speaker editing and cultural QA, which is what makes the difference between 'translated' and 'localized'.",
  },
  {
    q: "Which languages do you cover?",
    a: "30+ active. The most common: Hindi, Marathi, Tamil, Bengali, Gujarati, Punjabi (Indian regional), Spanish (LATAM and EU variants), French, German, Italian, Portuguese, Dutch (European), Japanese, Korean, Chinese (Simplified and Traditional), Vietnamese, Thai, Indonesian (Asian), Arabic, Hebrew, Turkish (RTL & Middle East), Polish, Czech, Romanian (Eastern Europe). Others on request.",
  },
  {
    q: "How fast is the turnaround?",
    a: "Days, not weeks. A 5,000-word website translated and localized into one language typically ships in 3–5 business days. Multi-language projects run in parallel — 4 languages doesn't take 4× longer, more like 1.3×. The speed comes from AI doing the first pass; the quality comes from native-speaker review on top.",
  },
  {
    q: "What about RTL languages like Arabic and Hebrew?",
    a: "Fully supported. We localize the text plus flag any layout / design adjustments needed (mirroring nav, flipped icons, RTL-safe punctuation). If you have a developer, we hand off the spec; if we're also doing the dev work, we ship the RTL CSS and component changes alongside the translated content.",
  },
  {
    q: "Can you handle SEO in multiple languages?",
    a: "Yes — multilingual SEO is part of the engagement when scoped. That includes hreflang tag mapping, per-language keyword research (search intent often shifts across markets), URL structure decisions (subdirectory vs subdomain vs ccTLD), and schema localization. We also coordinate with our GEO / AEO services for AI-engine visibility in each target market.",
  },
  {
    q: "What content types do you translate?",
    a: "Websites and landing pages, blog posts, product catalogs (e-commerce SKUs at scale), email sequences, ad copy, support documentation, video subtitles and voiceover scripts, app UI strings, legal pages (with native-speaker legal review where required). We don't do certified legal / medical translation that requires a sworn translator — we'll refer to specialists for those.",
  },
  {
    q: "How is this priced?",
    a: "Per-word for content, per-string for app UI, project rate for full sites. AI does the bulk so per-word rates are 60–80% lower than traditional human translation. We send a fixed quote after a 30-minute scoping call; multi-language discounts apply when you commit to 3+ languages upfront.",
  },
] as const;

const OFFERINGS = [
  {
    name: "AI translation",
    description:
      "First-pass translation via the best model for the language pair (Gemini, Claude, GPT, DeepL — we pick per-language based on quality benchmarks).",
  },
  {
    name: "Native-speaker review",
    description:
      "Every translation reviewed by a native speaker of the target language. Tone, idiom, cultural fit checked. Mistakes caught before delivery.",
  },
  {
    name: "Cultural localization",
    description:
      "Beyond words: dates, units, currency, examples, references, color choices, imagery — adapted for the target market, not just translated.",
  },
  {
    name: "Multilingual SEO",
    description:
      "Hreflang setup, per-language keyword research, URL structure, schema localization, search-intent mapping per market.",
  },
  {
    name: "RTL & layout fixes",
    description:
      "Arabic / Hebrew RTL handling, mirrored navigation, flipped icons, RTL-safe punctuation, font fallbacks. We ship CSS + spec, not just text.",
  },
  {
    name: "TM + glossary management",
    description:
      "Translation memory and brand glossary maintained across projects so terminology stays consistent and you don't pay twice for repeated phrases.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Source analysis",
    body: "We audit the source content — word count, technical density, brand-specific terminology, formatting (HTML / Markdown / JSON / CSV), target markets. Output: a per-language scoping doc with timeline, cost, and which model we'll use for each pair (AI quality varies by language).",
  },
  {
    n: "02",
    title: "AI translation pass",
    body: "First pass via the best-performing model for that language pair. We benchmark Gemini, Claude, GPT, and DeepL per language (Korean ≠ German ≠ Hindi in terms of which model wins). Brand glossary baked into prompts so terminology stays consistent.",
  },
  {
    n: "03",
    title: "Native-speaker review",
    body: "A native speaker of the target language reads every line. Idiom, tone, cultural fit checked. Mistranslations corrected. Region-specific variants handled (Latin American Spanish ≠ European Spanish; Simplified Chinese ≠ Traditional). This is where AI translation becomes localized content.",
  },
  {
    n: "04",
    title: "Cultural QA + delivery",
    body: "Final pass on the cultural layer — dates, units, currency, references, imagery suggestions. RTL layout fixes shipped if applicable. Hreflang and SEO setup if in scope. Delivery format your call: HTML files, JSON strings, CSV upload, direct CMS write via API, or Crowdin / Lokalise sync.",
  },
] as const;

const LANGUAGES = [
  { name: "Indian regional", line: "Hindi, Marathi, Tamil, Bengali, Gujarati, Punjabi, Telugu, Kannada." },
  { name: "European", line: "Spanish, French, German, Italian, Portuguese, Dutch, Polish, Czech." },
  { name: "Asian", line: "Japanese, Korean, Chinese (Simplified + Traditional), Vietnamese, Thai, Indonesian." },
  { name: "Middle East / RTL", line: "Arabic, Hebrew, Persian, Turkish — full RTL layout support." },
  { name: "LATAM", line: "Spanish (regional variants), Brazilian Portuguese." },
  { name: "Custom on request", line: "Less common pairs scoped per project — usually a 5-day lead time." },
];

const TOC = [
  { id: "what", label: "What is localization" },
  { id: "languages", label: "Languages" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiTranslationPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Translation & Localization",
          description:
            "AI translation with native-speaker review and cultural localization across 30+ languages. Websites, marketing, catalogs, support docs.",
          url: URL,
          serviceType: "AI Translation & Localization",
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
          { name: "AI Translation & Localization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <LanguagesSection />
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
            <span className="text-white">AI Translation & Localization</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Translation & Localization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Sounds native.{" "}
            <span className="text-[var(--accent)]">Ships in days.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            AI handles the volume. A native speaker handles the voice.
            Cultural QA handles the rest. Websites, marketing copy, product
            catalogs, support docs — across 30+ languages with full RTL
            support and multilingual SEO.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link href="/contact" className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all">
              Start a project <span>→</span>
            </Link>
            <Link href="/services/ai-services" className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium">
              All AI services
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <ServiceImage name="hero" alt="Two document cards connected by a translation arrow, surrounded by abstract language glyph badges" priority />
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
    <Section id="what" eyebrow="01" title="What is AI translation and localization?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI translation converts text from one language to another using
            machine-learning models. Localization is the bigger job —
            adapting tone, cultural references, units, currency, idioms,
            and design for the target market. Translation alone gives you
            readable text; localization makes it feel native.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            We do both. AI handles the volume so the cost stays
            reasonable. A native speaker reviews every line so the output
            doesn&apos;t read like a machine. Cultural QA catches the
            things even good translation misses — references, units,
            imagery, layout for RTL languages.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="Translation = words. Localization = the whole experience adapted to a new market. We ship localization, not just translation." />
        </Reveal>
      </div>
    </Section>
  );
}

function LanguagesSection() {
  return (
    <Section id="languages" eyebrow="02" title="30+ languages we localize for" blurb="The big buckets — Indian regional, European, Asian, Middle East, LATAM. Custom pairs scoped per project.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="languages" alt="Grid illustration of six abstract script glyphs representing language families" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{l.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{l.line}</div>
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
    <Section id="process" eyebrow="04" title="How a translation project runs" blurb="Four stages, parallel across languages. A 5,000-word site into one language ships in 3–5 business days.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI translation and localization process" className="mb-12 rounded-2xl" />
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
      <img src={`${base}-1600.jpg`} srcSet={`${base}-800.jpg 800w, ${base}-1600.jpg 1600w`} sizes="(max-width: 768px) 100vw, 720px" alt={alt} width={1600} height={900} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} className="w-full h-full object-cover" />
    </picture>
  );
}
