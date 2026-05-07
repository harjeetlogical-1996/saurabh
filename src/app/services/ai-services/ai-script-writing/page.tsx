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

const SLUG = "ai-script-writing";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Script Writing for YouTube, Podcasts, Reels & Ads";
const META_DESCRIPTION =
  "AI script writing for video and audio — long-form YouTube, Reels & Shorts, podcasts, explainers, ad scripts, and webinars. Briefed in, hook-led drafts out, human-edited before delivery.";

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
        alt: "Stylized script document with scene markers, columns, and timestamp pins",
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
    q: "What is AI script writing?",
    a: "AI script writing is video and audio script production where AI does the structural drafting (hook, beats, transitions, CTA) and a human editor owns voice, pacing, and the final read. The output is a shoot-ready script — timestamps, B-roll cues, on-screen text suggestions — not a generic AI-style essay broken into lines.",
  },
  {
    q: "Why does video specifically need a different process from blog writing?",
    a: "Two reasons. First, hook discipline — videos die in the first 5–8 seconds without a strong opening, so the script literally cannot afford a slow setup. Second, pacing for spoken delivery — sentences that read fine on a page sound flat read aloud. We build both into the AI prompts and the human edit pass.",
  },
  {
    q: "What formats do you write for?",
    a: "Six common ones. Long-form YouTube (8–25 min) — strongest hook + retention beats. Reels & Shorts (30s–90s) — vertical, fast-cut, pattern-interrupt heavy. Podcasts — conversational, interview, or solo formats. Explainers and tutorials — scripted educational content. Ad scripts — paid creative for Meta, YouTube, TikTok ads. Webinars and presentations — long-form structured sessions.",
  },
  {
    q: "Will the script work for someone reading on camera, not a voiceover artist?",
    a: "Yes — and we calibrate to the speaker. If you're reading the script yourself (founder, in-house host), we tune it to your natural cadence and avoid phrases you don't normally use. If a pro voiceover is reading, we can write tighter and more polished. Either way the script is meant to be read out loud, not parsed silently.",
  },
  {
    q: "How long does each script take?",
    a: "Reels & Shorts ship in 24–48 hours. Long-form YouTube scripts (8–25 min) in 3–5 days. Podcasts in 4–7 days depending on format. Ad scripts (variant packs) in 24–48 hours. The bottleneck is usually research and angle development, not the writing itself.",
  },
  {
    q: "Do you handle B-roll and visual notes?",
    a: "Yes — every script includes B-roll cues, on-screen text suggestions, scene-change markers, and timestamp blocks. Your editor can build the full edit timeline directly from the script without back-and-forth on what should appear when.",
  },
  {
    q: "Can you script for ad campaigns at variant scale?",
    a: "Yes — that's actually one of the highest-leverage AI script use cases. Meta and YouTube ads need 8–15 script variants per campaign for proper testing. We generate variants quickly (each with a different hook + angle), human-polish the strongest, and deliver A/B-ready packs in 48 hours.",
  },
  {
    q: "What if I have a unique brand voice or specific audience?",
    a: "Voice tuning is part of the engagement. We ingest 5–10 of your existing best-performing videos / podcasts (transcripts), distill voice patterns, and bake them into the script generation. Sample QA on each script catches anything that drifts off-voice. Most clients say their team can't tell which sections were AI-drafted vs human-drafted in the final read.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Hook-led structure",
    description:
      "Every script opens with a tested hook pattern — pattern interrupt, curiosity gap, contrarian claim, or social-proof anchor. The first 5–8 seconds are designed for retention.",
  },
  {
    name: "Beat-by-beat outline",
    description:
      "Outline written before any drafting — beats, transitions, CTA placement, retention checkpoints. You sign off on the outline before the script gets generated.",
  },
  {
    name: "AI-assisted drafting",
    description:
      "AI fills in the outline against your voice profile. Hook, body, transitions, and CTA in your tone. Drafts run 60–80% of the way to read-ready; the editor finishes it.",
  },
  {
    name: "Human edit pass",
    description:
      "An editor reads every line, tunes pacing for spoken delivery, kills mechanical phrasing, sharpens the hook, and adds B-roll cues. The polish is where the script becomes shoot-ready.",
  },
  {
    name: "B-roll + visual cues",
    description:
      "Every script ships with B-roll suggestions, on-screen text, scene-change markers, and timestamp blocks — your editor builds the timeline straight from the doc.",
  },
  {
    name: "Variant packs (for ads)",
    description:
      "8–15 script variants per ad campaign with different hooks and angles, A/B-ready. Strongest variants polished; the rest delivered as raw options for testing.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Brief & angle",
    body: "30-minute scoping call locks the audience, the goal of the video, the hook angle, and the format constraints. Output is a one-page brief — angle, audience pain, intended outcome, run time. Every script question that comes later traces back to this page.",
  },
  {
    n: "02",
    title: "Beat outline",
    body: "Beats first, words second. We sketch the script as 6–12 beats — hook, problem setup, key points, transitions, CTA — with rough time allocations. You sign off on the outline before any AI drafting. This is where most failed scripts get fixed cheaply.",
  },
  {
    n: "03",
    title: "AI-assisted draft",
    body: "AI fills in the outline against your voice profile. Hook crafted in 3 variants for testing. Body written for spoken delivery, not page reading. Transitions and CTA tuned to format (long-form vs Reels vs ad). Draft is raw material — never shipped without polish.",
  },
  {
    n: "04",
    title: "Human edit + visual cues",
    body: "An editor reads every line out loud. Pacing tuned for spoken delivery. Mechanical phrasing rewritten. Hook sharpened or swapped. B-roll cues, on-screen text, scene markers, timestamps added. The output is a shoot-ready script your editor can build the timeline from.",
  },
] as const;

