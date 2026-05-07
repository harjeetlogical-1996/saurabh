type Props = {
  action: "Continue" | "Sign up";
};

export function SocialButtons({ action }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[13px] font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        <GoogleIcon />
        {action} with Google
      </button>
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[13px] font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        <GithubIcon />
        {action} with GitHub
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#fff"
        d="M21.35 11.1H12v3.84h5.36c-.23 1.42-1.5 4.18-5.36 4.18a6.12 6.12 0 1 1 0-12.24c1.92 0 3.21.82 3.95 1.52l2.7-2.6C16.84 4.27 14.66 3.3 12 3.3a8.7 8.7 0 1 0 0 17.4c5 0 8.34-3.5 8.34-8.43 0-.57-.06-1-.13-1.45z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.05c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.8c.97 0 1.95.13 2.86.39 2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
