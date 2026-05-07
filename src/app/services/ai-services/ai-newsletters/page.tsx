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

const SLUG = "ai-newsletters";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "AI Newsletter Writing Services · Weekly Sends Without Burnout";
const META_DESCRIPTION =
  "AI-assisted newsletter production — theme curation, drafting, editorial polish, and scheduled send. Hit weekly without writer burnout, on every major email platform.";

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
        alt: "Email newsletter layout illustration with three article blocks and an AI sparkle glyph",
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
    q: "What is AI newsletter writing?",
    a: "AI newsletter writing is recurring email production where AI handles the heavy lifting (source curation, first drafts, format variations) and a human editor owns voice, sequencing, and final QA. Done right, you ship weekly or twice-weekly without the writer burnout that kills most newsletter programs by month four.",
  },
  {
    q: "Why does AI fit newsletters specifically?",
    a: "Newsletters need volume, consistency, and freshness — exactly the workflow AI is good at. The repetitive parts (curating relevant links, summarizing recent posts, drafting recurring sections) are AI-friendly. The differentiating parts (voice, opinion, original takes) stay human. Same speed advantage as AI blog writing, with a tighter editorial cadence.",
  },
  {
    q: "Will my readers notice it's AI-assisted?",
    a: "If we do it right, no. The AI draft is raw material — your editor (or ours) reads every line, kills mechanical phrasing, adds opinion, fact-checks, brings in first-hand observations. The published newsletter reads exactly like a real human wrote it. Most clients hear from readers complimenting the voice, not asking 'is this AI?'.",
  },
  {
    q: "What sends do you handle?",
    a: "Six common formats. Curation digests (10–15 links a week with one-line takes). Deep-dive essays (one long-form per send). Case-study sends (customer outcomes). Weekly recaps. Quarterly data reports. And announcement / launch newsletters. We start with one format, layer in a second after month two if it makes sense.",
  },
  {
    q: "How long until you can take over my newsletter?",
    a: "Two to three weeks of onboarding. Week 1 we ingest your past sends, build a voice profile, and set up the workflow. Week 2 we ship the first send under heavy editorial review. Week 3 onward we move to standard cadence. Most clients are sending without us touching every word by month two.",
  },
  {
    q: "Which email platforms do you work with?",
    a: "All the major ones — Mailchimp, Klaviyo, ConvertKit / Kit, Beehiiv, Substack, Iterable, ActiveCampaign, Customer.io, plus enterprise tools like Marketo and HubSpot. We deliver final HTML or work directly inside your platform; whichever your team prefers.",
  },
  {
    q: "Can you grow my list, not just write the newsletter?",
    a: "Different service, but yes — list growth is part of our digital marketing engagement (paid social for subscribers, content-led growth, referral mechanics). We can scope both together if you want a complete newsletter growth + production engagement.",
  },
  {
    q: "Pricing?",
    a: "Per-send or monthly retainer. Per-send pricing scoped by length and research depth (a 1500-word essay costs more than a 400-word digest). Retainers cover 4–8 sends a month plus voice tuning and platform setup. Quote sent after a 30-minute scoping call.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Theme & source curation",
    description:
      "Each send gets a clear angle and the right mix of original commentary plus curated sources — pulled from feeds we tune to your audience.",
  },
  {
    name: "AI-drafted body",
    description:
      "First draft generated against your voice profile and the curated sources. Section-by-section structure, opinion placeholders the editor fills in.",
  },
  {
    name: "Editorial polish",
    description:
      "A human editor reads every line. Voice tuned, opinions sharpened, facts checked, anything mechanical rewritten. The polish layer is the difference.",
  },
  {
    name: "Subject line + preview text",
    description:
      "Three to five subject-line variants per send, with predicted CTR commentary. You pick or A/B test on send.",
  },
  {
    name: "Platform delivery",
    description:
      "Final HTML or direct platform setup (Mailchimp, Klaviyo, Beehiiv, Substack, Kit, Iterable, etc) — whichever fits your stack.",
  },
  {
    name: "Performance review",
    description:
      "Monthly readout of opens, clicks, replies, unsubscribes — with one-page recommendations for what to keep, what to change.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Theme & source curation",
    body: "Each send starts with a clear angle and a curated source list. We monitor industry feeds, your competitors, recent customer interactions, and AI-engine prompt logs to surface the threads worth pulling on this week. Curation takes 30 minutes; it saves hours later.",
  },
  {
    n: "02",
    title: "AI drafting",
    body: "AI generates the first draft against your voice profile and the curated angle. Structure, transitions, source summaries — the parts AI is good at. Drafts run 60–80% of the way to published; the editor finishes the last 20–40%.",
  },
  {
    n: "03",
    title: "Editorial polish",
    body: "An editor reads every line. Mechanical phrasing rewritten. Opinions sharpened. Facts checked. First-hand observations added. The send goes out only after the editor signs off — never auto-published from an AI draft.",
  },
  {
    n: "04",
    title: "Schedule & send",
    body: "Subject-line variants written, preview text optimized, send-time scheduled per your audience's open patterns. You can review the final HTML before it goes out — or trust the workflow once it's running. Most clients hand off review by month two.",
  },
] as const;

