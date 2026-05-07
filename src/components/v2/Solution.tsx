export function Solution() {
  const pillars = [
    {
      num: "01",
      title: "Conversion-first design",
      desc: "Every section is a decision point. We design around the action you want visitors to take — not around what looks good in a portfolio.",
    },
    {
      num: "02",
      title: "Copy that does the selling",
      desc: "I write the words first, then design around them. Your visitor's brain reads before it sees pretty pictures.",
    },
    {
      num: "03",
      title: "Fast, owned, no lock-in",
      desc: "Built on Next.js. Deploy anywhere. No bloated page builders, no monthly platform fees.",
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[var(--muted)] mb-5">
            My approach
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.02em] text-[var(--ink)] mb-7">
            One person, one focus,{" "}
            <span className="italic">end-to-end ownership.</span>
          </h2>
          <p className="text-lg text-[var(--muted)] mb-7 leading-relaxed">
            No handoffs. No agency overhead. Just one senior generalist who handles strategy,
            copy, design, and code — so the message stays sharp from line one to last pixel.
          </p>
          <div className="bg-[var(--ink)] rounded-2xl p-7">
            <div className="font-display text-4xl text-[var(--highlight)] mb-1">4 weeks</div>
            <div className="text-sm text-stone-300">
              From kickoff call to launched site — every single time.
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="bg-[var(--bg-cream)] border border-[var(--hairline)] rounded-2xl p-7 flex gap-6 hover:bg-[var(--bg-stone)] transition-colors"
            >
              <div className="font-display text-5xl text-[var(--ink)] opacity-15 leading-none">
                {p.num}
              </div>
              <div>
                <h3 className="font-display text-[22px] text-[var(--ink)] mb-2 leading-tight">
                  {p.title}
                </h3>
                <p className="text-[var(--muted)] text-[15px] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
