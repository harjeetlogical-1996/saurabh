import { Reveal } from "./Reveal";
import { getAllSettings } from "@/lib/settings";

export async function Logos() {
  const s = await getAllSettings();
  const stats = [
    { v: s["stats.projects"], k: s["stats.projects_label"] },
    { v: s["stats.revenue"], k: s["stats.revenue_label"] },
    { v: s["stats.countries"], k: s["stats.countries_label"] },
    { v: s["stats.rating"], k: s["stats.rating_label"] },
  ];

  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-[1240px] mx-auto px-6 py-14 md:py-20">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden">
            {stats.map((stat) => (
              <div
                key={stat.k}
                className="bg-[var(--bg)] p-7 md:p-9 hover:bg-[var(--surface)] transition-colors group"
              >
                <div className="font-display text-[36px] md:text-[44px] leading-none tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                  {stat.v}
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] font-mono">
                  {stat.k}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
