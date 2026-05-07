import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";

export const metadata: Metadata = {
  title: "Website Development Services · Saurabh Bhayana",
  description:
    "Custom websites, e-commerce, CMS, web apps, integrations, performance, and maintenance. End-to-end web development by Saurabh Bhayana & Team.",
};

type Sub = string | { name: string; href: string };
type Category = {
  n: string;
  title: string;
  blurb: string;
  items: Sub[];
};

const categories: Category[] = [
  {
    n: "01",
    title: "Website Design",
    blurb:
      "Custom UI/UX, design systems, and Figma files, tailored to your brand and conversion goals.",
    items: [
      {
        name: "Custom Website Design",
        href: "/services/website-development/custom-website-design",
      },
      {
        name: "UI/UX Design",
        href: "/services/website-development/ui-ux-design",
      },
      "Wireframing & Prototyping",
      "Mobile App UI Design",
      "Design Systems Creation",
      "Figma Design Files",
      "Style Guide Development",
      "Landing Page Design",
    ],
  },
  {
    n: "02",
    title: "Website Development Types",
    blurb:
      "From single landing pages to multi-page corporate sites and campaign microsites, we build whatever fits your goal.",
    items: [
      "Custom Marketing Websites",
      "Corporate / Business Websites",
      "Personal Branding Websites",
      "Portfolio Websites",
      "Landing Pages",
      "One-Page Websites",
      "Multi-Page Websites",
      "Microsites for Campaigns",
    ],
  },
  {
    n: "03",
    title: "E-commerce Development",
    blurb:
      "Shopify, WooCommerce, Magento, headless, marketplaces, subscriptions, built to sell and scale.",
    items: [
      "Shopify Store Development",
      "Shopify Theme Customization",
      "WooCommerce Development",
      "Magento Development",
      "Custom E-commerce Builds",
      "Headless E-commerce",
      "Multi-Vendor Marketplaces",
      "Subscription-Based Stores",
      "Payment Gateway Integration",
      "Cart & Checkout Optimization",
    ],
  },
  {
    n: "04",
    title: "CMS Development",
    blurb:
      "WordPress, Webflow, Framer, and headless CMS, easy for your team to update, hard for your competition to match.",
    items: [
      "WordPress Development",
      "Custom WordPress Themes",
      "WordPress Plugin Development",
      "Webflow Development",
      "Framer Development",
      "Wix to Custom Migration",
      "Sanity / Contentful Setup",
      "Strapi Headless CMS",
    ],
  },
  {
    n: "05",
    title: "Web Application Development",
    blurb:
      "SaaS products, dashboards, CRMs, LMS, and marketplaces, production-grade web apps built to scale.",
    items: [
      "SaaS Product Development",
      "Custom Web Apps",
      "Dashboard & Admin Panels",
      "CRM Systems",
      "Booking & Scheduling Apps",
      "Membership Sites",
      "Learning Management Systems (LMS)",
      "Marketplace Platforms",
      "Real Estate Platforms",
    ],
  },
  {
    n: "06",
    title: "Specialized Services",
    blurb:
      "Funnels, multi-language, multi-region, coming-soon pages, the niche builds that don't fit a template.",
    items: [
      "Landing Page Development",
      "Sales Funnels (ClickFunnels, GoHighLevel)",
      "Coming Soon Pages",
      "Maintenance Mode Pages",
      "Multi-language Websites",
      "Multi-region Websites",
    ],
  },
  {
    n: "07",
    title: "Technical Services",
    blurb:
      "Speed, Core Web Vitals, accessibility, security, schema, the engineering work that protects your rankings.",
    items: [
      "Website Speed Optimization",
      "Core Web Vitals Fixes",
      "Mobile Responsiveness Audit",
      "Cross-Browser Compatibility",
      "Accessibility (WCAG) Compliance",
      "Schema Markup Implementation",
      "SSL Setup & Security",
      "Database Optimization",
    ],
  },
  {
    n: "08",
    title: "Migration & Redesign",
    blurb:
      "Replatform, redesign, modernize, without losing rankings, traffic, or your old links along the way.",
    items: [
      "Website Redesign",
      "Platform Migration (e.g., Wix → WordPress)",
      "HTTP to HTTPS Migration",
      "Domain Migration",
      "Hosting Migration",
      "Legacy Site Modernization",
    ],
  },
  {
    n: "09",
    title: "Maintenance & Support",
    blurb:
      "Backups, monitoring, updates, fixes, and emergency support, so your site never becomes the bottleneck.",
    items: [
      "Website Maintenance Plans",
      "Security Monitoring",
      "Daily / Weekly Backups",
      "Plugin & Theme Updates",
      "Bug Fixes",
      "Content Updates",
      "24/7 Uptime Monitoring",
      "Emergency Support",
    ],
  },
  {
    n: "10",
    title: "Integrations",
    blurb:
      "Connect your stack, payments, CRM, email, analytics, chat, booking, and custom APIs.",
    items: [
      "Payment Gateway (Stripe, Razorpay, PayPal)",
      "CRM Integration (HubSpot, Salesforce, Zoho)",
      "Email Marketing (Mailchimp, Klaviyo, ConvertKit)",
      "Analytics & Tracking",
      "Live Chat (Intercom, Tawk.to, Crisp)",
      "Booking Systems (Calendly, Acuity)",
      "Custom API Integration",
      "Third-party Tool Integration",
    ],
  },
];

export default function WebsiteDevelopmentPage() {
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
            <Link
              href="/services"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Services
            </Link>
            <span className="text-[var(--line-2)]">/</span>
            <span className="text-white">Website Development</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Service 01 · Website Development
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-[-0.04em]">
            Websites, stores &amp; web apps.{" "}
            <span className="text-[var(--accent)]">Built to convert.</span>
          </h1>

          <p className="mt-7 max-w-[640px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            Custom design, modern stacks, and engineering that holds up.
            From a single landing page to a SaaS dashboard or a multi-vendor
            marketplace, we build what your business actually needs to grow.
            Specialists for every layer, one accountable lead (me).
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
                15+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Stacks &amp; platforms
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

        <Reveal className="lg:col-span-7" delay={120}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.items.map((item, i) => {
              const name = typeof item === "string" ? item : item.name;
              const href = typeof item === "string" ? null : item.href;
              const num = `${category.n}.${String(i + 1).padStart(2, "0")}`;
              const inner = (
                <>
                  <span className="mt-0.5 inline-flex h-6 min-w-[2rem] items-center justify-center rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-mono font-semibold px-1.5">
                    {num}
                  </span>
                  <span className="flex-1 text-[14px] leading-[1.45] text-white/90 group-hover:text-white transition-colors">
                    {name}
                  </span>
                  {href && (
                    <span
                      aria-hidden
                      className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity text-[14px]"
                    >
                      →
                    </span>
                  )}
                </>
              );
              if (href) {
                return (
                  <li key={name}>
                    <Link
                      href={href}
                      className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--accent)]/40 bg-[var(--surface)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all"
                    >
                      {inner}
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={name}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all"
                >
                  {inner}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
