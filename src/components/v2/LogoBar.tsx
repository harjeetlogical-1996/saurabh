export function LogoBar() {
  const logos = ["TechCrunch", "Product Hunt", "Forbes", "Indie Hackers", "Y Combinator", "Hacker News"];
  return (
    <section className="bg-white py-14 border-b border-[var(--hairline)]">
      <div className="max-w-[1240px] mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[2.5px] text-[var(--muted)] mb-9 font-medium">
          As featured in
        </p>
        <div className="flex justify-around items-center flex-wrap gap-x-12 gap-y-5">
          {logos.map((l) => (
            <div
              key={l}
              className="font-display text-xl text-[var(--ink-2)] opacity-60 hover:opacity-100 transition-opacity"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
