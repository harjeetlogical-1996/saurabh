import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Technologies · Saurabh Bhayana",
  description:
    "The full tech stack we ship with, frontend, backend, CMS, e-commerce, design, hosting, dev tools, marketing & analytics, AI, and project management.",
};

type Group = {
  label: string;
  items: string[];
};

type IconKey =
  | "rocket"
  | "settings"
  | "package"
  | "cart"
  | "palette"
  | "cloud"
  | "wrench"
  | "trending-up"
  | "bot"
  | "bar-chart";

type Section = {
  n: string;
  icon: IconKey;
  title: string;
  blurb: string;
  groups: Group[];
};

const sections: Section[] = [
  {
    n: "01",
    icon: "rocket",
    title: "Frontend Technologies",
    blurb:
      "Modern frontend stacks for marketing sites, web apps, and motion-heavy experiences.",
    groups: [
      {
        label: "Languages",
        items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
      },
      {
        label: "Frameworks & Libraries",
        items: [
          "React.js",
          "Next.js",
          "Vue.js",
          "Nuxt.js",
          "Astro",
          "Svelte / SvelteKit",
          "Angular",
        ],
      },
      {
        label: "CSS Frameworks",
        items: [
          "Tailwind CSS",
          "Bootstrap",
          "Material UI (MUI)",
          "Chakra UI",
          "Shadcn/ui",
          "Sass / SCSS",
        ],
      },
      {
        label: "Animation",
        items: [
          "Framer Motion",
          "GSAP",
          "Lottie",
          "Three.js (3D)",
          "Spline (3D)",
        ],
      },
    ],
  },
  {
    n: "02",
    icon: "settings",
    title: "Backend Technologies",
    blurb:
      "Languages, frameworks, and databases that hold up under real production load.",
    groups: [
      {
        label: "Languages",
        items: ["Node.js", "Python", "PHP", "Ruby"],
      },
      {
        label: "Frameworks",
        items: [
          "Express.js",
          "Nest.js",
          "Django",
          "Laravel",
          "Ruby on Rails",
        ],
      },
      {
        label: "Databases",
        items: [
          "MongoDB",
          "PostgreSQL",
          "MySQL",
          "Firebase",
          "Supabase",
          "Redis",
        ],
      },
    ],
  },
  {
    n: "03",
    icon: "package",
    title: "CMS Platforms",
    blurb:
      "From WordPress to Webflow to headless, the right CMS for your team's workflow.",
    groups: [
      {
        label: "Platforms",
        items: [
          "WordPress",
          "Webflow",
          "Framer",
          "Shopify",
          "Wix",
          "Squarespace",
          "Sanity (Headless)",
          "Contentful (Headless)",
          "Strapi (Headless)",
          "Ghost",
        ],
      },
    ],
  },
  {
    n: "04",
    icon: "cart",
    title: "E-commerce Platforms",
    blurb:
      "Shopify, WooCommerce, Magento, custom, we ship the platform that fits the catalog and the team.",
    groups: [
      {
        label: "Platforms",
        items: [
          "Shopify / Shopify Plus",
          "WooCommerce",
          "Magento",
          "BigCommerce",
          "Wix Commerce",
          "Custom Solutions",
        ],
      },
    ],
  },
  {
    n: "05",
    icon: "palette",
    title: "Design Tools",
    blurb: "Where the visuals are designed, prototyped, and handed off.",
    groups: [
      {
        label: "Tools",
        items: [
          "Figma",
          "Adobe XD",
          "Sketch",
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Canva",
          "Spline (3D)",
          "Blender",
        ],
      },
    ],
  },
  {
    n: "06",
    icon: "cloud",
    title: "Hosting & Deployment",
    blurb:
      "From Vercel edge to AWS infra, we deploy where your traffic and budget make most sense.",
    groups: [
      {
        label: "Providers",
        items: [
          "Vercel",
          "Netlify",
          "AWS (Amazon Web Services)",
          "Google Cloud",
          "DigitalOcean",
          "Cloudflare",
          "SiteGround",
          "Hostinger",
          "Bluehost",
          "GoDaddy",
        ],
      },
    ],
  },
  {
    n: "07",
    icon: "wrench",
    title: "Developer Tools",
    blurb:
      "The everyday stack, version control, IDEs, API testing, containers, and package managers.",
    groups: [
      {
        label: "Tools",
        items: [
          "Git / GitHub / GitLab",
          "VS Code",
          "Cursor (AI IDE)",
          "Postman (API Testing)",
          "Docker",
          "NPM / Yarn / PNPM",
        ],
      },
    ],
  },
  {
    n: "08",
    icon: "trending-up",
    title: "Marketing & Analytics Tools",
    blurb:
      "SEO, analytics, ad platforms, email, CRM, and social, the marketing OS we run on.",
    groups: [
      {
        label: "SEO Tools",
        items: [
          "Ahrefs",
          "SEMrush",
          "Moz",
          "Screaming Frog",
          "Google Search Console",
          "Ubersuggest",
        ],
      },
      {
        label: "Analytics",
        items: [
          "Google Analytics 4",
          "Google Tag Manager",
          "Hotjar",
          "Microsoft Clarity",
          "Mixpanel",
          "Plausible",
        ],
      },
      {
        label: "Ads Management",
        items: [
          "Google Ads",
          "Meta Business Manager",
          "LinkedIn Campaign Manager",
          "TikTok Ads Manager",
        ],
      },
      {
        label: "Email Marketing",
        items: [
          "Mailchimp",
          "Klaviyo",
          "ConvertKit",
          "ActiveCampaign",
          "Brevo (formerly Sendinblue)",
          "MailerLite",
        ],
      },
      {
        label: "CRM & Automation",
        items: [
          "HubSpot",
          "Salesforce",
          "Zoho CRM",
          "Pipedrive",
          "GoHighLevel",
          "ActiveCampaign",
        ],
      },
      {
        label: "Social Media",
        items: [
          "Buffer",
          "Hootsuite",
          "Later",
          "Sprout Social",
          "Metricool",
        ],
      },
    ],
  },
  {
    n: "09",
    icon: "bot",
    title: "AI Tools (Modern Stack)",
    blurb:
      "The AI tools we ship with daily, from research to creative to development.",
    groups: [
      {
        label: "AI Tools",
        items: [
          "ChatGPT",
          "Claude (Anthropic)",
          "Gemini",
          "Midjourney",
          "DALL-E",
          "Runway ML",
          "ElevenLabs",
          "Perplexity",
        ],
      },
    ],
  },
  {
    n: "10",
    icon: "bar-chart",
    title: "Project Management",
    blurb:
      "How we run engagements, async docs, async video, sync calls, scheduled meetings.",
    groups: [
      {
        label: "Tools",
        items: [
          "Notion",
          "ClickUp",
          "Asana",
          "Trello",
          "Slack",
          "Loom",
          "Zoom",
          "Calendly",
        ],
      },
    ],
  },
];

