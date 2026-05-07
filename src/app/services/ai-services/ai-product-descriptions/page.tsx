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

const SLUG = "ai-product-descriptions";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Product Description Services for E-commerce at Scale";
const META_DESCRIPTION =
  "AI-written product descriptions for e-commerce — Shopify, WooCommerce, Magento, BigCommerce. 50 to 5,000 SKUs at 70%+ lower cost than human-only, with QA sampling and brand-voice tuning.";

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
        alt: "Three stylized product cards connected to an AI sparkle glyph",
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
    q: "What is AI product description writing?",
    a: "AI product description writing is e-commerce catalog copy at scale — AI generates the bulk of descriptions from your product data (specs, attributes, images), and a human reviewer audits a sample for quality, voice, and accuracy. The workflow is built for catalogs of 50 to 5,000+ SKUs where pure-human writing is too slow and pure-AI is too risky.",
  },
  {
    q: "Why does this work better than just using ChatGPT directly?",
    a: "Three reasons: voice consistency across thousands of SKUs (we build a voice profile and bake it into every prompt), fact accuracy (we feed the AI structured product data instead of letting it hallucinate features), and quality assurance (we sample-review 5–10% of output and re-generate weak ones). DIY ChatGPT works for 10 products; it falls apart at 500.",
  },
  {
    q: "Will the descriptions be unique or duplicated?",
    a: "Unique. Each description is generated against that specific SKU's data — name, specs, materials, intended use, audience. Two similar products won't get the same description because the prompt is parameterized per SKU. We run plagiarism checks on a 5% sample and have never had a duplicate-content flag from Google.",
  },
  {
    q: "How much faster (and cheaper) is this than human writers?",
    a: "Roughly 70% cheaper per SKU and 5x faster. A 500-SKU catalog that would cost ₹2.5–4 lakh and take 6–8 weeks with human writers ships in 1–2 weeks for ₹75K–1.5L with us. The savings come from AI doing the volume; the quality comes from the QA layer keeping the output usable.",
  },
  {
    q: "What input do I need to give you?",
    a: "A CSV or product feed with: SKU, product name, category, key specs/attributes (size, material, weight, etc), and optionally a sample image link. The richer the input data, the better the descriptions. Sparse data still works — we generate from what's there — but specs-rich catalogs produce noticeably better output.",
  },
  {
    q: "Do you handle SEO too?",
    a: "Yes — every description is optimized for the relevant product keyword (extracted from the product name + category) plus 1–2 secondary terms. We don't keyword-stuff; we structure the description so search intent is clear. Schema (Product schema) is added per page if you want it shipped that way.",
  },
  {
    q: "What e-commerce platforms can you deliver to?",
    a: "All the major ones — Shopify, WooCommerce, Magento, BigCommerce, Wix Stores, Squarespace, custom catalogs (CSV upload), headless setups via API. Delivery format is your call: CSV upload-ready, direct platform write via API, or HTML files.",
  },
  {
    q: "How do you keep brand voice consistent across thousands of SKUs?",
    a: "Voice profile. Before generation starts, we ingest 10–20 of your strongest existing product descriptions, distill the voice patterns (tone, sentence rhythm, vocabulary, what the brand says vs avoids), and bake those rules into every generation prompt. Sample QA double-checks voice on 5–10% of output. The result is descriptions that sound like one brand, not a stitched-together robot.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Catalog ingestion",
    description:
      "We take your CSV, product feed, or live store API as input — SKU, name, category, specs, attributes, optional images. Sparse or rich data both work.",
  },
  {
    name: "Brand-voice tuning",
    description:
      "Voice profile built from your existing best-performing descriptions. Every generated description honors it; QA sample catches drift.",
  },
  {
    name: "AI bulk generation",
    description:
      "50 to 5,000+ SKUs generated against the voice profile and per-SKU data. Each description is unique to that product, never templated.",
  },
  {
    name: "QA sampling",
    description:
      "5–10% of output reviewed by a human for quality, accuracy, and voice. Weak descriptions are re-generated; pattern issues fixed at the prompt level.",
  },
  {
    name: "SEO + schema",
    description:
      "Each description optimized for the relevant product keyword plus 1–2 secondary terms. Optional Product schema shipped per page.",
  },
  {
    name: "Platform delivery",
    description:
      "CSV-upload-ready, direct write via Shopify / WooCommerce / Magento / BigCommerce API, or HTML files — whatever your team prefers.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Catalog ingestion",
    body: "We start with your CSV or product feed. Each row gets normalized — SKU, product name, category, key specs, optional image link. Sparse data still works; we generate from what's there. We flag rows that need more input before generation starts so you can fill gaps where it matters.",
  },
  {
    n: "02",
    title: "Voice profile + sample generation",
    body: "We ingest 10–20 of your strongest existing descriptions, distill the voice patterns, and generate a sample batch (typically 25 SKUs) for your sign-off. You review, give feedback, we tune the voice profile. Once locked, the rest of the catalog runs against it.",
  },
  {
    n: "03",
    title: "Bulk generation + QA",
    body: "Full catalog generated in passes of 100–250 SKUs. After each pass, a human reviewer samples 5–10% — checks voice consistency, fact accuracy, SEO alignment. Weak outputs re-generated; recurring pattern issues fixed in the prompt.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "Final descriptions delivered in your preferred format: CSV upload, direct platform write via API, or per-product HTML. Optional Product schema markup included. We can also stage on a hidden test collection for your QA before live publish.",
  },
] as const;

