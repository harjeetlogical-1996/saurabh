import Link from "next/link";
import { Reveal } from "./Reveal";
import { BgFx } from "./BgFx";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--line)]"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-bright animate-drift opacity-100" />
      </div>
      <div
        aria-hidden
        className="absolute z-0 inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(0,240,255,0.22), transparent 70%)",
        }}
      />
      <BgFx variant="hero" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-32 md:py-44">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent)] glass text-[11px] tracking-[0.2em] text-[var(--accent)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            4 founder spots open · Q2 2026
          </div>
          <h2 className="mt-6 font-display text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.035em] max-w-[860px] mx-auto">
            Ready to grow with a team that actually{" "}
            <span className="text-[var(--accent)] text-glow-cyan">ships?</span>
          </h2>
          <p className="mt-6 max-w-[600px] mx-auto text-[15px] md:text-[16px] leading-[1.65] text-[var(--muted)]">
            30-minute discovery call. No slides, no pitch, just your
            situation, where revenue should come from next, and an honest
            answer about whether web development, digital marketing, AI
            services, or all three are the right move.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="group relative inline-flex h-12 items-center gap-2 bg-[var(--accent)] text-black font-semibold px-6 rounded-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_var(--accent-glow)] text-[14px]"
            >
              <span className="relative z-10">Contact us</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="mailto:hello@saurabhbhayana.com"
              className="inline-flex h-12 items-center px-6 rounded-full border border-[var(--line)] text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono text-[13px]"
            >
              hello@saurabhbhayana.com
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-7 text-[11px] text-[var(--muted)] font-mono uppercase tracking-[0.18em] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Check /> Free 30-min discovery
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check /> Fixed quote in 48 hrs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check /> No retainers under 3 months
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
