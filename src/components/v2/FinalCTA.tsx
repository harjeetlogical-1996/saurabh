import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-white py-24" id="contact">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl accent-gradient px-8 md:px-16 py-16 md:py-20 text-center">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: "white" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: "white" }}
          />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.05]">
              Let&apos;s build the website
              <br />
              your business deserves.
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-[600px] mx-auto">
              Free 30-minute strategy call. No pitch deck. No pressure. Just a real conversation
              about your site and what to do next.
            </p>

            <div className="flex gap-3 justify-center flex-wrap mb-10">
              <Link
                href="#"
                className="bg-white text-[var(--accent)] font-bold px-7 py-4 rounded-full shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-transform"
              >
                Book your free call →
              </Link>
              <Link
                href="mailto:hi@aanyakapoor.com"
                className="bg-transparent border-2 border-white/30 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Or just email me
              </Link>
            </div>

            <div className="flex justify-center gap-8 text-white/80 text-sm flex-wrap">
              <span>✓ Reply within 24 hrs</span>
              <span>✓ No obligation</span>
              <span>✓ 2 spots left for Q3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
