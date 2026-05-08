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

const SLUG = "ai-content-repurposing";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Content Repurposing · Turn 1 Video Into 10+ Posts";
const META_DESCRIPTION =
  "AI content repurposing — one long-form asset becomes a blog post, Twitter thread, LinkedIn post, carousel, Reels, and newsletter. Editorial polish before every publish, scheduled across channels.";

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
        alt: "One source video radiating outward into blog, tweets, Reels, and carousel output cards",
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
    q: "What is AI content repurposing?",
    a: "Content repurposing is taking one long-form asset — a video, podcast, webinar, long blog post — and turning it into multiple distribution-channel-specific pieces: blog post, Twitter / X thread, LinkedIn post, Instagram carousel, Reels / Shorts, newsletter. AI does the heavy structural lifting (transcripts, outlines, draft variations), and editors polish each piece for the channel it's going to.",
  },
  {
    q: "Why is this worth doing?",
    a: "Most content ROI is left on the table because the original asset only ships in one format. A 30-minute podcast contains 6–10 LinkedIn posts, 4 Twitter threads, 2 Instagram carousels, and a blog post worth of substance. Repurposing surfaces all of it without filming or writing anything new — same creative cost, 5–10x the audience touchpoints.",
  },
  {
    q: "What inputs do you need?",
    a: "The original asset. A video file or YouTube link, a podcast audio file or RSS feed, a webinar recording, or a long-form blog post. We do the transcription / outline extraction. The richer the source (clear audio, structured topic), the more output formats we can pull cleanly.",
  },
  {
    q: "How many pieces of content from one source?",
    a: "Typical: one 30-minute podcast or YouTube video produces 1 blog post (1500–2500 words), 2 Twitter / X threads, 3–5 LinkedIn posts, 1–2 Instagram carousels, 4–8 Reels / Shorts scripts, and 1 newsletter send. Smaller sources scale down proportionally; we scope per asset.",
  },
  {
    q: "Will the outputs feel native to each channel?",
    a: "Yes — that's the differentiation. Pure-AI repurposing produces text that's technically on-topic but tonally off for each channel (a LinkedIn post that sounds like a blog post, an Instagram carousel that reads like a newsletter). Our editor reviews every channel-specific piece, tunes voice, and adjusts format. Twitter threads have hooks and tension; LinkedIn posts have point-of-view; carousels have visual rhythm.",
  },
  {
    q: "Can you also publish, or just produce?",
    a: "Both. Production-only is fine — we deliver every piece organized by channel for your team to schedule. Publishing-included means we schedule across channels (Buffer, Hypefury, Hootsuite, native Meta / LinkedIn / X) and handle the cadence. Most clients add publishing after the first month to recover the time savings end-to-end.",
  },
  {
    q: "How fast is the turnaround?",
    a: "A 30-minute podcast or video shipped as a full repurposing pack (blog + threads + LinkedIn + carousel + Reels scripts + newsletter) takes 4–7 business days. Smaller sources turn around in 2–4 days. Bulk back-catalog projects (10+ legacy podcasts at once) are scoped separately.",
  },
  {
    q: "What's the pricing?",
    a: "Per-asset or monthly retainer. Per-asset pricing scoped by the source length and how many output formats you want. Retainers cover ongoing repurposing of a recurring podcast / YouTube show — typically 2–4 sources a month with full output packs. Quote sent after a 30-minute scoping call.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Source ingestion + transcription",
    description:
      "Video, podcast, webinar, or long-form post. We handle transcription, timestamping, and topic extraction — input is whatever format you have.",
  },
  {
    name: "Multi-format output packs",
    description:
      "Blog post, Twitter / X threads, LinkedIn posts, Instagram carousels, Reels / Shorts scripts, newsletter sends — each tuned to the channel.",
  },
  {
    name: "Channel-native editing",
    description:
      "Twitter threads get hooks and tension. LinkedIn posts get a point of view. Carousels get visual rhythm. Reels get pattern interrupts. The polish is what makes them work.",
  },
  {
    name: "B-roll & visual cues",
    description:
      "Reels / Shorts scripts ship with B-roll suggestions and on-screen text. Carousels ship with slide-by-slide layouts ready for design.",
  },
  {
    name: "Optional scheduling + publishing",
    description:
      "We schedule across channels (Buffer, Hypefury, native Meta / LinkedIn / X) and handle the cadence. Production-only is fine too.",
  },
  {
    name: "Performance reporting",
    description:
      "Monthly readout of which repurposed pieces drove the most reach / engagement, so we can double down on the formats that work for your audience.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Source ingestion",
    body: "You send us the original — video file or YouTube link, podcast audio or RSS, webinar recording, long blog post. We handle the transcription with timestamps. For audio / video, the transcription is the foundation everything downstream pulls from.",
  },
  {
    n: "02",
    title: "Outline extraction",
    body: "We map the source into its component ideas — main argument, sub-points, anecdotes, data, quotable lines, surprising claims. This becomes a 'content menu' — every output format pulls from this menu, so the same idea can show up phrased differently across channels without feeling repetitive.",
  },
  {
    n: "03",
    title: "AI multi-format generation",
    body: "Each output format gets generated against its own channel-specific prompt. Twitter threads get hook patterns; LinkedIn posts get point-of-view structure; carousels get slide rhythm; Reels scripts get pattern-interrupt openings. AI does the structural draft; voice profile bakes in your brand tone.",
  },
  {
    n: "04",
    title: "Editorial polish + ship",
    body: "An editor reads every piece. Voice tuned. Hooks sharpened. Channel-specific quirks fixed. Then output is delivered organized by channel — or scheduled across platforms if publishing is in scope. You see every piece before it goes live.",
  },
] as const;

