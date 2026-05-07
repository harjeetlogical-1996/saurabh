type IconName =
  // Tech / stack icons
  | "rocket"
  | "settings"
  | "package"
  | "cart"
  | "palette"
  | "cloud"
  | "wrench"
  | "trending-up"
  | "bot"
  | "bar-chart"
  // Service / status icons
  | "target"
  | "trending-down"
  | "search"
  | "zap"
  | "flame"
  | "gem"
  // Admin nav / actions
  | "file-text"
  | "quote"
  | "briefcase"
  | "users"
  | "clock"
  | "pencil"
  | "trash"
  | "eye"
  | "eye-off"
  | "home"
  | "lock"
  | "list"
  | "tag"
  // UI utility
  | "check"
  | "arrow-right"
  | "x"
  | "plus";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

/**
 * Minimal Lucide-style icon set. SVG strokes inherit from `currentColor`,
 * so size + color come from parent class names.
 */
export function Icon({ name, size = 16, className = "", strokeWidth = 1.75 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "rocket":
      return (
        <svg {...common}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="M3.3 7 12 12l8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M17.5 19a4.5 4.5 0 1 0-1.41-8.775 5.5 5.5 0 0 0-10.825 2.275A4.5 4.5 0 0 0 6.5 19z" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
        </svg>
      );
    case "trending-up":
      return (
        <svg {...common}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...common}>
          <line x1="12" x2="12" y1="20" y2="10" />
          <line x1="18" x2="18" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="16" />
          <line x1="3" x2="21" y1="20" y2="20" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "trending-down":
      return (
        <svg {...common}>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline points="16 17 22 17 22 11" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "gem":
      return (
        <svg {...common}>
          <path d="M6 3h12l4 6-10 13L2 9z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "file-text":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
          <line x1="8" y1="9" x2="10" y2="9" />
        </svg>
      );
    case "quote":
      return (
        <svg {...common}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...common}>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9.5l9-7 9 7V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    default:
      return null;
  }
}
