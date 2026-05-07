const items = [
  {
    quote:
      "Aanya rewrote our homepage and trial signups doubled in two weeks. Same traffic, just better words.",
    name: "Rahul Mehta",
    role: "Founder, Linkly",
    initials: "RM",
    tint: "bg-[var(--bg-tint-violet)]",
  },
  {
    quote:
      "I've worked with three agencies before this. Aanya delivered more in 4 weeks than they did in 6 months.",
    name: "Priya Shah",
    role: "CEO, Roastery Co.",
    initials: "PS",
    tint: "bg-[var(--bg-tint-mint)]",
  },
  {
    quote:
      "Best money I've spent on the business this year. Page paid for itself in the first 48 hours.",
    name: "Meena Iyer",
    role: "Course creator",
    initials: "MI",
    tint: "bg-[var(--bg-tint-amber)]",
  },
  {
    quote:
      "She doesn't just design — she thinks about your business. Every section had a reason.",
    name: "James Walker",
    role: "Co-founder, Hopper",
    initials: "JW",
    tint: "bg-[var(--bg-tint-sky)]",
  },
];

export function Testimonials2() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent-2)] mb-4">
            Kind words
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
            Founders who&apos;ve been there.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
          {items.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-[var(--hairline)] rounded-2xl p-7 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
              <blockquote className="text-[17px] text-[var(--ink)] leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className={`${t.tint} w-11 h-11 rounded-full flex items-center justify-center font-bold text-[var(--ink)]`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[var(--ink)] text-sm">{t.name}</div>
                  <div className="text-xs text-[var(--muted)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
