import Link from "next/link";
import { BgFx } from "../BgFx";

export function ServicesHero() {
  return (
    <header className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid animate-drift" />
      </div>
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-28">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] text-[var(--accent)] font-mono uppercase animate-rise">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Services
          </div>

          <h1 className="mt-7 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] tracking-[-0.04em] animate-rise delay-100">
            Three services.
            <br />
            One mission:{" "}
            <span className="text-[var(--accent)]">your growth.</span>
          </h1>

          <p className="mt-7 max-w-[640px] mx-auto text-[15px] md:text-[17px] leading-[1.7] text-[var(--muted)] animate-rise delay-200">
            We don&apos;t spread thin across a hundred offerings. We do three
            things end-to-end, and we do them really well. Each one is built
            to drive a single outcome: measurable revenue for your business.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap animate-rise delay-300">
            <Link
              href="#service-01"
              className="inline-flex h-11 items-center px-5 rounded-full bg-[var(--accent)] text-black font-semibold text-[14px] hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all"
            >
              Website Development →
            </Link>
            <Link
              href="#service-02"
              className="inline-flex h-11 items-center px-5 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              Digital Marketing →
            </Link>
            <Link
              href="#service-03"
              className="inline-flex h-11 items-center px-5 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[14px] font-medium"
            >
              AI Services →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
