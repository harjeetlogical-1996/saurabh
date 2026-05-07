export function Problem() {
  const problems = [
    {
      icon: "😩",
      title: "Your site looks pretty but doesn't convert",
      desc: "You spent $5K on a designer and got a beautiful website. But traffic comes in and leaves without buying.",
    },
    {
      icon: "🐌",
      title: "Agencies take months and burn cash",
      desc: "Three-month timelines, change requests, weekly status calls — and the launch keeps slipping further.",
    },
    {
      icon: "🤹",
      title: "Freelancers ghost or deliver half-baked work",
      desc: "You've been burned before. Designer, copywriter, dev — three handoffs, three opportunities for things to break.",
    },
  ];

  return (
    <section className="bg-[var(--bg-cream)] py-28">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[var(--muted)] mb-5">
            The problem
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--ink)] mb-6">
            Your website is your hardest-working employee.{" "}
            <span className="italic text-[var(--muted)]">And it&apos;s probably underperforming.</span>
          </h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Most founder websites fail for the same three reasons. Sound familiar?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-8 border border-[var(--hairline)]"
            >
              <div className="text-4xl mb-5">{p.icon}</div>
              <h3 className="font-display text-[22px] text-[var(--ink)] mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-[var(--muted)] text-[15px] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
