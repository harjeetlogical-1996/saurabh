import Link from "next/link";
import Image from "next/image";
import { BgFx } from "./BgFx";
import { getAllSettings } from "@/lib/settings";

export async function Hero() {
  const settings = await getAllSettings();
  const heroBadge = settings["hero.badge"];
  const ctaPrimary = settings["hero.cta_primary"];
  const ctaSecondary = settings["hero.cta_secondary"];

  return (
    <header
      role="banner"
      aria-label="Saurabh Bhayana — Website Development, Digital Marketing and AI Services"
      className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]"
    >
      {/* Animated grid */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      {/* Layered background fx */}
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-36">
        <div className="max-w-[840px] mx-auto text-center">
          <div
            role="status"
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase animate-rise"
          >
            <span aria-hidden className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse-ring" />
            </span>
            {heroBadge}
          </div>

          <h1 className="mt-7 font-display text-[44px] sm:text-[60px] md:text-[76px] leading-[1.02] tracking-[-0.04em] animate-rise delay-100">
            Website development, digital marketing &amp;{" "}
            <span className="text-[var(--accent)]">AI services</span> built to
            grow revenue.
          </h1>

          <p className="mt-7 max-w-[680px] mx-auto text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)] animate-rise delay-200">
            I&apos;m Saurabh. I lead an 8-person team of designers, developers
            and marketers who ship{" "}
            <span className="text-white">
              conversion-focused websites, full-stack SEO &amp; paid ads, and
              AI growth systems
            </span>{" "}
            for founders in India, the US, UK and EU. Strategy by me.
            Execution by my team. Revenue for you.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap animate-rise delay-300">
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-2 bg-[var(--accent)] text-black font-semibold px-6 rounded-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] text-[14px]"
            >
              <span className="relative z-10">{ctaPrimary}</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-medium text-[14px]"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Social proof strip with founder avatars */}
          <div
            className="mt-12 flex items-center justify-center gap-4 animate-fade-in delay-400"
            aria-label="Trusted by founders across the US, UK, EU, and India, with an average 4.9-star rating"
          >
            <div aria-hidden className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=70",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=70",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=70",
                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&auto=format&q=70",
                "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&auto=format&q=70",
              ].map((src, i) => (
                <span
                  key={i}
                  className="relative inline-block h-9 w-9 rounded-full overflow-hidden border-2 border-[var(--bg)] bg-[var(--surface)]"
                >
                  <Image
                    src={src}
                    alt=""
                    role="presentation"
                    width={36}
                    height={36}
                    className="object-cover grayscale"
                  />
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="text-[13px] text-white">
                Trusted by 50+ founders &amp; teams
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                India · US · UK · EU · Avg 4.9★
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
