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

const SLUG = "ui-ux-design";
const URL = `${site.url}/services/website-development/${SLUG}`;

// Layout's template appends " · Saurabh Bhayana", so keep this suffix-free.
const META_TITLE = "UI/UX Design Services for Web & Mobile Apps";
const META_DESCRIPTION =
  "UI/UX design services that start with research and end with shipped, tested, accessible product screens — wireframes, flows, prototypes, design systems, and usability testing in one engagement.";

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
        alt: "UI screen surrounded by user flow, heatmap, and persona artifacts",
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
    q: "What is UI/UX design?",
    a: "UI design is what the screen looks like — buttons, type, spacing, color, motion. UX design is how the product feels to use — flows, friction, decisions a user has to make to get what they came for. Strong product design needs both: a beautiful UI on top of a broken UX is just a polished frustration, and a thoughtful UX rendered with sloppy UI loses trust before anyone even reads the copy.",
  },
  {
    q: "What's the difference between UI/UX design and visual design?",
    a: "Visual design covers the surface — color systems, typography, illustration, motion. UI design is visual design applied specifically to a product interface. UX design sits underneath both: it's the structural decisions about flows, hierarchy, and interaction that the visuals are dressing up. Most projects need all three, run together by a single team so they don't drift apart.",
  },
  {
    q: "Do you do UX research as part of the engagement?",
    a: "Yes — we run lightweight research at the start of every project: a stakeholder interview, a teardown of how your existing product is being used (if there is one), and 3–5 short user calls when the audience is reachable. We don't run six-month research programs unless the project demands it; for most product teams, focused research at the right moments beats exhaustive research that nobody reads.",
  },
  {
    q: "How long does a UI/UX project take?",
    a: "A typical end-to-end engagement — research, flows, wireframes, visual design, prototype — lands in 4 to 7 weeks for a focused product surface (e.g. an onboarding flow, a dashboard, a checkout). Larger product redesigns with multiple modules sit in the 8 to 14 week range. We share a week-by-week plan before the kickoff so you know exactly when each artifact is due.",
  },
  {
    q: "What deliverables do I receive?",
    a: "Personas (when research supports them), end-to-end user flows, low-fi wireframes, a clickable Figma prototype, full visual UI across responsive breakpoints, a typed design system, and a written handoff doc. If usability testing is in scope, you also get a short readout with the top three friction points and the design changes we recommend in response.",
  },
  {
    q: "Do you design for accessibility (WCAG)?",
    a: "Accessibility is part of the brief, not an add-on. We design with WCAG 2.2 AA targets — color contrast, focus states, keyboard interaction, screen-reader landmarks, motion-reduction support — baked in from the wireframe stage so engineering doesn't have to retrofit them in QA. Stricter targets (AAA, sector-specific compliance) are scoped at the start.",
  },
  {
    q: "Will I get the editable Figma files?",
    a: "Yes. You own the Figma file, the design system library, and every asset we produce. We hand them over with naming conventions, organized layers, and a short Loom walkthrough so your team or your developer can pick up exactly where we left off without a single Slack thread asking 'where's the spec?'.",
  },
  {
    q: "Can you redesign an existing product without breaking what works?",
    a: "That's most of what we do. We start by mapping the parts of the current product that are pulling weight in your data — the screens with high engagement, the flows with high conversion — and we treat those as 'do not break' anchors. The redesign focuses on the screens that are actually losing users, so the lift comes from fixing what's broken, not rewriting what isn't.",
  },
] as const;

