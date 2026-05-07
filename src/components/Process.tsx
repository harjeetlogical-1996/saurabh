import { Reveal } from "./Reveal";
import { BgFx } from "./BgFx";

const steps = [
  {
    n: "01",
    label: "Discovery",
    title: "Diagnose business, audience, and revenue goals.",
    body:
      "30-min call + audit of your site, SEO, ads, and analytics. You leave with a written strategy doc, yours to keep, regardless of next step.",
    duration: "Week 1 · Free",
  },
  {
    n: "02",
    label: "Strategy",
    title: "Map the build, the launch, and the metrics.",
    body:
      "Site architecture, keyword universe, ad accounts, AI workflows, KPIs. Fixed quote, fixed timeline, no scope creep. You approve before a pixel moves.",
    duration: "Week 2",
  },
  {
    n: "03",
    label: "Execution",
    title: "Specialists ship. I supervise. You approve.",
    body:
      "Design → dev → copy → campaigns. Weekly Loom updates, Slack-based comms, milestone approvals. Async-first. No surprise invoices, ever.",
    duration: "Week 3–6",
  },
  {
    n: "04",
    label: "Growth",
    title: "Launch, measure, double down on winners.",
    body:
      "First 30 days of optimization included. Then a monthly retainer or sprint cycle, pick what fits. Reviewed against revenue, not vanity metrics.",
    duration: "Week 7+",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 z-0 bg-grid opacity-100" />
      <BgFx variant="subtle" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="text-center max-w-[820px] mx-auto">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            A founder-friendly process.{" "}
            <span className="text-[var(--accent)]">Clarity over chaos.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            Fixed scope. Fixed timeline. Fixed quote. No hidden hours, no
            silent weeks, no vanishing acts. Here&apos;s exactly what every
            engagement looks like, for web development, digital marketing,
            and AI projects alike.
          </p>
        </Reveal>

        <div className="relative mt-20">
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,240,255,0.4) 20%, rgba(0,240,255,0.4) 80%, transparent)",
            }}
          />
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 130} as="li">
                <div className="relative h-full">
                  <div className="hidden md:block absolute -top-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)] glow-cyan" />
                  <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] hover:-translate-y-1 transition-all h-full">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-[32px] leading-none tracking-tight text-[var(--accent)]">
                        {s.n}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
                        {s.duration}
                      </span>
                    </div>
                    <div className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                      {s.label}
                    </div>
                    <h3 className="mt-2 font-display text-[16px] leading-[1.3] tracking-[-0.015em] text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.65] text-[var(--muted)]">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
      <span className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </div>
  );
}
