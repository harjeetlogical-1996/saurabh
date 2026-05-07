type Props = {
  variant?: "hero" | "section" | "subtle";
};

/**
 * Decorative background fx, pure CSS / SVG, no color other than cyan accent.
 * variant:
 *   hero, full set (particles + orbit + halo + scan beam + dash svg)
 *   section, particles + halo + dash svg
 *   subtle, particles only
 */
export function BgFx({ variant = "section" }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Drifting particles */}
      <Particles count={variant === "hero" ? 36 : variant === "section" ? 24 : 16} />

      {variant !== "subtle" && (
        <>
          {/* Halo */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full animate-halo"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,240,255,0.22), transparent 70%)",
            }}
          />

          {/* Dashed flowing path */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
          >
            <path
              d="M-50 600 C 300 400, 500 700, 800 500 S 1300 350, 1500 550"
              stroke="rgba(0,240,255,0.55)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6 10"
              className="animate-dash"
            />
            <path
              d="M-50 250 C 200 480, 600 100, 900 320 S 1300 600, 1500 380"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 8"
              className="animate-dash"
              style={{ animationDuration: "22s" }}
            />
          </svg>
        </>
      )}

      {variant === "hero" && (
        <>
          {/* Extra slow-drifting cyan blob, pure background, no objects */}
          <div
            className="absolute left-[15%] top-[20%] h-[420px] w-[420px] rounded-full animate-floaty-slow"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,240,255,0.10), transparent 70%)",
            }}
          />
          <div
            className="absolute right-[10%] bottom-[10%] h-[360px] w-[360px] rounded-full animate-floaty"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.05), transparent 70%)",
            }}
          />
        </>
      )}
    </div>
  );
}

function Particles({ count }: { count: number }) {
  // Deterministic positions so SSR matches client render
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = (i + 1) * 9301 + 49297;
    const left = (seed % 1000) / 10; // 0..100
    const size = i % 4 === 0 ? 4 : i % 4 === 1 ? 3 : i % 4 === 2 ? 2.5 : 2;
    const delay = (i * 1.3) % 18;
    const slow = i % 2 === 0;
    const cyan = i % 2 === 0; // half are cyan now
    return { left, size, delay, slow, cyan, key: i };
  });

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.key}
          className={`absolute bottom-0 rounded-full ${
            p.slow ? "animate-drift-up-slow" : "animate-drift-up"
          }`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.cyan
              ? "rgba(0, 240, 255, 1)"
              : "rgba(255, 255, 255, 0.85)",
            boxShadow: p.cyan
              ? "0 0 14px rgba(0,240,255,0.9), 0 0 4px rgba(0,240,255,1)"
              : "0 0 6px rgba(255,255,255,0.6)",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
