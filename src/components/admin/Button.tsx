import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-black hover:shadow-[0_0_24px_var(--accent-glow)] border border-[var(--accent)]",
  secondary:
    "bg-transparent text-white border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  danger:
    "bg-transparent text-red-400 border border-red-500/30 hover:border-red-400 hover:bg-red-500/10",
  ghost: "bg-transparent text-[var(--muted)] hover:text-[var(--accent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px] rounded-lg",
  md: "h-10 px-4 text-[13px] rounded-full",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = CommonProps & {
  href: string;
  download?: boolean;
};

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = [
    "inline-flex items-center justify-center gap-1.5 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
    styles[variant],
    sizes[size],
    props.className ?? "",
  ].join(" ");

  if ("href" in props && props.href) {
    const { href, download, children } = props;
    return (
      <Link href={href} className={className} download={download}>
        {children}
      </Link>
    );
  }

  const { children, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonProps;
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}
