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

const SLUG = "ai-image-generation";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Image Generation Services · Midjourney, DALL-E, Flux";
const META_DESCRIPTION =
  "AI image generation across Midjourney, DALL-E, Flux, Imagen, and Stable Diffusion — brand-tuned prompts, art-director curation, A/B-ready variants, commercial-use licensing.";

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
        alt: "AI image canvas surrounded by abstract output-style badges",
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
    q: "What is AI image generation?",
    a: "AI image generation is producing original imagery from text prompts via models like Midjourney, DALL-E 3, Flux, Imagen, and Stable Diffusion. The model creates each image fresh — no stock licensing, no Unsplash hunt, no shoot day. We pair this with art-direction discipline so the output isn't just 'generated' but actually on-brand and usable.",
  },
  {
    q: "Will my AI images look generic?",
    a: "If you prompt naively, yes. The reason every brand's AI imagery looks the same is everyone uses default prompts and ships the first variant. Our process avoids that with three layers: brand-specific style prompts, multi-variant generation per asset (10–25 each), and art-director curation that filters out generic outputs before delivery. Most clients can't tell their final images were AI-generated unless they're told.",
  },
  {
    q: "Can I use these images commercially?",
    a: "Yes — under the licensing terms of each model. Midjourney standard plan and above, DALL-E 3 via API, Flux Pro, and Stable Diffusion all permit commercial use of generated images. We use the right license per project and pass the rights to you. We don't generate images that depict real public figures or copyrighted IP without explicit reference rights.",
  },
  {
    q: "Which models do you use, and when?",
    a: "Midjourney for stylized illustration, conceptual, and editorial imagery (best aesthetic). DALL-E 3 for clean stock-photo replacements and product mockups. Flux for photorealism and faces. Imagen for text-in-image. Stable Diffusion + custom LoRAs for brand-specific style training. We pick per asset based on what each model is genuinely best at — not one-model-fits-all.",
  },
  {
    q: "How is this different from using ChatGPT to make images?",
    a: "ChatGPT (DALL-E 3 wrapped) is one model with consumer-grade prompting. Our process spans 5 models, uses production-grade prompt engineering tuned per brand, generates multiple variants per asset, and includes a human curation pass. Same speed advantage; the output looks intentional instead of randomly generated.",
  },
  {
    q: "What asset types do you generate?",
    a: "Hero illustrations, blog post featured images, social media graphics, ad creative, product mockups, marketing one-pagers, brand patterns, abstract backgrounds, conceptual editorial imagery, brand-aware stock photo replacements. Anything that's normally a stock-photo search becomes a fresh generation.",
  },
  {
    q: "What's the turnaround?",
    a: "A single asset (one image with 10–15 variants narrowed to 3 final) ships in 24–48 hours. Bulk projects (e.g. 50 blog featured images, 100 social graphics) run in parallel — typically 5–10 days for a full pack. Faster turnarounds available for time-sensitive campaigns.",
  },
  {
    q: "Pricing?",
    a: "Per-asset or monthly retainer. Per-asset for small batches (one-time hero illustrations, campaign creative). Retainers cover ongoing image needs across blogs, ads, social — most cost-effective for clients who publish 10+ assets a month. Quote sent after a 30-minute scoping call.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Brand-tuned prompts",
    description:
      "Prompts engineered around your specific style — color palette, mood, composition, level of stylization. The same brief produces different images for different brands.",
  },
  {
    name: "Multi-model coverage",
    description:
      "Midjourney for aesthetic, DALL-E for clean utility, Flux for photorealism, Imagen for text-in-image, SD for custom-trained. Right model per asset.",
  },
  {
    name: "Variant generation",
    description:
      "10–25 variants per asset before any curation. Volume + variety is what filters out generic outputs at scale.",
  },
  {
    name: "Art-director curation",
    description:
      "Strongest 3–5 selected, lightly retouched if needed (color tweaks, crops, composition fixes), and prepared for delivery.",
  },
  {
    name: "Commercial-use licensing",
    description:
      "We use models on plans that permit commercial use and pass the rights to you. Documented per project.",
  },
  {
    name: "Optional brand style training",
    description:
      "For clients with strong visual identity, we can train a custom Stable Diffusion LoRA on your brand. Future generations match exactly.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief & art direction",
    body: "30-minute scoping call captures the asset, the brand style anchors, the mood, and the medium (illustration, photo, mockup, abstract). We write a one-page brief with reference images you've pulled from your own visual identity. The brief is what translates into prompts.",
  },
  {
    n: "02",
    title: "Multi-model generation",
    body: "Each asset generates 10–25 variants across the right model(s) for the brief. Stylized work runs through Midjourney; photoreal work runs through Flux; clean utility work runs through DALL-E 3. Output is raw — never shipped without curation.",
  },
  {
    n: "03",
    title: "Art-director curation",
    body: "An art director reviews every variant. Strongest 3–5 selected. Each gets light retouching where needed — color tweaks, crops, composition adjustments, generative fill for borders. The curation step is what separates 'AI generated' from 'on-brand'.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "Final images delivered in your preferred format — PNG / JPEG / WebP at multiple resolutions, plus the upscaled originals. Optional alt-text suggestions and per-image SEO file naming. Commercial-use licensing documented per asset.",
  },
] as const;

