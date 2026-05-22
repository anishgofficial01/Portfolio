"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useIsTouchDevice } from "./useIsTouchDevice";

interface MagneticOptions {
  strength?: number;
}

/**
 * Subtle magnetic pull on hover — premium, restrained.
 * Attach ref to interactive element.
 */
export function useMagneticHover<T extends HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { strength = 0.35 } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion || isTouch) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (e: MouseEvent): void => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * strength;
      const y = (e.clientY - top - height / 2) * strength;
      xTo(x);
      yTo(y);
    };

    const handleLeave = (): void => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [prefersReducedMotion, isTouch, strength]);

  return ref;
}
