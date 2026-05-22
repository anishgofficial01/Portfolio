import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { EASE } from "./easing";
import { PARALLAX } from "./presets";

export interface ScrollRevealConfig {
  trigger: Element;
  targets: gsap.TweenTarget;
  start?: string;
  y?: number;
  stagger?: number;
  duration?: number;
}

/** Scroll-triggered stagger reveal — fires once on enter */
export function scrollReveal({
  trigger,
  targets,
  start = "top 82%",
  y = 48,
  stagger = 0.1,
  duration = 1.1,
}: ScrollRevealConfig): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: EASE.reveal,
        immediateRender: false,
      });
    },
  });
}

export interface ParallaxConfig {
  trigger: Element;
  target: Element;
  intensity?: number;
  start?: string;
  end?: string;
}

/** Subtle scrub parallax — premium, not distracting */
export function scrollParallax({
  trigger,
  target,
  intensity = PARALLAX.subtle,
  start = "top bottom",
  end = "bottom top",
}: ParallaxConfig): ScrollTrigger {
  return gsap.to(target, {
    y: () => -120 * intensity,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  }).scrollTrigger as ScrollTrigger;
}
