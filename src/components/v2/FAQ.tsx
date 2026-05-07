const faqs = [
  {
    q: "How long does a project actually take?",
    a: "Marketing sites: 4 weeks, kickoff to launch. Landing pages: 7 days. I share a Friday-of-each-week milestone schedule on day one — you'll always know what's coming.",
  },
  {
    q: "What do I need to have ready before kickoff?",
    a: "Honestly, very little. Brand assets if you have them, access to your existing analytics, and 60 minutes for a strategy call. I handle the rest — including the messy job of figuring out what to say.",
  },
  {
    q: "Do you work with non-tech founders?",
    a: "Most of my clients are non-tech. You don't need to know what Next.js is. I deliver a fully working site with simple instructions for editing copy and images later.",
  },
  {
    q: "Can you work with my existing brand / designer?",
    a: "Yes. I'll happily plug into your existing Figma system, design tokens, or work alongside an in-house designer. About 30% of my projects look like this.",
  },
  {
    q: "What if I'm not happy with the work?",
    a: "Each package includes 2-3 rounds of revisions. If we get to the end and it's still not right, I'll keep iterating until it is — at no extra cost. I've never had a client take me up on this, but the offer stands.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. Default is 50% upfront, 50% on launch. For Growth and above, I can split into 3 milestone payments. Book a call to discuss.",
  },
];

export function FAQ() {
  return (
    <section className="bg-[var(--bg-cream)] py-24">
      <div className="max-w-[860px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-[var(--accent)] mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] mb-5">
            Questions, answered.
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Don&apos;t see yours?{" "}
            <a href="#contact" className="text-[var(--accent)] underline font-medium">
              Just ask.
            </a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="bg-white rounded-2xl border border-[var(--hairline)] group"
              open={i === 0}
            >
              <summary className="cursor-pointer px-6 py-5 font-semibold text-[var(--ink)] list-none flex justify-between items-center">
                <span>{f.q}</span>
                <span className="text-[var(--accent)] text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-[var(--muted)] leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
