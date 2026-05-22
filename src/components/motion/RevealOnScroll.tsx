"use client";

import { gsap } from "gsap";
import { useRef, type ReactNode } from "react";

import { EASE } from "@/animations/easing";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** GSAP ScrollTrigger start position */
  start?: string;
  y?: number;
  stagger?: number;
}

/**
 * Infrastructure reveal primitive — subtle scroll-triggered fade-up.
 * Used across sections in later phases.
 */
export function RevealOnScroll({
  children,
  className,
  start = "top 85%",
  y = 40,
  stagger = 0.06,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !ref.current) return;

      const targets = ref.current.querySelectorAll("[data-reveal]");

      if (targets.length === 0) {
        gsap.from(ref.current, {
          y,
          opacity: 0,
          duration: 1.1,
          ease: EASE.reveal,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        });
        return;
      }

      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        stagger,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, start, y, stagger] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