export default function TechnologiesPage() {
  const totalTools = sections.reduce(
    (acc, s) => acc + s.groups.reduce((g, gr) => g + gr.items.length, 0),
    0,
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero totalTools={totalTools} sectionsCount={sections.length} />
        <CategoryNav />
        <SectionList />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Hero({
  totalTools,
  sectionsCount,
}: {
  totalTools: number;
  sectionsCount: number;
}) {
  return (
    <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-24">
        <Reveal className="max-w-[860px]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Technologies · 2026 stack
          </div>

          <h1 className="mt-6 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-[-0.04em]">
            The tools we ship with.{" "}
            <span className="text-[var(--accent)]">Every day.</span>
          </h1>

          <p className="mt-7 max-w-[660px] text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)]">
            We&apos;re opinionated about our stack. These are the languages,
            frameworks, platforms, and tools my team works in to deliver
            websites, marketing engines, and AI workflows that actually hold
            up in production.
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
              See our services
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-end gap-10">
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                {sectionsCount}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Stack Categories
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-[var(--accent)]">
                {totalTools}+
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Tools &amp; Platforms
              </div>
            </div>
            <div>
              <div className="font-display text-[36px] leading-none tracking-tight text-white">
                100%
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                Used in production
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
        {sections.map((s) => (
          <a
            key={s.n}
            href={`#tech-${s.n}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-[var(--accent)]/40"
          >
            <span className="text-[var(--accent)]/70">{s.n}</span>
            <Icon name={s.icon} size={13} strokeWidth={2} />
            <span>{s.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionList() {
  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">
      <BgFx variant="subtle" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-28">
        {sections.map((s) => (
          <SectionRow key={s.n} section={s} />
        ))}
      </div>
    </section>
  );
}

function SectionRow({ section }: { section: Section }) {
  const totalInSection = section.groups.reduce(
    (acc, g) => acc + g.items.length,
    0,
  );
  return (
    <article id={`tech-${section.n}`} className="scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: heading */}
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Stack {section.n}
            </div>
            <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)]">
              <Icon name={section.icon} size={22} strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
              {section.title}
            </h2>
            <p className="mt-4 max-w-[420px] text-[14px] md:text-[15px] leading-[1.7] text-[var(--muted)]">
              {section.blurb}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {totalInSection} tools
            </div>
          </div>
        </Reveal>

        {/* Right: groups */}
        <Reveal className="lg:col-span-8" delay={120}>
          <div className="space-y-8">
            {section.groups.map((g) => (
              <div key={g.label}>
                {section.groups.length > 1 && (
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                      {g.label}
                    </span>
                    <span className="h-px flex-1 bg-[var(--line)]" />
                    <span className="text-[10px] text-[var(--muted)] font-mono">
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] px-3 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-white/90 font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
