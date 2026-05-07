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

const SLUG = "eeat-optimization";
const URL = `${site.url}/services/ai-services/${SLUG}`;

const META_TITLE = "E-E-A-T Optimization Services for AI Citations";
const META_DESCRIPTION =
  "E-E-A-T optimization that earns your brand citations from Google AI Overviews, ChatGPT, and Perplexity — Experience, Expertise, Authoritativeness, and Trust signals turned into machine-readable proof.";

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
        alt: "E-E-A-T illustration with four interlocking diamonds for Experience, Expertise, Authority, Trust",
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
    q: "What is E-E-A-T?",
    a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trust — Google's framework for assessing whether content deserves to rank or be cited. It started as a search-quality concept and has become one of the heaviest signals in both classic SEO and AI search. Pages that demonstrate real first-hand experience, named expert authorship, recognized authority, and verifiable trust signals consistently get cited more — by Google, by AI Overviews, and by every major LLM-based engine.",
  },
  {
    q: "Why is E-E-A-T critical for AI citations?",
    a: "AI engines have to choose which sources to lift into a synthesized answer. Without E-E-A-T signals, every page looks like a wall of text claiming things — the engine has no way to tell who wrote it, why they're qualified, or whether to trust the claims. E-E-A-T translates 'we know what we're talking about' from a marketing line into machine-readable proof: an author with a real name and bio, recognized credentials, sameAs links to authoritative profiles, and consistent expertise signals across the site.",
  },
  {
    q: "How is this different from generic 'authority building' SEO work?",
    a: "Generic authority building optimizes for backlinks. E-E-A-T optimization optimizes for the four specific signals AI engines parse: who wrote this (Experience + Expertise), is this domain recognized in the topic (Authority), and can the claims be verified (Trust). Both stack — backlinks still help — but E-E-A-T moves faster on AI surfaces because the engines can read it directly from your pages, not via the slow backlink graph.",
  },
  {
    q: "What does E-E-A-T optimization actually involve?",
    a: "Five buckets of work. (1) Trust audit — what's missing or broken in About / Contact / Privacy / disclosures today. (2) Author-profile work — proper Person schema, named bylines, credentials, sameAs links to LinkedIn / GitHub / Wikipedia / X. (3) Organization-entity work — Organization schema with founders, location, awards, sameAs. (4) Content-level expertise signals — first-hand experience markers, named-source citations, original data, dated updates. (5) Off-page reinforcement — coverage from credible publications, directory listings, dataset contributions where applicable.",
  },
  {
    q: "How long until I see results?",
    a: "Two to ten weeks for first-evidence wins. The on-page work (schema, author bios, About / Trust pages) ships in 2–4 weeks; AI Overviews and Perplexity start picking up the new signals on their next recrawl. Off-page reinforcement takes longer — 8–12 weeks for material movement in citation share. Most engagements track inclusion-share weekly and see meaningful lift inside the first 6 weeks.",
  },
  {
    q: "What if our team doesn't have credentialed experts on staff?",
    a: "Honest answer: it's harder. AI engines (and Google) reward genuine expertise — degrees, certifications, recognized publications, named industry presence. We work with what's there: founder backgrounds, team members' actual track records, customer stories that demonstrate experience. We don't fabricate credentials. If genuine expertise is thin, we focus first on Experience signals (real customer outcomes, dated case studies, original data) which are accessible to every team.",
  },
  {
    q: "Will E-E-A-T optimization help my classic Google rankings?",
    a: "Yes — substantially. E-E-A-T is officially part of Google's quality framework and increasingly weighted in core ranking. Pages with strong E-E-A-T signals also see better Google rankings, better AI Overview inclusion, better Perplexity citations, and better long-cycle LLM brand recognition. It's the work with the broadest payoff across every search surface.",
  },
  {
    q: "How does this fit with GEO and LLMO?",
    a: "E-E-A-T is the credibility layer underneath both. GEO focuses on page structure for live AI engines; LLMO on distributed brand presence for trained-in citations. Both fail without E-E-A-T — engines won't lift content from sources they can't verify. Most engagements run E-E-A-T as the foundation work in month one, then layer GEO + LLMO on top. We sequence them deliberately so each builds on the last.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Trust audit",
    description:
      "Inventory of what's missing or broken in About, Contact, Privacy, disclosures, and other trust-pages — the first thing AI engines check.",
  },
  {
    name: "Author-profile work",
    description:
      "Person schema, named bylines, credential markers, sameAs links to LinkedIn / GitHub / X / Wikipedia — the credibility chain for every author on your site.",
  },
  {
    name: "Organization-entity engineering",
    description:
      "Organization schema with founders, location, awards, sameAs links — the brand entity made machine-readable for AI engine ingestion.",
  },
  {
    name: "Experience signals",
    description:
      "First-hand experience markers in content — dated case studies, original data, customer outcomes, named sources — the kind of detail engines lift cleanly.",
  },
  {
    name: "Off-page reinforcement",
    description:
      "Coverage in credible publications, directory listings, dataset contributions, conference appearances — the offline signals that compound the on-page work.",
  },
  {
    name: "Citation-impact tracking",
    description:
      "Weekly probes against Google AI Overviews, Perplexity, and ChatGPT to track whether citation share is moving — and which signals are doing the lifting.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Trust audit",
    body: "We crawl your site and check the basics: About page exists, named team members, real Contact details, Privacy / Terms / disclosure pages, named-author bylines on every editorial post. Most sites we audit are missing 30–50% of these. The audit produces a fix list that becomes the first sprint.",
  },
  {
    n: "02",
    title: "Author & Organization profiles",
    body: "Every author gets a proper Person schema block, a real bio, credential markers, and sameAs links to LinkedIn, GitHub, X, Wikipedia where applicable. The Organization gets the same treatment — founders linked, location explicit, sameAs to authoritative profiles, awards and recognitions listed where real.",
  },
  {
    n: "03",
    title: "Content-level expertise signals",
    body: "Restructure key content to surface first-hand experience: dated case studies, original data, named-source citations, specific customer outcomes. We don't fabricate — we surface what's already there. Engines lift these signals when picking which sources to cite, and most teams have more of them than they put on the page.",
  },
  {
    n: "04",
    title: "Off-page reinforcement & tracking",
    body: "Coordinate coverage in credible publications, claim directory listings, contribute to relevant datasets / open repos where useful. Then weekly tracking — citation share across Google AI Overviews, Perplexity, and ChatGPT, mapped against the E-E-A-T signals that moved.",
  },
] as const;