const MODELS = [
  { name: "Midjourney v6+", line: "Stylized illustration, editorial, conceptual. Highest aesthetic ceiling." },
  { name: "DALL-E 3", line: "Clean utility imagery, stock replacements, simple compositions." },
  { name: "Flux Pro", line: "Photoreal output, faces, complex scenes. Faster than MJ for realism." },
  { name: "Imagen", line: "Text inside images (signs, captions, UI mockups). Strongest at typography." },
  { name: "Stable Diffusion + LoRA", line: "Custom brand style training. Pixel-perfect consistency at scale." },
  { name: "Nano Banana / Gemini Image", line: "Best for marketing-friendly stylized illustrations at low cost." },
];

const TOC = [
  { id: "what", label: "What is AI image gen" },
  { id: "models", label: "Models we use" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiImageGenPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Image Generation",
          description:
            "AI image generation across Midjourney, DALL-E 3, Flux, Imagen, and Stable Diffusion. Brand-tuned, art-director-curated, commercial-use licensed.",
          url: URL,
          serviceType: "AI Image Generation",
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
          { name: "AI Image Generation", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <ModelsSection />
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
            <span className="text-white">AI Image Generation</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Image Generation
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            On-brand.{" "}
            <span className="text-[var(--accent)]">Not just generated.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Brand-tuned prompts across Midjourney, DALL-E 3, Flux, Imagen,
            and Stable Diffusion. 10–25 variants per asset, art-director
            curated, commercial-use licensed. Stock photos and shoot days
            replaced.
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
          <ServiceImage name="hero" alt="AI image canvas surrounded by abstract output-style badges" priority />
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
    <Section id="what" eyebrow="01" title="What is AI image generation?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI image generation produces original imagery from text prompts
            via models like Midjourney, DALL-E 3, Flux, Imagen, and Stable
            Diffusion. The model creates each image fresh — no stock
            licensing, no Unsplash hunt, no shoot day.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            The reason every brand&apos;s AI imagery looks the same is
            everyone uses default prompts and ships the first variant. We
            avoid that with brand-specific style prompts, multi-variant
            generation per asset, and art-director curation. Output looks
            intentional — not randomly generated.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI image gen + art direction = on-brand imagery at AI speed. Without the curation, you ship the same images as everyone else." />
        </Reveal>
      </div>
    </Section>
  );
}

function ModelsSection() {
  return (
    <Section id="models" eyebrow="02" title="Six models we use" blurb="Each model is genuinely best at something different. We pick per asset, not one-model-fits-all.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="models" alt="Grid illustration of six AI image model families we use" />
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
    <Section id="process" eyebrow="04" title="How a generation runs" blurb="Four stages, 24–48 hour turnaround for a single asset. Bulk packs in 5–10 days.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI image generation process" className="mb-12 rounded-2xl" />
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
