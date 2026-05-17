import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth-server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Dashboard · Saurabh Bhayana",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await requireUser("/dashboard");
  const user = session.user as unknown as {
    name?: string;
    email: string;
    role?: string;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--bg)]">
        <div className="max-w-[1240px] mx-auto px-6 py-16 md:py-24">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
              Client portal
            </div>
            <h1 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.025em]">
              Welcome,{" "}
              <span className="text-[var(--accent)]">
                {user.name?.split(" ")[0] || user.email.split("@")[0]}.
              </span>
            </h1>
            <p className="mt-3 text-[14px] md:text-[15px] text-[var(--muted)] leading-[1.7] max-w-[560px]">
              Your client portal is being set up. Soon you&apos;ll see your
              active projects, weekly Loom updates, deliverables, and
              invoices here.
            </p>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link
                href="/services"
                className="inline-flex h-11 items-center gap-2 px-5 rounded-full bg-[var(--accent)] text-black font-semibold text-[13px] hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow"
              >
                Browse services <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center px-5 rounded-full border border-[var(--line)] text-white text-[13px] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Start a new project
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/sb-console"
                  className="inline-flex h-11 items-center gap-2 px-5 rounded-full border border-[var(--accent)]/40 text-[var(--accent)] text-[13px] hover:bg-[var(--accent)] hover:text-black transition-colors"
                >
                  <Icon name="settings" size={14} strokeWidth={1.75} />
                  Admin dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Tools workspace card — opens the subdomain that hosts the
              creator tools (audio→video, captions, voice-pair). Shares
              the same .saurabhbhayana.com session cookie so users land
              already-signed-in. */}
          <a
            href="https://tool.saurabhbhayana.com"
            className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 flex items-center justify-between gap-6 group hover:border-[var(--accent)]/60 hover:bg-[var(--surface)]/80 transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Self-serve tools
              </div>
              <h2 className="mt-2 font-display text-[20px] md:text-[24px] tracking-[-0.02em]">
                Open the Tools workspace
              </h2>
              <p className="mt-2 text-[13.5px] md:text-[14px] text-[var(--muted)] leading-[1.6] max-w-[520px]">
                Audio→Video reels, AI captions in 17 styles, and Voice Pair
                (pair media with voiceovers). All your renders, all in one
                place.
              </p>
            </div>
            <div className="shrink-0 inline-flex h-11 items-center gap-2 px-5 rounded-full bg-[var(--accent)] text-black font-semibold text-[13px] group-hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow">
              Open tools <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
