import Link from "next/link";

const tools = [
  {
    tint: "bg-[var(--bg-tint-mint)]",
    icon: "🎯",
    title: "Headline Hook Generator",
    desc: "Get 10 tested headline angles for your product in 30 seconds. Free, no signup.",
    cta: "Try the tool",
  },
  {
    tint: "bg-[var(--bg-tint-amber)]",
    icon: "🔍",
    title: "Free site teardown (5 min)",
    desc: "Drop your URL. I send back a 5-minute Loom with the top 3 things killing your conversions.",
    cta: "Get teardown",
  },
  {
    tint: "bg-[var(--bg-tint-sky)]",
    icon: "📚",
    title: "Conversion Copy Cheatsheet",
    desc: "47 plug-and-play formulas I steal from every time I write a homepage. PDF download.",
    cta: "Download free",
  },
];

export function FreeTools() {
  return (
    <section className="bg-[var(--bg-cream)] py-24" id="free-tools">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent)] mb-4">
            Free resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] mb-5">
            Steal my best stuff. Free.
          </h2>
          <p className="text-lg text-[var(--muted)]">
            No email gates. No upsells. Just useful tools and templates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((t) => (
            <div
              key={t.title}
              className="bg-white rounded-2xl border border-[var(--hairline)] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className={`${t.tint} p-8 text-center text-5xl`}>{t.icon}</div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{t.title}</h3>
                <p className="text-[var(--muted)] text-sm mb-5">{t.desc}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  {t.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