const OFFERINGS = [
  {
    name: "UX research & discovery",
    description:
      "Stakeholder interviews, competitive teardown, and short user calls to ground design decisions in evidence — not opinions.",
  },
  {
    name: "User flows & information architecture",
    description:
      "Mapped end-to-end user journeys, screen-by-screen flows, and a sitemap that reflects how your real users navigate to action.",
  },
  {
    name: "Wireframes & low-fi prototypes",
    description:
      "Layout, hierarchy, and content order locked in grayscale before any visual polish — so structural mistakes are cheap to fix.",
  },
  {
    name: "Visual UI design",
    description:
      "High-fidelity screens across mobile, tablet, and desktop with real states (empty, loading, error, success) — not just the happy path.",
  },
  {
    name: "Interactive Figma prototypes",
    description:
      "Clickable prototypes you can hand to investors, internal stakeholders, or test users without writing a line of code.",
  },
  {
    name: "Usability testing & iteration",
    description:
      "Short, structured tests with 3–5 users per round, a tight readout of friction points, and a second-pass design that addresses them.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Research & discovery",
    body: "We start with a workshop and a focused round of interviews — stakeholders, support tickets, customer calls when we can get them. The output is one page of decisions: who the product is for, what they're hiring it to do, and which patterns from the current product are working that we shouldn't touch.",
  },
  {
    n: "02",
    title: "Flows & information architecture",
    body: "Before any screens, we map the journey. End-to-end flows for the core jobs, a clean sitemap, and decisions on navigation, account states, and edge cases. This is where we kill the assumptions that would have cost us a week of design rework later.",
  },
  {
    n: "03",
    title: "Wireframes",
    body: "Grayscale, low-fidelity wireframes for every key screen. Layout, hierarchy, and content blocking are decided here — without the distraction of color, typography, or imagery. Cheap to change at this stage; expensive at the next.",
  },
  {
    n: "04",
    title: "Visual UI & design system",
    body: "High-fi UI across all responsive breakpoints, all key states, and all platforms in scope. Tokens, components, and patterns roll up into a typed design system so future screens take hours to design instead of days.",
  },
  {
    n: "05",
    title: "Prototype, test, hand off",
    body: "Clickable Figma prototype, structured usability testing with 3–5 users per round, and a written handoff doc your engineering team can build from. If we're shipping it too, this is our internal brief; if not, your developer starts the same day.",
  },
] as const;

const INDUSTRIES = [
  {
    name: "B2B SaaS dashboards",
    line: "Onboarding, multi-state dashboards, settings, billing.",
  },
  {
    name: "Consumer mobile apps",
    line: "Account flows, feed-led screens, gamification, push UX.",
  },
  {
    name: "E-commerce experiences",
    line: "PDP, PLP, cart, checkout, account, post-purchase.",
  },
  {
    name: "EdTech & LMS",
    line: "Course flows, lesson screens, progress, assessments.",
  },
  {
    name: "Fintech & dashboards",
    line: "Trust-led flows, calculators, KYC, statements, alerts.",
  },
  {
    name: "Healthcare & booking",
    line: "Triage, booking, patient records, provider dashboards.",
  },
];

const TOC = [
  { id: "what", label: "What is UI/UX design" },
  { id: "ui-vs-ux", label: "UI vs UX" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "industries", label: "Industries" },
  { id: "faq", label: "FAQs" },
] as const;

