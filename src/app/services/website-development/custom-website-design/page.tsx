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

const SLUG = "custom-website-design";
const URL = `${site.url}/services/website-development/${SLUG}`;

// Layout's template appends " · Saurabh Bhayana", so keep this suffix-free.
const META_TITLE = "Custom Website Design Services in India";
const META_DESCRIPTION =
  "Custom website design services for founders and growing brands — strategy-led UI/UX, conversion-focused layouts, and a clean Figma handoff your developers will actually thank you for.";

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
        alt: "Custom website design across desktop, tablet, and mobile",
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
    q: "What is custom website design?",
    a: "Custom website design is a website built around your specific brand, audience, and goals — not assembled from a marketplace template. Every layout, component, and motion choice is decided by a designer who has read your brief instead of being inherited from someone else's. You get a unique visual system, deliberate copy hierarchy, and a structure that matches how your customers actually buy.",
  },
  {
    q: "How is it different from a template website?",
    a: "Templates start with a fixed layout and ask you to fit your message into it. Custom design starts with your message and builds the layout around it. Templates are faster and cheaper up front, but they age the moment a competitor buys the same one — and they almost never match the way your customer actually moves through a buying decision.",
  },
  {
    q: "How long does a custom website design project take?",
    a: "A focused marketing site usually lands in 3 to 5 weeks of design time. A 15-to-20-page corporate site or a SaaS product site sits in the 6 to 9 week range. We give you a calendar week-by-week before we start so you know exactly when each milestone — wireframes, visual direction, full design, handoff — is due.",
  },
  {
    q: "Do you redesign existing websites or only build from scratch?",
    a: "Both. Roughly two-thirds of our design work is a redesign — usually because the brand has evolved, the conversion rate has plateaued, or the old site is fighting the team rather than helping them. We start by auditing what's working in analytics so the redesign keeps the wins and replaces only the parts holding you back.",
  },
  {
    q: "What do I receive at the end of the project?",
    a: "A fully organized Figma file with reusable components, a typed design system (colors, type, spacing, motion), responsive specs for mobile / tablet / desktop, exported assets where you need them, and a written handoff doc your developer can build from without guessing. If you'd like us to build it too, we hand it straight to our development team.",
  },
  {
    q: "Do you handle copywriting and content as part of the design?",
    a: "We write the structural copy — headings, section intros, CTA labels — because design and copy can't be separated cleanly without weakening both. Long-form content, case studies, and blog posts are scoped separately if you want us to write them, otherwise we design with placeholders that match your final word counts.",
  },
  {
    q: "Will the design rank well on Google and AI search?",
    a: "Design influences SEO more than people admit — Core Web Vitals, semantic structure, schema-friendly layouts, internal-link surfaces, and AEO-friendly answer blocks all come out of design decisions. We design with these in mind from the wireframe stage, so by the time it's built the page is already easy for both Google and LLMs to parse.",
  },
] as const;

const OFFERINGS = [
  {
    name: "Brand-led visual design",
    description:
      "Color, type, motion, and spacing decisions made specifically for your brand voice — not picked from a Figma community kit.",
  },
  {
    name: "UI/UX architecture",
    description:
      "Information hierarchy, navigation, and conversion flow designed around how your real customers move from interest to action.",
  },
  {
    name: "Wireframes and prototypes",
    description:
      "Low-fidelity wireframes for every page, plus an interactive Figma prototype you can click through before a single pixel is polished.",
  },
  {
    name: "Responsive design specs",
    description:
      "Mobile, tablet, and desktop layouts hand-tuned per breakpoint so your site never looks like a desktop page squashed onto a phone.",
  },
  {
    name: "Reusable design system",
    description:
      "Tokens, components, and patterns organized so future pages take hours to design — not days. Hand-off-ready Figma libraries.",
  },
  {
    name: "Developer handoff",
    description:
      "A clean Figma file, written component spec, and walkthrough call with your engineering team so nothing gets lost in translation.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discovery & strategy",
    body: "We start with a short workshop and a teardown of your current site (if there is one). The goal is one page of decisions: who the site is for, what it should make them do, and which competitor moves we're consciously avoiding. No pretty mood-boards yet — just a clear brief everyone signs off on.",
  },
  {
    n: "02",
    title: "Wireframes",
    body: "Every page gets sketched as a low-fidelity wireframe. Layout, hierarchy, and content order are locked here, before color or type enter the conversation. Cheap to change at this stage, expensive at the next — so we get it right while it's still grayscale.",
  },
  {
    n: "03",
    title: "Visual design",
    body: "We design the homepage end-to-end as a direction reference, then roll the system across every other page. Three responsive breakpoints — mobile, tablet, desktop — designed by hand, not auto-stretched. You see real copy, real imagery, and real states (empty, loading, error) for the components that need them.",
  },
  {
    n: "04",
    title: "Handoff",
    body: "You get a tidy Figma file, a written design-system doc, and a walkthrough call with whoever is building the site. If we're building it, this becomes our internal brief. If your developer is building it, they can start the same day without a single Slack thread asking 'what about mobile?'.",
  },
] as const;

const INDUSTRIES = [
  { name: "B2B SaaS", line: "Pricing, dashboards, docs, and demo flows." },
  { name: "D2C e-commerce", line: "PDP, PLP, story-led brand pages, lookbooks." },
  {
    name: "Professional services",
    line: "Consultancies, agencies, law firms, clinics, studios.",
  },
  { name: "EdTech", line: "Course pages, instructor profiles, lead capture." },
  {
    name: "Healthcare & wellness",
    line: "Clinic sites, booking flows, treatment-led pages.",
  },
  {
    name: "Fintech",
    line: "Trust-led layouts, compliance-aware copy, calculators.",
  },
];

