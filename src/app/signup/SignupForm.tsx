"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@/components/Icon";

const perks = [
  "Live project timeline & weekly Loom updates",
  "Centralized deliverables, invoices, and contracts",
  "Slack + email notifications on every milestone",
];

export function SignupForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!agree) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const fullName = [firstName.trim(), lastName.trim()]
        .filter(Boolean)
        .join(" ");
      const res = await authClient.signUp.email({
        email: email.trim().toLowerCase(),
        password,
        name: fullName || email.split("@")[0],
      });
      if (res.error) {
        setError(res.error.message ?? "Could not create account.");
        return;
      }
      // Better Auth auto-signs-in (we set autoSignIn: true). Send to dashboard.
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="First name"
            type="text"
            placeholder="Maya"
            value={firstName}
            onChange={setFirstName}
            autoComplete="given-name"
            required
          />
          <Field
            label="Last name"
            type="text"
            placeholder="Chen"
            value={lastName}
            onChange={setLastName}
            autoComplete="family-name"
          />
        </div>
        <Field
          label="Work email"
          type="email"
          placeholder="you@studio.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Field
          label="Company"
          type="text"
          placeholder="Atlas Studio"
          value={company}
          onChange={setCompany}
          autoComplete="organization"
        />
        <Field
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />

        <label className="flex items-start gap-2.5 text-[13px] text-[var(--muted)]">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--accent)] bg-transparent border border-[var(--line)] rounded"
          />
          <span>
            I agree to the{" "}
            <Link href="#" className="text-white hover:text-[var(--accent)] transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-white hover:text-[var(--accent)] transition-colors">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <div className="text-[13px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold text-[14px] rounded-full hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {submitting ? "Creating account..." : "Create account"}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </form>

      <ul className="mt-7 space-y-2.5">
        {perks.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2.5 text-[13px] text-white/85"
          >
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              <Icon name="check" size={11} strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 h-12 w-full rounded-xl bg-[var(--surface)] border border-[var(--line)] px-4 text-[14px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)]"
      />
    </label>
  );
}
