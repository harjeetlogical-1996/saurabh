import { Reveal } from "../Reveal";
import { BgFx } from "../BgFx";

const steps = [
  {
    n: "01",
    label: "Discovery",
    title: "Free 30-min call",
    body: "We diagnose where you are now and where revenue should come from next.",
  },
  {
    n: "02",
    label: "Proposal",
    title: "Scope, timeline, fixed quote",
    body: "Inside 48 hours. No hourly games. No surprise invoices later.",
  },
  {
    n: "03",
    label: "Kickoff",
    title: "Strategy + onboarding",
    body: "Slack channel, milestones, weekly Loom updates from day one.",
  },
  {
    n: "04",
    label: "Delivery",
    title: "Build, launch, scale",
    body: "Specialists execute, I supervise, you approve. Then we keep growing.",
  },
];

export function ServicesProcess() {
  return (
    <section className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden">
      <BgFx variant="subtle" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-24 md:py-32">
        <Reveal className="text-center max-w-[820px] mx-auto">
          <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            Engagement Model
          </div>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            From hello to{" "}
            <span className="text-[var(--accent)]">launch</span>, in four steps.
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            Whether you choose website development, digital marketing, or both, every engagement follows the same clear path.
          </p>
        </Reveal>

        <div className="relative mt-16">
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
                    <span className="font-display text-[32px] leading-none tracking-tight text-[var(--accent)]">
                      {s.n}
                    </span>
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
