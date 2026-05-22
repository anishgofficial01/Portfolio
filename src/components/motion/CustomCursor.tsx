"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
  "a, button, [data-cursor-hover], input, textarea, select";

/**
 * Premium custom cursor — dot + lagging ring.
 * Disabled on touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: 0, y: 0 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent): void => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onEnter = (): void => {
      gsap.to(ring, {
        scale: 2.2,
        opacity: 0.35,
        borderColor: "var(--color-accent)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.25, ease: "power3.out" });
    };

    const onLeave = (): void => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        borderColor: "rgba(245, 245, 240, 0.25)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
    };

    const bound = new Set<Element>();

    const bindInteractive = (): void => {
      document.querySelectorAll(INTERACTIVE_SELECTOR).forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bindInteractive();
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", onMove);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      bound.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      bound.clear();
    };
  }, [prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[var(--z-cursor)]" aria-hidden>
      <div
        ref={dotRef}
        className={cn(
          "cursor-dot fixed left-0 top-0 h-1.5 w-1.5 rounded-full",
          "bg-[var(--color-accent)]"
        )}
      />
      <div
        ref={ringRef}
        className={cn(
          "cursor-ring fixed left-0 top-0 h-10 w-10 rounded-full",
          "border border-[rgba(245,245,240,0.25)]"
        )}
      />
    </div>
  );
}
