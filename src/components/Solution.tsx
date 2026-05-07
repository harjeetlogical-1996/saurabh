import { Reveal } from "./Reveal";
import { BgFx } from "./BgFx";

const pillars = [
  {
    n: "01",
    label: "Strategy",
    title: "Start with revenue, not a redesign.",
    body:
      "Goals, ICP, competition, keyword gaps, funnel leaks, mapped before a single pixel or campaign is built. You leave with a written 90-day growth plan.",
  },
  {
    n: "02",
    label: "Execution",
    title: "Specialists for every layer of the stack.",
    body:
      "Designers, Next.js / Webflow / Shopify devs, SEO writers, PPC strategists, AI engineers, all in-house. One project lead (me), one Slack channel, zero handoff chaos.",
  },
  {
    n: "03",
    label: "Growth",
    title: "Launch is week one. Compounding is the goal.",
    body:
      "We track conversions, ROAS, organic traffic, and AI search citations weekly. Double down on what works, kill what doesn't. Quarterly business reviews against revenue.",
  },
];

export function Solution() {
  return (
    <section
      id="solution"
      className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-bright animate-drift opacity-100" />
      </div>
      <BgFx variant="section" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="max-w-[860px]">
          <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            The Solution
          </div>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            We don&apos;t just build websites or run ads. We build{" "}
            <span className="text-[var(--accent)]">end-to-end growth systems.</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            Web development, digital marketing, and AI services, designed to
            work as one engine. Strategy, execution, and growth under one roof,
            measured against the only metric that matters: revenue.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 130}>
              <article className="group relative h-full rounded-2xl p-8 border border-[var(--line)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)] hover:-translate-y-1 transition-all">
                <span
                  aria-hidden
                  className="absolute -top-6 -right-6 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(0,240,255,0.18), transparent 70%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">
                    STEP {p.n} · {p.label.toUpperCase()}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                    →
                  </span>
                </div>
                <div className="relative mt-2 font-display text-[40px] leading-none text-[var(--accent)] text-glow-cyan">
                  {p.n}
                </div>
                <h3 className="relative mt-6 font-display text-[18px] md:text-[20px] leading-[1.3] tracking-[-0.02em] text-white">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-[13px] leading-[1.65] text-[var(--muted)]">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
