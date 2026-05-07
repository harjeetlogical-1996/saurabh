import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in · Saurabh Bhayana",
  description:
    "Log in to your Saurabh Bhayana client portal. Projects, deliverables, invoices, and updates in one place.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Sign in · Client portal"
      title="Welcome back."
      highlight="Let's get to work."
      description="Log in to view your active projects, weekly updates, deliverables, and invoices."
      altLink={{ label: "New here?", href: "/signup" }}
      altCta="Create an account"
    >
      <SocialButtons action="Continue" />

      <div className="my-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or continue with email
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
