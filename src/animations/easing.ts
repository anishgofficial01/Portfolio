/** GSAP-compatible easing strings — cinematic, never bouncy */
export const EASE = {
  premium: "power3.out",
  cinematic: "power4.inOut",
  reveal: "power3.out",
  exit: "power2.in",
  scroll: "none",
} as const;

/** CSS easing for Framer Motion and transitions */
export const CSS_EASE = {
  premium: [0.22, 1, 0.36, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
};

export type EaseKey = keyof typeof EASE;