const PLATFORMS = [
  { name: "Shopify", line: "Direct write via Admin API or CSV import. Native variants supported." },
  { name: "WooCommerce", line: "WP REST API or CSV import. Compatible with major SEO plugins." },
  { name: "Magento (Adobe Commerce)", line: "REST/GraphQL API or import profiles for bulk catalog." },
  { name: "BigCommerce", line: "Catalog API or stencil CSV import." },
  { name: "Headless / custom", line: "Any catalog with an API or CSV export — we adapt to your stack." },
  { name: "Wix / Squarespace", line: "CSV import where available; manual paste for smaller catalogs." },
];

const TOC = [
  { id: "what", label: "What is AI product copy" },
  { id: "platforms", label: "Platforms" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiProductDescriptionsPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Product Descriptions for E-commerce",
          description:
            "AI-written product descriptions at scale — 50 to 5,000+ SKUs across Shopify, WooCommerce, Magento, BigCommerce. Voice tuning, QA sampling, SEO optimization, schema markup.",
          url: URL,
          serviceType: "AI Product Descriptions",
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
          { name: "AI Product Descriptions", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <PlatformsSection />
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
            <span className="text-white">AI Product Descriptions</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Product Descriptions
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            5,000 SKUs.{" "}
            <span className="text-[var(--accent)]">Same brand voice.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            E-commerce catalog copy at scale — voice-tuned, SEO-optimized,
            QA-sampled. 70% cheaper per SKU than human-only writing, 5x
            faster, and unique per product. Shopify, WooCommerce, Magento,
            BigCommerce, headless.
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
          <ServiceImage name="hero" alt="Three stylized product cards connected to an AI sparkle glyph" priority />
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
    <Section id="what" eyebrow="01" title="What is AI product description writing?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI product description writing is e-commerce catalog copy
            at scale — AI generates the bulk of descriptions from your
            product data, and a human reviewer audits a sample for
            quality, voice, and accuracy. The workflow is purpose-built
            for catalogs of 50 to 5,000+ SKUs.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Pure-human writing is too slow and too expensive at this
            scale. Pure-AI is too risky — voice drift, hallucinated
            features, duplicate phrasing across similar SKUs. The
            voice-tuned + QA-sampled middle path costs 70% less and
            ships 5x faster, without the AI fingerprint.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI product copy = bulk generation from structured product data + human QA on samples. The combination is what makes large catalogs survive Google's quality bar." />
        </Reveal>
      </div>
    </Section>
  );
}

function PlatformsSection() {
  return (
    <Section id="platforms" eyebrow="02" title="Platforms we deliver to" blurb="Direct API write where the platform supports it; CSV import elsewhere. We adapt to your stack — your team doesn't have to.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="platforms" alt="Grid illustration of six e-commerce platforms we deliver product descriptions to" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLATFORMS.map((p) => (
              <li key={p.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{p.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{p.line}</div>
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
    <Section id="process" eyebrow="04" title="How a catalog gets written" blurb="Four stages, scoped to catalog size. Most 500–1000 SKU catalogs ship in 7–14 days.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI product description workflow from catalog ingestion to delivery" className="mb-12 rounded-2xl" />
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
