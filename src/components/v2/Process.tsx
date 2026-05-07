const steps = [
  {
    week: "Week 1",
    title: "Discovery + strategy",
    desc: "60-min call, audience research, competitive teardown, sitemap & messaging brief locked.",
  },
  {
    week: "Week 2",
    title: "Copywriting",
    desc: "I draft full page-by-page copy. You give one round of feedback. Locked by Friday.",
  },
  {
    week: "Week 3",
    title: "Design + build",
    desc: "Figma + Next.js in parallel. Daily Loom updates. You see it come together in real-time.",
  },
  {
    week: "Week 4",
    title: "Polish + launch",
    desc: "QA, accessibility, analytics, deployment. We hit publish together on Friday.",
  },
];

export function Process() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent-2)] mb-4">
            How we work together
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] mb-5">
            Four weeks. No surprises.
          </h2>
          <p className="text-lg text-[var(--muted)]">
            A simple, predictable process. You always know what&apos;s next.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 relative">
          <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] opacity-30" />
          {steps.map((s, i) => (
            <div key={s.week} className="relative bg-white">
              <div className="w-[72px] h-[72px] rounded-full accent-gradient flex items-center justify-center text-2xl font-extrabold text-white mx-auto mb-5 shadow-[0_10px_25px_-10px_rgba(79,70,229,0.5)]">
                {i + 1}
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                  {s.week}
                </div>
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{s.title}</h3>
                <p className="text-[var(--muted)] text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
