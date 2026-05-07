import Link from "next/link";

export function AboutMe() {
  return (
    <section className="dark-surface py-28" id="about">
      <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-[320px_1fr] gap-14 items-center">
        <div className="relative mx-auto lg:mx-0">
          <div className="w-72 h-72 rounded-3xl bg-[var(--highlight)] flex items-center justify-center font-display text-8xl text-[var(--ink)]">
            AK
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg">
            <div className="text-2xl">👋</div>
          </div>
        </div>

        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-[2.5px] text-[var(--surface-muted)] mb-5">
            About me
          </span>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-[var(--surface-ink)] mb-6">
            Hi, I&apos;m Aanya. I help founders build websites that{" "}
            <span className="italic text-[var(--highlight)]">pay for themselves.</span>
          </h2>
          <p className="text-stone-300 text-lg mb-5 leading-relaxed">
            For 9 years I designed and built sites at agencies in Bangalore and Berlin. In 2023 I
            went solo. Since then I&apos;ve shipped 50+ founder sites across SaaS, e-com, and
            creator businesses.
          </p>
          <p className="text-[var(--surface-muted)] mb-7 leading-relaxed">
            I write the copy. I design the pages. I ship the code. End-to-end. No subcontractors,
            no surprises.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--highlight)] hover:underline"
          >
            More about my journey →
          </Link>
        </div>
      </div>
    </section>
  );
}
