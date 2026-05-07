import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { BgFx } from "@/components/BgFx";
import { Icon } from "@/components/Icon";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact · Saurabh Bhayana",
  description:
    "Tell us about your project. 30-min discovery call, fixed quote in 48 hours, no agency fluff.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative bg-[var(--bg)] overflow-hidden border-b border-[var(--line)]">
        <div aria-hidden className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid animate-drift" />
        </div>
        <BgFx variant="hero" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            {/* Left: copy */}
            <Reveal className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
                Contact us · Q2 2026
              </div>

              <h1 className="mt-6 font-display text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.035em]">
                Tell us about{" "}
                <span className="text-[var(--accent)]">your project.</span>
              </h1>

              <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
                30-minute discovery call. We diagnose where you are now, where
                revenue should come from next, and whether we&apos;re the
                right team. Fixed quote in 48 hours after we agree on scope.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: "check" as const,
                    title: "Free 30-min discovery",
                    body: "No pitch deck. Just diagnostics.",
                  },
                  {
                    icon: "check" as const,
                    title: "Fixed quote in 48 hours",
                    body: "No hourly games. No surprise invoices.",
                  },
                  {
                    icon: "check" as const,
                    title: "Honest answer either way",
                    body: "If we&apos;re not a fit, we&apos;ll tell you who is.",
                  },
                ].map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/15 text-[var(--accent)]">
                      <Icon name={p.icon} size={14} strokeWidth={2.5} />
                    </span>
                    <div>
                      <div className="text-[14px] font-semibold text-white">
                        {p.title}
                      </div>
                      <div className="mt-0.5 text-[13px] text-[var(--muted)] leading-[1.55]">
                        {p.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-[var(--line)] space-y-3">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
                  Or reach us directly
                </div>
                <Link
                  href="mailto:hello@saurabhbhayana.com"
                  className="block text-[14px] text-white hover:text-[var(--accent)] transition-colors font-mono"
                >
                  hello@saurabhbhayana.com
                </Link>
                <div className="text-[13px] text-[var(--muted)]">
                  Based in Fatehabad, India · Working US · UK · EU · India
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal className="lg:col-span-7" delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

