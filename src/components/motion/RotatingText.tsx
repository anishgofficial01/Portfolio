"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { CSS_EASE } from "@/animations/easing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const VISIBLE_MS = 4000;
const TRANSITION_S = 2;

const slideVariants = {
  enter: {
    y: 30,
    opacity: 0,
    filter: "blur(6px)",
  },
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: -30,
    opacity: 0,
    filter: "blur(6px)",
  },
};

const transition = {
  duration: TRANSITION_S,
  ease: CSS_EASE.premium,
};

export interface RotatingTextProps {
  items: readonly string[];
  isActive?: boolean;
  className?: string;
  itemClassName?: string;
  sizerClassName?: string;
}

/**
 * Cinematic vertical rotating text — blur + slide, GPU-friendly, no layout shift.
 */
export function RotatingText({
  items,
  isActive = true,
  className,
  itemClassName,
  sizerClassName,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldRotate = isActive && !prefersReducedMotion && items.length > 1;

  useEffect(() => {
    if (!shouldRotate) return;

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, VISIBLE_MS);

    return () => window.clearInterval(interval);
  }, [shouldRotate, items.length]);

  const current = items[index] ?? items[0];
  const longest = items.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span
      className={cn(
        "hero-rotating relative block w-full overflow-hidden text-left",
        "min-h-[var(--text-hero-rotate)]",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">{current}</span>

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className={cn(
            "hero-rotate-line absolute left-0 top-0 w-full text-left font-display text-hero-rotate font-bold uppercase",
            "text-[var(--color-accent)]",
            "will-change-[transform,opacity,filter]",
            itemClassName
          )}
          style={{ fontSize: "var(--text-hero-rotate)" }}
          aria-hidden
        >
          {current}
        </motion.div>
      </AnimatePresence>

      <span
        className={cn(
          "pointer-events-none invisible block text-left font-display text-hero-rotate font-bold uppercase",
          sizerClassName
        )}
        aria-hidden
      >
        {longest}
      </span>
    </span>
  );
}