const TOC = [
  { id: "what", label: "What is custom design" },
  { id: "why", label: "Why custom over template" },
  { id: "what-you-get", label: "What you get" },
  { id: "process", label: "Our process" },
  { id: "industries", label: "Industries" },
  { id: "faq", label: "FAQs" },
] as const;

export default function CustomWebsiteDesignPage() {
  return (
    <>
      <JsonLd
        id="ld-service"
        data={singleServiceSchema({
          name: "Custom Website Design",
          description:
            "Strategy-led custom website design with a unique visual system, conversion-focused UI/UX, responsive design specs, and a clean Figma handoff. Built for founders and growing brands in India and abroad.",
          url: URL,
          serviceType: "Website Design",
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
          { name: "Custom Website Design", url: URL },
        ])}
      />
      <JsonLd id="ld-faq" data={faqSchema(FAQS)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Toc />
        <WhatIs />
        <WhyCustom />
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
            <span className="text-white">Custom Website Design</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service · Custom Website Design
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-[1.04] tracking-[-0.035em]">
            Custom website design{" "}
            <span className="text-[var(--accent)]">
              that earns its place on your homepage.
            </span>
          </h1>

          <p className="mt-7 max-w-[600px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            We design websites the long way. Brief first, wireframes second,
            visual direction third, and only then a polished site that does
            what your business actually needs. No templates, no synthetic stock
            screens, no design-by-committee.
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
            alt="Wireframe illustration of a custom website design across desktop, tablet, and mobile breakpoints"
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
    <Section id="what" eyebrow="01" title="What is custom website design?">
      <div className="grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-[16px] md:text-[17px] leading-[1.75] text-white/85">
            Custom website design is a site built around <em>your</em> brand,
            audience, and goals — not assembled from a marketplace template.
            Every layout, component, and motion choice is decided by a designer
            who has read your brief, instead of inherited from a theme someone
            else bought first.
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
            In practice, that means a unique visual system, deliberate copy
            hierarchy, and a structure that matches how your customers actually
            buy from you. The page does the work — it doesn&apos;t fight you to
            do it.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={100}>
          <Callout
            label="Quick definition"
            body="A custom-designed website is one where the design exists for the brand it represents — not the other way around. Pages, components, and motion are decided after the brief, not before."
          />
        </Reveal>
      </div>
    </Section>
  );
}

function WhyCustom() {
  const rows = [
    {
      attr: "Visual identity",
      template: "Inherited from whoever bought the theme first.",
      custom: "Designed around your brand, audience, and tone.",
    },
    {
      attr: "Conversion structure",
      template: "Generic — built for an imaginary average buyer.",
      custom: "Mapped to how your real customers move from interest to action.",
    },
    {
      attr: "Performance",
      template:
        "Loaded with features you don't use; Core Web Vitals suffer by default.",
      custom: "Only the components you need. Fast on mid-range Android by design.",
    },
    {
      attr: "SEO & AEO",
      template:
        "Cookie-cutter HTML, weak schema, no answer-block planning.",
      custom:
        "Semantic structure, schema-first, AEO-friendly answer blocks built in.",
    },
    {
      attr: "Maintenance",
      template:
        "Theme updates can break customizations you've layered on top.",
      custom: "Owned codebase, owned design system, no theme lock-in.",
    },
    {
      attr: "Differentiation",
      template:
        "Recognizable as a template the moment a buyer has seen it twice.",
      custom: "Looks unmistakably like you — because it is.",
    },
  ];

  return (
    <Section id="why" eyebrow="02" title="Why custom over a template?">
      <Reveal>
        <p className="max-w-[760px] text-[15px] md:text-[16px] leading-[1.75] text-[var(--muted)]">
          Templates win on speed and cost. Custom wins on every other axis that
          compounds over time. Here&apos;s the honest comparison — including
          where templates legitimately make sense.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)]">
          <div className="grid grid-cols-12 bg-[var(--surface)] text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">
              Attribute
            </div>
            <div className="col-span-4 px-5 py-3 border-r border-[var(--line)]">
              Template site
            </div>
            <div className="col-span-4 px-5 py-3 text-[var(--accent)]">
              Custom design
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
              <div className="col-span-4 px-5 py-4 border-r border-[var(--line)] text-[var(--muted)]">
                {r.template}
              </div>
              <div className="col-span-4 px-5 py-4 text-white/90">
                {r.custom}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[var(--muted)] max-w-[760px] leading-[1.7]">
          When templates make sense: a single landing page for a one-month
          campaign, an MVP you&apos;ll throw away after validation, or any site
          where the cost of looking generic is genuinely zero. Otherwise, custom.
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
      title="How we run a custom website design project"
      blurb="The same four steps every time, because predictability is a feature when you're spending real money on design."
    >
      <Reveal>
        <ServiceImage
          name="process"
          alt="Diagram of the four-stage custom website design process from discovery to design handoff"
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
            name="industries"
            alt="Cluster illustration showing the range of industries we design custom websites for"
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

/**
 * Picks the optimal format / size variant from public/images/services/<slug>/.
 * We hand-rolled the variants in scripts/gen-service-images.ts so we can ship
 * a real <picture> tag instead of relying on next/image's runtime resizer for
 * static assets that already exist on disk in 6 variants.
 */
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
