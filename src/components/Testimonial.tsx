import Image from "next/image";
import { Reveal } from "./Reveal";
import {
  getHomepageTestimonials,
  type TestimonialItem,
} from "@/lib/content/testimonials";
import { getAllSettings } from "@/lib/settings";

export async function Testimonial() {
  const [quotes, settings] = await Promise.all([
    getHomepageTestimonials(),
    getAllSettings(),
  ]);

  const stats = [
    { v: settings["stats.projects"], k: "Founders served" },
    { v: "92%", k: "Client retention" },
    { v: settings["stats.revenue"], k: "Revenue driven" },
    { v: settings["stats.rating"], k: "Average rating" },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-28 md:py-40">
        <Reveal className="text-center max-w-[820px] mx-auto">
          <div className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--accent)] font-mono">
            <span className="h-px w-8 bg-[var(--accent)]" />
            From clients
          </div>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em]">
            Real founders.{" "}
            <span className="text-[var(--accent)]">Real revenue results.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.7] text-[var(--muted)]">
            From early-stage SaaS to D2C brands to professional services, here&apos;s what a few of them say after working with us.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <Reveal key={`${q.name}-${i}`} delay={i * 130}>
              <Card item={q} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.k}
                className="bg-[var(--surface)] p-7 hover:bg-[var(--bg)] hover:text-[var(--accent)] transition-colors group"
              >
                <div className="font-display text-[28px] leading-none tracking-tight">
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] font-mono group-hover:text-[var(--accent)] transition-colors">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ item }: { item: TestimonialItem }) {
  const featured = !!item.featured;
  return (
    <figure
      className={`group h-full rounded-2xl p-7 transition-all hover:-translate-y-1 ${
        featured
          ? "bg-[var(--accent)] text-black border border-[var(--accent)]"
          : "bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)]"
      }`}
    >
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        className={featured ? "text-black" : "text-[var(--accent)]"}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 22V12C0 5 4 1 11 0v5C7 6 5 8 5 12h6v10H0Zm17 0V12c0-7 4-11 11-12v5c-4 1-6 3-6 7h6v10H17Z"
        />
      </svg>
      <blockquote
        className={`mt-5 font-display text-[16px] md:text-[18px] leading-[1.5] tracking-[-0.01em] ${
          featured ? "text-black" : "text-white"
        }`}
      >
        {item.body}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        {item.avatarUrl && (
          <span className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-current">
            <Image
              src={item.avatarUrl}
              alt={`${item.name}${item.role ? `, ${item.role}` : ""}`}
              width={44}
              height={44}
              className="object-cover grayscale group-hover:grayscale-0 transition"
            />
          </span>
        )}
        <div>
          <div className="text-[14px] font-semibold leading-tight">
            {item.name}
          </div>
          {item.role && (
            <div
              className={`text-[12px] ${
                featured ? "text-black/60" : "text-[var(--muted)]"
              }`}
            >
              {item.role}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
