const services = [
  {
    tag: "Most popular",
    tint: "bg-[var(--bg-tint-violet)]",
    icon: "🚀",
    title: "Marketing site",
    desc: "Conversion-first homepage + 4 supporting pages. Copy, design, dev, launch.",
    bullets: ["5 pages", "SEO foundation", "Analytics setup"],
  },
  {
    tag: null,
    tint: "bg-[var(--bg-tint-mint)]",
    icon: "🛬",
    title: "Landing pages",
    desc: "Single-page conversion machines for paid ads, product launches, or specific campaigns.",
    bullets: ["1 focused page", "A/B test ready", "Built in 7 days"],
  },
  {
    tag: null,
    tint: "bg-[var(--bg-tint-amber)]",
    icon: "✍️",
    title: "Copy audit + rewrite",
    desc: "I rewrite your existing site copy without touching the design — fastest path to lift.",
    bullets: ["Per-page review", "New copy delivered", "2-week turnaround"],
  },
  {
    tag: null,
    tint: "bg-[var(--bg-tint-sky)]",
    icon: "🔧",
    title: "Conversion sprint",
    desc: "Two weeks of teardowns, tests, and tweaks on your live site. Best for traffic-rich sites.",
    bullets: ["Heatmap analysis", "3 A/B tests", "Weekly readouts"],
  },
];

export function Services() {
  return (
    <section className="bg-[var(--bg-stone)] py-28" id="services">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-[680px]">
            <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[var(--muted)] mb-5">
              What I do
            </span>
            <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]">
              Four ways I can help your site work harder.
            </h2>
          </div>
          <a
            href="#contact"
            className="text-sm font-semibold text-[var(--ink)] underline decoration-[var(--highlight)] decoration-4 underline-offset-4 hover:decoration-[var(--ink)]"
          >
            Not sure which fits? Let&apos;s chat →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-[var(--hairline)] p-8 relative"
            >
              {s.tag && (
                <span className="absolute top-6 right-6 bg-[var(--ink)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {s.tag}
                </span>
              )}
              <div
                className={`w-14 h-14 rounded-xl ${s.tint} flex items-center justify-center text-3xl mb-6`}
              >
                {s.icon}
              </div>
              <h3 className="font-display text-[24px] text-[var(--ink)] mb-2.5 leading-tight">
                {s.title}
              </h3>
              <p className="text-[var(--muted)] mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-[var(--ink-2)] flex gap-2 items-center"
                  >
                    <span className="text-[var(--ink)]">→</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