export default function UiUxDesignPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "UI/UX Design",
          description:
            "End-to-end UI/UX design — research, flows, wireframes, high-fidelity UI, design systems, prototypes, and usability testing for web and mobile products.",
          url: URL,
          serviceType: "UI/UX Design",
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
          {
            name: "Website Development",
            url: `${site.url}/services/website-development`,
          },
          { name: "UI/UX Design", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <UiVsUx />
        <WhatYouGet />
        <ProcessSection />
        <IndustriesSection />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Sections ---------- */

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
            <Link
              href="/services"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <Link
              href="/services/website-development"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Website Development
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">UI/UX Design</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · UI/UX Design
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            UI/UX design{" "}
            <span className="text-[var(--accent)]">
              that ships, not slides.
            </span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Research at the start, prototypes in the middle, accessible UI at
            the end. We design product surfaces engineering can actually build
            and customers can actually use — no 80-slide deck of pretty screens
            that fall apart at the first edge case.
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Start a project <span>→</span>
            </Link>
            <Link
              href="/services/website-development"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              All web development services
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <ServiceImage
            name="hero"
            alt="Wireframe illustration of a UI screen surrounded by user flow, heatmap, and persona artifacts"
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
    <Section id="what" eyebrow="01" title="What is UI/UX design?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            UI/UX design is the work of deciding how a digital product looks
            and how it feels to use — together. UX is the structural layer:
            flows, hierarchy, decisions a user has to make. UI is the surface
            layer: type, color, spacing, motion. Both are required; one without
            the other always shows.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            For most product teams, UI/UX is where the bottleneck quietly sits.
            Engineering can ship faster than design can decide; marketing can
            generate leads faster than the product can convert them. Better
            design — research-led, prototyped, tested — closes that loop.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="UI is what users see. UX is what users do. Good design makes both invisible — they only notice when one of the two is broken."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function UiVsUx() {
  const rows = [
    {
      attr: "Concern",
      ux: "How the product is structured and used.",
      ui: "How the product looks, sounds, and moves.",
    },
    {
      attr: "Primary artifacts",
      ux: "User flows, sitemaps, wireframes, journey maps.",
      ui: "High-fidelity screens, component library, motion specs.",
    },
    {
      attr: "Decisions made here",
      ux: "Order of steps, what info to ask, when, and why.",
      ui: "Hierarchy, contrast, type system, visual rhythm.",
    },
    {
      attr: "Failure mode if neglected",
      ux: "Beautiful product nobody can figure out.",
      ui: "Clear product nobody trusts because it looks broken.",
    },
    {
      attr: "Validation method",
      ux: "Usability tests, task success rates, drop-off analysis.",
      ui: "Visual QA, accessibility audits, brand consistency checks.",
    },
    {
      attr: "Owner on small teams",
      ux: "Often the founder, until it stops scaling.",
      ui: "Often a freelancer, until the system fragments.",
    },
  ];

  return (
    <Section id="ui-vs-ux" eyebrow="02" title="UI vs UX — the honest split">
      <Reveal>
        <p className="max-w-[760px] text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
          Most teams use the two terms interchangeably, but they answer
          different questions. Here&apos;s the split we actually use when
          scoping work — useful when you&apos;re deciding what kind of help
          your product needs first.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="grid grid-cols-12 bg-[var(--surface)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">
              Attribute
            </div>
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)] text-[var(--accent)]">
              UX
            </div>
            <div className="col-span-4 px-5 py-3 text-[var(--accent)]">
              UI
            </div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.attr}
              className={`grid grid-cols-12 text-[14px] leading-[1.55] ${
                i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]/40"
              }`}
            >
              <div className="col-span-4 px-5 py-4 border-r border-[var(--line)] text-white">
                {r.attr}
              </div>
              <div className="col-span-4 px-5 py-4 border-r border-[var(--line)] text-white/90">
                {r.ux}
              </div>
              <div className="col-span-4 px-5 py-4 text-white/90">{r.ui}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[var(--muted)] max-w-[760px] leading-[1.7]">
          We design both inside one engagement so the seam between them
          doesn&apos;t become your customer&apos;s problem.
        </p>
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
      blurb="The deliverables — written down, so the scope is the scope. No 'we'll figure it out later'."
    >
      <Reveal>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFERINGS.map((o, i) => (
            <li
              key={o.name}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/60 transition-colors"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                <span className="h-px w-6 bg-[var(--accent)]" />
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.02em] text-white">
                {o.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--muted)]">
                {o.description}
              </p>
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
      title="How we run a UI/UX design project"
      blurb="The same five steps every time, because predictability is a feature when you're spending real money on design."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the five-stage UI/UX design process from research to usability testing"
          className="mb-12 rounded-2xl"
        />
      </Reveal>
      <ol className="space-y-6">
        {PROCESS.map((step) => (
          <Reveal key={step.n}>
            <li className="grid grid-cols-12 gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
              <div className="col-span-12 md:col-span-3">
                <div className="font-display text-[44px] leading-none text-[var(--accent)] tracking-tight">
                  {step.n}
                </div>
                <h3 className="mt-3 font-display text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-9">
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/85">
                  {step.body}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function IndustriesSection() {
  return (
    <Section
      id="industries"
      eyebrow="05"
      title="Industries we design for"
      blurb="We don't design for everyone. These are the categories where our taste, process, and conversion sense actually compound for you."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <ServiceImage
            name="deliverables"
            alt="Grid illustration of UI/UX deliverables — flows, personas, wireframes, components, prototypes, and usability reports"
          />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind.name}
                className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/60 transition-colors"
              >
                <div className="text-[14px] font-medium text-white">
                  {ind.name}
                </div>
                <div className="mt-1 text-[12.5px] text-[var(--muted)] leading-[1.55]">
                  {ind.line}
                </div>
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
                <span className="font-display text-[16px] md:text-[17px] leading-[1.35] text-white">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-[var(--accent)] transition-transform group-open:rotate-45 text-[20px] leading-none"
                >
                  +
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] leading-[1.75] text-[var(--muted)]">
                {f.a}
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Building blocks ---------- */

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
    <section
      id={id}
      className="relative scroll-mt-32 border-b border-[var(--line)] bg-[var(--bg)]"
    >
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            Section {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.03em]">
            {title}
          </h2>
          {blurb && (
            <p className="mt-4 max-w-[720px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
              {blurb}
            </p>
          )}
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}

function Callout({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/5 p-6">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
        {label}
      </div>
      <p className="mt-3 text-[14.5px] leading-[1.7] text-white/90">{body}</p>
    </div>
  );
}

/* ---------- Image component ---------- */

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
    <picture
      className={`block aspect-[16/9] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] ${className}`}
    >
      <source
        type="image/avif"
        srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`}
        sizes="(max-width: 768px) 100vw, 720px"
      />
      <source
        type="image/webp"
        srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
        sizes="(max-width: 768px) 100vw, 720px"
      />
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