const FORMATS = [
  { name: "Long-form YouTube", line: "8–25 minute videos. Hook + retention beats + CTA — built for YouTube's algo." },
  { name: "Reels & Shorts", line: "30s–90s vertical. Pattern-interrupt heavy. Three hook variants per script." },
  { name: "Podcasts", line: "Solo, interview, or duo formats. Conversational pacing, segment markers." },
  { name: "Explainers / tutorials", line: "Scripted educational content. Step-numbered, B-roll-heavy." },
  { name: "Ad scripts", line: "Meta / YouTube / TikTok ads. Variant packs of 8–15 for testing." },
  { name: "Webinars", line: "Long-form structured sessions. Slide-aligned, segment-timed." },
];

const TOC = [
  { id: "what", label: "What is AI script writing" },
  { id: "formats", label: "Formats" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiScriptWritingPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Script Writing",
          description:
            "Hook-led video and audio scripts — long-form YouTube, Reels & Shorts, podcasts, ad scripts, webinars. AI drafted, human edited, shoot-ready with B-roll cues.",
          url: URL,
          serviceType: "AI Script Writing",
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
          { name: "AI Script Writing", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <FormatsSection />
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
            <span className="text-white">AI Script Writing</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Script Writing
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Scripts that hook in 5 seconds.{" "}
            <span className="text-[var(--accent)]">Built for the algo.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Long-form YouTube, Reels & Shorts, podcasts, explainers, ad
            scripts, webinars. AI handles structural drafting; an editor
            tunes voice, pacing, and the read. Output is shoot-ready —
            B-roll cues, on-screen text, scene markers included.
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
          <ServiceImage name="hero" alt="Stylized script document with scene markers, columns, and timestamp pins" priority />
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
    <Section id="what" eyebrow="01" title="What is AI script writing?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI script writing is video and audio script production where
            AI handles the structural drafting (hook, beats, transitions,
            CTA) and a human editor owns voice, pacing, and the final
            read. The output is a shoot-ready script — not a generic
            AI essay broken into lines.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Video needs a different process from blog writing. The first
            5–8 seconds decide whether a viewer stays. Sentences that
            read fine on a page sound flat read aloud. The AI prompts
            and the human edit pass both account for those differences.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI script writing = hook-led structure from AI + spoken-delivery edit from a human. Shoot-ready output, not a Word doc." />
        </Reveal>
      </div>
    </Section>
  );
}

function FormatsSection() {
  return (
    <Section id="formats" eyebrow="02" title="Formats we write for" blurb="Six formats. Each has different hook patterns, pacing rules, and CTA placement — we calibrate per format, not one-size-fits-all.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="formats" alt="Grid illustration of six script formats — long-form video, Reels/Shorts, podcast, explainer, ad, webinar" />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FORMATS.map((f) => (
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
    <Section id="process" eyebrow="04" title="How a script gets made" blurb="Same four-stage process every time. Beat outline before drafting saves the most time.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI script writing process" className="mb-12 rounded-2xl" />
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