const FORMATS = [
  { name: "Curation digest", line: "10–15 links a week with one-line takes. High-frequency, low-effort." },
  { name: "Deep-dive essay", line: "One long-form (1200–2000 words) per send. Higher engagement, slower cadence." },
  { name: "Case study", line: "Customer-outcome story. Sales enablement + brand authority in one send." },
  { name: "Weekly recap", line: "Roundup of your own published content + relevant industry news." },
  { name: "Data report", line: "Original survey or benchmark data. Quarterly cadence works best." },
  { name: "Announcements", line: "Launches, hires, milestones. Sparingly used; high open rates." },
];

const TOC = [
  { id: "what", label: "What is AI newsletter writing" },
  { id: "formats", label: "Formats we handle" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function AiNewslettersPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "AI Newsletter Writing",
          description:
            "AI-assisted newsletter production with editorial polish — curation, drafting, voice tuning, send scheduling. Weekly sends without writer burnout.",
          url: URL,
          serviceType: "AI Newsletter Writing",
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
          { name: "AI Newsletters", url: URL },
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
            <span className="text-white">AI Newsletters</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · AI Newsletter Writing
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Send weekly.{" "}
            <span className="text-[var(--accent)]">Without writer burnout.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Theme curation, AI drafting, editorial polish, scheduled send.
            Weekly or twice-weekly cadence on Mailchimp, Klaviyo, Beehiiv,
            Substack, Kit — wherever your list lives. Your voice. AI&apos;s pace.
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
          <ServiceImage name="hero" alt="Email newsletter layout illustration with three article blocks and an AI sparkle glyph" priority />
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
    <Section id="what" eyebrow="01" title="What is AI newsletter writing?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            AI newsletter writing is recurring email production where AI
            handles curation and drafting and a human editor owns voice,
            opinion, and final polish. The mix lets you ship weekly
            without the burnout that kills most newsletter programs by
            month four.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Newsletters specifically benefit from AI assistance because
            the work is repetitive (curating links, summarizing posts,
            drafting recurring sections) and time-sensitive (you can&apos;t
            skip a send). The differentiating parts — voice, opinion,
            original takes — stay human. Best of both.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout label="Quick definition" body="AI newsletters = repeatable curation + drafting in AI's lane, voice + opinion + polish in human's lane. Weekly cadence becomes sustainable." />
        </Reveal>
      </div>
    </Section>
  );
}

function FormatsSection() {
  return (
    <Section id="formats" eyebrow="02" title="Six newsletter formats we handle" blurb="Most clients run one or two formats. Each has a different cadence, length, and engagement profile.">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage name="formats" alt="Grid illustration of six newsletter formats — curation digest, essay, case study, recap, data report, announcements" />
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
    <Section id="process" eyebrow="04" title="How a send gets made" blurb="Same four-stage workflow every send. Reproducibility is what makes the cadence sustainable.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage AI newsletter process from curation to scheduled send" className="mb-12 rounded-2xl" />
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
