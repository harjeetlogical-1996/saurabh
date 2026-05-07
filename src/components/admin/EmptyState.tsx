import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-10 text-center">
      <div className="text-[15px] font-medium text-white">{title}</div>
      {description && (
        <div className="mt-2 text-[13px] text-[var(--muted)] max-w-[420px] mx-auto leading-[1.6]">
          {description}
        </div>
      )}
      {action && <div className="mt-6 inline-flex">{action}</div>}
    </div>
  );
}
