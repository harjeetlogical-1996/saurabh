import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsoleLoginForm } from "./ConsoleLoginForm";

export const metadata: Metadata = {
  title: "Console",
  robots: { index: false, follow: false, nocache: true },
};

export default function ConsoleLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--fg)] px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[10px] tracking-[0.22em] text-[var(--muted)] font-mono uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-blink" />
            Console
          </div>
          <h1 className="mt-6 font-display text-[24px] tracking-[-0.02em]">
            Restricted area
          </h1>
          <p className="mt-2 text-[13px] text-[var(--muted)]">
            Authorized personnel only. All access is logged.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <Suspense fallback={null}>
            <ConsoleLoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--muted)] font-mono">
          v.08 · {new Date().getUTCFullYear()}
        </p>
      </div>
    </main>
  );
}
