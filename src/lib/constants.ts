/** Breakpoints aligned with Tailwind defaults */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Site-wide motion and layout constants */
export const MOTION = {
  lenisDuration: 1.2,
  staggerDefault: 0.08,
  revealDuration: 1.1,
  revealEase: "power3.out",
} as const;

/** Loader timing — cinematic pacing, not rushed */
export const LOADER = {
  counterDuration: 2.4,
  holdDuration: 0.35,
  exitDuration: 1.15,
} as const;

export const LAYOUT = {
  maxWidth: 1440,
  gutter: "var(--space-gutter)",
  gutterFull: "var(--space-gutter-full)",
  sectionPaddingY: "var(--space-section-y)",
} as const;
