import { gsap } from "gsap";

import { EASE } from "./easing";

export interface RevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

/** Staggered text/element reveal — primary cinematic entrance */
export function revealStagger(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
): gsap.core.Tween {
  const {
    y = 48,
    opacity = 0,
    duration = 1.1,
    delay = 0,
    stagger = 0.08,
    ease = EASE.reveal,
  } = options;

  return gsap.from(targets, {
    y,
    opacity,
    duration,
    delay,
    stagger,
    ease,
  });
}

/** Fade-only reveal for subtle sections — Framer Motion variant */
export const fadeRevealVars = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

/** Parallax intensity presets — keep subtle for premium feel */
export const PARALLAX = {
  subtle: 0.15,
  medium: 0.35,
  strong: 0.55,
} as const;
