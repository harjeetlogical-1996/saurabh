import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";

export const metadata: Metadata = {
  title: "Digital Marketing Services · Saurabh Bhayana",
  description:
    "Full-stack digital marketing, SEO, paid ads, social media, content, email, CRO, analytics, branding, video, and partnerships. End-to-end execution by Saurabh Bhayana & Team.",
};

type Sub = string;
type Category = {
  n: string;
  title: string;
  blurb: string;
  items: Sub[];
};

const categories: Category[] = [
  {
    n: "01",
    title: "SEO (Search Engine Optimization)",
    blurb:
      "Technical, on-page, off-page, local, and international SEO, built to rank you for what your buyers actually search.",
    items: [
      "Technical SEO Audit",
      "On-Page SEO Optimization",
      "Off-Page SEO / Link Building",
      "Local SEO (Google Business Profile)",
      "E-commerce SEO",
      "International SEO",
      "SEO Content Strategy",
      "Keyword Research & Mapping",
      "Schema Markup Implementation",
      "Site Speed Optimization",
      "Core Web Vitals Optimization",
    ],
  },
  {
    n: "02",
    title: "Paid Advertising (PPC)",
    blurb:
      "ROAS-first paid campaigns across Google, Meta, LinkedIn, TikTok, and beyond, with retargeting baked in.",
    items: [
      "Google Search Ads",
      "Google Display Ads",
      "Google Shopping Ads",
      "YouTube Ads",
      "Performance Max Campaigns",
      "Meta Ads (Facebook + Instagram)",
      "LinkedIn Ads",
      "Twitter / X Ads",
      "Pinterest Ads",
      "TikTok Ads",
      "Programmatic Advertising",
      "Retargeting & Remarketing",
    ],
  },
  {
    n: "03",
    title: "Social Media Marketing",
    blurb:
      "Strategy, creative, scheduling, and engagement across every channel that matters for your brand.",
    items: [
      "Social Media Strategy",
      "Content Calendar Planning",
      "Instagram Marketing",
      "Facebook Marketing",
      "LinkedIn Marketing (Personal + Company)",
      "Twitter / X Growth",
      "YouTube Channel Management",
      "Pinterest Marketing",
      "Threads Management",
      "Community Management",
      "Influencer Marketing",
      "Social Media Audits",
    ],
  },
  {
    n: "04",
    title: "Content Marketing",
    blurb:
      "Long-form pieces, pillar content, scripts, and lead magnets written by humans who've done the work.",
    items: [
      "Blog Writing & Strategy",
      "SEO Content Writing",
      "Long-Form Articles (Pillar Content)",
      "Whitepapers & Ebooks",
      "Case Study Writing",
      "Newsletter Content",
      "Video Scripts",
      "Podcast Show Notes",
      "Lead Magnets Creation",
      "Content Repurposing",
    ],
  },
  {
    n: "05",
    title: "Email Marketing",
    blurb:
      "Lifecycle flows, broadcasts, and segmentation that turn lists into recurring revenue.",
    items: [
      "Email Strategy & Setup",
      "Welcome Email Sequences",
      "Sales Email Funnels",
      "Newsletter Management",
      "Cold Email Outreach",
      "Automated Drip Campaigns",
      "Re-engagement Campaigns",
      "Abandoned Cart Recovery",
      "Email List Building",
      "Email Template Design",
    ],
  },
  {
    n: "06",
    title: "Conversion Rate Optimization (CRO)",
    blurb:
      "Find the leaks in your funnel and fix them, through testing, behavior analysis, and personalization.",
    items: [
      "A/B Testing",
      "Landing Page Optimization",
      "Funnel Analysis",
      "User Behavior Analysis",
      "Heatmap Analysis",
      "Form Optimization",
      "Checkout Optimization",
      "Personalization Strategy",
    ],
  },
  {
    n: "07",
    title: "Analytics & Reporting",
    blurb:
      "Clean GA4, GTM, attribution, and dashboards, so you always know what's working and what isn't.",
    items: [
      "Google Analytics 4 Setup",
      "Google Tag Manager Setup",
      "Conversion Tracking",
      "Custom Dashboards",
      "Attribution Modeling",
      "Marketing Mix Analysis",
      "ROI / ROAS Reporting",
      "Monthly Performance Reports",
    ],
  },
  {
    n: "08",
    title: "Branding & Strategy",
    blurb:
      "From positioning to identity to personas, the strategic foundation under everything we ship.",
    items: [
      "Brand Strategy",
      "Brand Identity Development",
      "Brand Guidelines Creation",
      "Positioning & Messaging",
      "Competitor Analysis",
      "Market Research",
      "Buyer Persona Development",
    ],
  },
  {
    n: "09",
    title: "Video Marketing",
    blurb:
      "YouTube, Reels, Shorts, ads, and brand films, built for the platform and the buyer.",
    items: [
      "YouTube SEO & Strategy",
      "Reels & Shorts Strategy",
      "Video Ad Creation",
      "Brand Story Videos",
      "Product Demo Videos",
      "Testimonial Videos",
    ],
  },
  {
    n: "10",
    title: "Affiliate & Partnership Marketing",
    blurb:
      "Build channels you don't pay for upfront, affiliates, influencers, partners, and referral loops.",
    items: [
      "Affiliate Program Setup",
      "Influencer Outreach",
      "Brand Partnerships",
      "Referral Program Design",
    ],
  },
];

