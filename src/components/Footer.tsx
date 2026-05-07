import Link from "next/link";
import { SubscribeForm } from "./SubscribeForm";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "AI Services (GEO/LLMO)", href: "/services/ai-services" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About the founder", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Technologies", href: "/technologies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free SEO tools", href: "/#tools" },
      { label: "Blog & insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Client login", href: "/login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--bg)] text-white relative overflow-hidden border-t border-[var(--line)]">
      <div className="relative max-w-[1240px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent)] text-black overflow-hidden">
                <span className="font-display text-[14px] leading-none relative z-10">
                  sb
                </span>
                <span className="absolute inset-0 animate-spin-slow">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-black" />
                </span>
              </span>
              <span className="font-display text-[24px] tracking-tight">
                Saurabh<span className="text-[var(--accent)]">.</span>
              </span>
            </div>
            <p className="mt-6 max-w-[400px] text-[14px] text-[var(--muted)] leading-[1.7]">
              Founder-led studio shipping{" "}
              <span className="text-white">
                website development, digital marketing &amp; AI services
              </span>{" "}
              for ambitious brands in India, the US, UK and EU. Strategy by
              Saurabh. Execution by his team.
            </p>

            <SubscribeForm source="footer" />
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-mono">
                  {c.title}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-white hover:text-[var(--accent)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big watermark name */}
        <div
          aria-hidden
          className="mt-20 -mb-10 select-none overflow-hidden"
        >
          <div className="font-display text-[var(--surface)] text-[120px] md:text-[220px] leading-[0.85] tracking-[-0.05em] whitespace-nowrap">
            Saurabh<span className="text-[var(--accent)]/15">.</span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[12px] text-[var(--muted)] font-mono">
            © {new Date().getFullYear()} Saurabh Bhayana. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[12px] text-[var(--muted)] font-mono">
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[var(--accent)] transition-colors">Terms</Link>
            <Link href="https://twitter.com/" className="hover:text-[var(--accent)] transition-colors">Twitter</Link>
            <Link href="https://linkedin.com/" className="hover:text-[var(--accent)] transition-colors">LinkedIn</Link>
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
              Booking Q2 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
