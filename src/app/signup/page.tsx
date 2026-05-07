import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Create an account · Saurabh Bhayana",
  description:
    "Create your Saurabh Bhayana client account. Track projects, view deliverables, and stay on top of every milestone.",
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Create account · Client portal"
      title="Get started in"
      highlight="under a minute."
      description="Set up your client portal so you can follow projects, approve milestones, and download deliverables in one place."
      altLink={{ label: "Already a client?", href: "/login" }}
      altCta="Sign in"
    >
      <SocialButtons action="Sign up" />

      <div className="my-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or sign up with email
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>

      <SignupForm />
    </AuthShell>
  );
}