const OUTPUTS = [
  { name: "Blog post (1500–2500w)", line: "SEO-optimized long-form pulled from the source's main argument." },
  { name: "Twitter / X thread", line: "Hook → tension → payoff structure. 8–15 tweets per thread." },
  { name: "LinkedIn post", line: "POV-led, line-broken for skim, hook in first 3 lines." },
  { name: "Instagram carousel", line: "Slide-by-slide layout. Hook slide, value slides, CTA slide." },
  { name: "Reels / Shorts script", line: "B-roll cues, on-screen text, hook in first 3 seconds." },
  { name: "Newsletter send", line: "Curated angle from the source, sent to your email list." },
];

const TOC = [
  { id: "what", label: "What is repurposing" },
  { id: "outputs", label: "Output formats" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiRepurposingPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Content Repurposing",
          description:
            "One long-form asset turned into blog, Twitter / X thread, LinkedIn, Instagram carousel, Reels, and newsletter — channel-native and editor-polished.",
          url: URL,
          serviceType: "AI Content Repurposing",
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
          { name: "AI Content Repurposing", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <OutputsSection />
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
            <span className="text-white">AI Content Repurposing</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Content Repurposing
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            One podcast.{" "}
            <span className="text-[var(--accent)]">Ten posts.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Turn one long-form asset into blog, Twitter / X thread, LinkedIn,
            Instagram carousel, Reels, and newsletter — each channel-native
            and editor-polished. Same creative cost, 5–10x the audience
            touchpoints.
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
          <ServiceImage name="hero" alt="One source video radiating outward into blog, tweets, Reels, and carousel output cards" priority />
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
    <Section id="what" eyebrow="01" title="What is AI content repurposing?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Content repurposing is taking one long-form asset — a video,
            podcast, webinar, or long blog — and turning it into multiple
            distribution-channel-specific pieces. AI handles the structural
            lifting; an editor polishes each piece for the channel
            it&apos;s going to.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Most content ROI gets left on the table because the original
            asset only ships in one format. A 30-minute podcast quietly
            contains 6–10 LinkedIn posts, 4 Twitter threads, 2 carousels,
            and a blog post worth of substance. Repurposing pulls all of
            it out.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="Repurposing = one asset, many channel-native formats. Same creative cost, 5–10x the audience touchpoints." />
        </Reveal>
      </div>
    </Section>
  );
}

function OutputsSection() {
  return (
    <Section id="outputs" eyebrow="02" title="What we ship from one source" blurb="Six channel formats we routinely pull from a single long-form asset. Smaller sources scale down; larger sources scale up.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="outputs" alt="Grid illustration of six output formats — blog, Twitter thread, LinkedIn, carousel, Reels, newsletter" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OUTPUTS.map((o) => (
              <li key={o.name} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors">
                <div className="text-[14px] font-medium text-white">{o.name}</div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">{o.line}</div>
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
    <Section id="process" eyebrow="04" title="How a repurposing pack runs" blurb="Four stages, 4–7 business days for a 30-minute source. Faster for shorter sources, scoped for back-catalog projects.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI content repurposing process" className="mb-12 rounded-2xl" />
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
