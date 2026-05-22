"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

import { useLoader } from "@/context/LoaderContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PageEnterProps {
  children: ReactNode;
}

/**
 * Subtle page enter fade after loader — cinematic handoff to scrollable content.
 */
export function PageEnter({ children }: PageEnterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isComplete } = useLoader();
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasEntered = useRef(false);

  useEffect(() => {
    if (!isComplete || !ref.current || hasEntered.current) return;
    hasEntered.current = true;

    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 }
    );
  }, [isComplete, prefersReducedMotion]);

  return (
    <div ref={ref} className="opacity-0">
      {children}
    </div>
  );
}