export default function DigitalMarketingPage() {
  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero totalItems={totalItems} categoriesCount={categories.length} />
        <CategoryNav />
        <CategoryList />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Hero({
  totalItems,
  categoriesCount,
}: {
  totalItems: number;
  categoriesCount: number;
}) {
  return (
    <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24">
        <Reveal className="max-w-[860px]">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
            <Link href="/services" className="hover:text-[var(--accent)] transition-colors">
              Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">Digital Marketing</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service 02 · Digital Marketing
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-[-0.04em]">
            Full-stack marketing.{" "}
            <span className="text-[var(--accent)]">End to end.</span>
          </h1>

          <p className="mt-7 max-w-[640px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            From SEO foundations to paid acquisition, content engines to
            email automation, branding to analytics, we do the marketing
            work that actually compounds revenue. Specialists for every
            channel, one accountable lead (me).
          </p>

          <div className="mt-9 flex items-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 px-6 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Contact us <span>→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              All services
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-12 flex flex-wrap items-end gap-10">
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                {categoriesCount}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Categories
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-[var(--accent)]">
                {totalItems}+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Sub-services delivered
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                10+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Channels covered
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

function CategoryNav() {
  return (
    <section className="sticky top-16 z-30 border-b border-[var(--line)] bg-[rgba(10,10,10,0.85)] backdrop-blur-xl">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono pr-3 border-r border-[var(--line)]">
          Jump to
        </span>
        {categories.map((c) => (
          <a
            key={c.n}
            href={`#cat-${c.n}`}
            className="shrink-0 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40"
          >
            <span className="text-[var(--accent)]/70">{c.n}</span>{" "}
            {shortTitle(c.title)}
          </a>
        ))}
      </div>
    </section>
  );
}

function shortTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function CategoryList() {
  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-28">
        {categories.map((c) => (
          <CategoryRow key={c.n} category={c} />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <article id={`cat-${category.n}`} className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: heading + blurb */}
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Category {category.n}
            </div>
            <h2 className="mt-4 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
              {category.title}
            </h2>
            <p className="mt-4 max-w-[440px] text-[14px] md:text-[15px] leading-[1.7] text-[var(--muted)]">
              {category.blurb}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {category.items.length} services
            </div>
          </div>
        </Reveal>

        {/* Right: sub-items */}
        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.items.map((item, i) => (
              <li
                key={item}
                className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all"
              >
                <span className="mt-0.5 inline-flex h-6 min-w-[2rem] items-center justify-center rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-mono font-semibold px-1.5">
                  {category.n}.{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] leading-[1.45] text-white/90 group-hover:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
