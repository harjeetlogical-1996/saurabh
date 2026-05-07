import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

const fieldClass =
  "h-11 w-full rounded-lg bg-[var(--bg)] border border-[var(--line)] px-3 text-[14px] text-white placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] transition-colors";
const textareaClass = fieldClass.replace("h-11", "min-h-[120px] py-2.5");

type LabelProps = {
  label: string;
  hint?: ReactNode;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export function Field({ label, hint, required, error, children }: LabelProps) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] font-mono">
        <span>
          {label}
          {required && <span className="text-[var(--accent)]"> *</span>}
        </span>
        {hint && (
          <span className="text-[var(--muted)] normal-case tracking-normal text-[11px]">
            {hint}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <div className="mt-1.5 text-[12px] text-red-400 font-mono">{error}</div>
      )}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${textareaClass} ${props.className ?? ""}`} />;
}

export function SelectInput({
  options,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <select {...rest} className={`${fieldClass} ${rest.className ?? ""}`}>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[var(--bg)] text-white">
          {o.label}
        </option>
      ))}
    </select>
  );
}