const SIGNALS = [
  { name: "First-hand experience", line: "Dated case studies, original data, customer outcomes." },
  { name: "Credentialed expertise", line: "Real degrees, certs, named industry presence — schema-linked." },
  { name: "Awards & recognition", line: "Industry awards, press features, conference talks." },
  { name: "Verified reviews", line: "Reviews on platforms AI engines parse — Google, Trustpilot, G2." },
  { name: "Trust badges", line: "Privacy, security, compliance, payment-processor markers." },
  { name: "sameAs links", line: "Connections to LinkedIn, Wikipedia, GitHub, X — entity verification." },
];

const TOC = [
  { id: "what", label: "What is E-E-A-T" },
  { id: "signals", label: "E-E-A-T signals" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "faq", label: "FAQs" },
] as const;

export default function EeatPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "E-E-A-T Optimization",
          description:
            "Experience, Expertise, Authoritativeness, Trust — turned into machine-readable proof for AI engines and Google's quality framework.",
          url: URL,
          serviceType: "E-E-A-T Optimization",
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
          { name: "E-E-A-T Optimization", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <SignalsSection />
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
            <span className="text-white">E-E-A-T Optimization</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · E-E-A-T Optimization
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Earn the citation.{" "}
            <span className="text-[var(--accent)]">Don&apos;t just claim it.</span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Experience, Expertise, Authoritativeness, Trust — translated
            from a marketing line into machine-readable proof. The
            credibility layer underneath every AI search surface — without
            which GEO and LLMO never compound.
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
            alt="E-E-A-T illustration with four interlocking diamonds for Experience, Expertise, Authority, Trust"
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
    <Section id="what" eyebrow="01" title="What is E-E-A-T?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            E-E-A-T stands for Experience, Expertise, Authoritativeness,
            and Trust — Google&apos;s quality framework for deciding whether
            content deserves to rank or be cited. It started as a search
            concept; today it&apos;s arguably the heaviest signal in both
            classic SEO and AI search.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            Every AI engine has to pick a small set of sources to synthesize
            an answer from. Without explicit E-E-A-T signals on your pages,
            engines have no way to assess whether to trust your content
            — so they pick someone else&apos;s. Our job is to translate the
            credibility you already have into the structured signals
            engines can read.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="E-E-A-T = the credibility layer. Schema, author profiles, off-page signals — the proof layer that lets AI engines pick your content with confidence."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function SignalsSection() {
  return (
    <Section
      id="signals"
      eyebrow="02"
      title="The signals AI engines actually parse"
      blurb="Six concrete on-page and off-page signals that map to the four E-E-A-T pillars. Most sites have 1–2 of these; we typically add 4–6 over a 6–8 week sprint."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="signals"
            alt="Grid illustration of six E-E-A-T credibility signals — experience, expertise, awards, reviews, trust badges, sameAs links"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIGNALS.map((s) => (
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
    <Section id="process" eyebrow="04" title="How we run an E-E-A-T engagement" blurb="Four stages over 6–10 weeks. The on-page foundation in month one; off-page reinforcement and tracking from month two onward.">
      <Reveal>
        <ServiceImage name="process" alt="Diagram of the four-stage E-E-A-T optimization process from audit to credibility tracking" className="mb-12 rounded-2xl" />
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
