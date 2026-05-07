"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const SERVICES = [
  "Website Development",
  "Digital Marketing",
  "AI Services",
  "Multiple / Not sure yet",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          budget,
          service,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not send. Please try again.");
        return;
      }
      setSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setBudget("");
      setService("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] p-10 md:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
          <Icon name="check" size={24} strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-display text-[26px] md:text-[32px] leading-[1.1] tracking-[-0.025em]">
          Brief received.{" "}
          <span className="text-[var(--accent)]">We&apos;ll reply within 1 business day.</span>
        </h3>
        <p className="mt-4 text-[14px] leading-[1.7] text-[var(--muted)] max-w-[440px]">
          Saurabh personally reads every brief. Expect a short reply with
          either a discovery-call link, a few clarifying questions, or an
          honest referral if we&apos;re not the right fit.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-[13px] font-medium text-[var(--accent)] border-b border-[var(--accent)] pb-0.5 hover:opacity-80 transition-opacity"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 md:p-10"
    >
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
          Project Brief
        </div>
        <span className="font-mono text-[10px] text-[var(--muted)]">
          Step 1 / 1
        </span>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Your name"
          type="text"
          placeholder="Maya Chen"
          value={name}
          onChange={setName}
          autoComplete="name"
          required
        />
        <Field
          label="Work email"
          type="email"
          placeholder="you@studio.com"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Company"
          type="text"
          placeholder="Atlas Studio"
          value={company}
          onChange={setCompany}
          autoComplete="organization"
        />
        <Select
          label="Budget"
          options={BUDGETS}
          value={budget}
          onChange={setBudget}
        />
      </div>

      <div className="mt-4">
        <Select
          label="Service you're interested in"
          options={SERVICES}
          value={service}
          onChange={setService}
        />
      </div>

      <div className="mt-4">
        <label className="block">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
            Tell us about your project
          </div>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Goals, audience, timeline, anything that helps us prep."
            className="mt-2 w-full rounded-xl bg-[var(--bg)] border border-[var(--line)] px-4 py-3 text-[14px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)]"
          />
        </label>
      </div>

      {error && (
        <div className="mt-5 text-[13px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-7 inline-flex h-12 items-center justify-center gap-2 bg-[var(--accent)] text-black font-semibold text-[14px] rounded-full px-7 hover:-translate-y-0.5 hover:shadow-[0_0_36px_var(--accent-glow)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {submitting ? "Sending..." : "Send brief"}
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>

      <p className="mt-5 text-[12px] text-[var(--muted)] leading-[1.6]">
        By submitting this form, you agree to our{" "}
        <Link
          href="#"
          className="text-white hover:text-[var(--accent)] transition-colors"
        >
          Privacy Policy
        </Link>
        . We&apos;ll reply within 1 business day.
      </p>
    </form>
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
        className="mt-2 h-12 w-full rounded-xl bg-[var(--bg)] border border-[var(--line)] px-4 text-[14px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] font-mono">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-xl bg-[var(--bg)] border border-[var(--line)] px-4 text-[14px] text-white outline-none transition-colors focus:border-[var(--accent)]"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--bg)] text-white">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
