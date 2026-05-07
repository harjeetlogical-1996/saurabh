"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        rememberMe: remember,
      });
      if (res.error) {
        setError(res.error.message ?? "Could not sign in. Check your details.");
        return;
      }
      router.push(next);
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
        <Field
          label="Email"
          type="email"
          placeholder="you@studio.com"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
          trailingLink={{ label: "Forgot?", href: "#" }}
        />

        <label className="flex items-center gap-2 text-[13px] text-[var(--muted)]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)] bg-transparent border border-[var(--line)] rounded"
          />
          Keep me signed in for 30 days
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
          {submitting ? "Signing in..." : "Sign in"}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </form>

      <p className="mt-6 text-[12px] text-[var(--muted)] text-center">
        Need help signing in?{" "}
        <Link
          href="/contact"
          className="text-white hover:text-[var(--accent)] transition-colors"
        >
          Contact support
        </Link>
      </p>
    </>
  );
}

type FieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  trailingLink?: { label: string; href: string };
};

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  trailingLink,
}: FieldProps) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
        <span>{label}</span>
        {trailingLink && (
          <Link
            href={trailingLink.href}
            className="text-[var(--accent)] hover:opacity-80 transition-opacity normal-case tracking-normal"
          >
            {trailingLink.label}
          </Link>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-xl bg-[var(--surface)] border border-[var(--line)] px-4 text-[14px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)]"
      />
    </label>
  );
}
