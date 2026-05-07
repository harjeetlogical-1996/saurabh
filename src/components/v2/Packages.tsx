import Link from "next/link";

const packages = [
  {
    name: "Starter",
    price: "$2,400",
    sub: "one-time",
    desc: "Single high-converting landing page.",
    bg: "bg-white",
    features: [
      "1 landing page",
      "Copy + design + build",
      "2 rounds of revisions",
      "Delivered in 7 days",
      "30-day support",
    ],
    cta: "Book Starter",
    popular: false,
  },
  {
    name: "Growth",
    price: "$6,800",
    sub: "one-time",
    desc: "Full marketing site for serious founders.",
    bg: "bg-[var(--bg-tint-violet)]",
    features: [
      "5-page marketing site",
      "Strategy + copy + design + build",
      "3 rounds of revisions",
      "SEO foundation + analytics",
      "Delivered in 4 weeks",
      "60-day support",
    ],
    cta: "Book Growth",
    popular: true,
  },
  {
    name: "Partner",
    price: "$3,200",
    sub: "/month",
    desc: "Ongoing optimization for growing sites.",
    bg: "bg-white",
    features: [
      "Monthly conversion sprints",
      "A/B testing & teardowns",
      "Slack support",
      "10 hrs/mo of design + dev",
      "Cancel anytime",
    ],
    cta: "Talk partnership",
    popular: false,
  },
];

export function Packages() {
  return (
    <section className="bg-[var(--bg-cream)] py-24" id="packages">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent)] mb-4">
            Packages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] mb-5">
            Pick the package that fits.
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Fixed scope. Fixed price. Fixed timeline. No hourly billing surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`${p.bg} relative rounded-2xl p-7 border ${
                p.popular
                  ? "border-[var(--accent)] shadow-[0_20px_50px_-15px_rgba(79,70,229,0.3)]"
                  : "border-[var(--hairline)]"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 accent-gradient text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most chosen
                </span>
              )}
              <div className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                {p.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-[var(--ink)]">{p.price}</span>
                <span className="text-sm text-[var(--muted)]">{p.sub}</span>
              </div>
              <p className="text-[var(--muted)] text-sm mb-6">{p.desc}</p>
              <ul className="space-y-2 mb-7">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-[var(--ink-2)] flex gap-2 items-start"
                  >
                    <span className="text-[var(--accent)] mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className={`block w-full text-center font-semibold px-4 py-3 rounded-full transition-all ${
                  p.popular
                    ? "accent-gradient text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:-translate-y-0.5"
                    : "bg-white border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
