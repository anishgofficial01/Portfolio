"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/animations/easing";
import { useLoader } from "@/context/LoaderContext";
import { LOADER } from "@/lib/constants";
import { refreshScroll } from "@/lib/scroll-refresh";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

function finishLoader(completeLoader: () => void): void {
  completeLoader();
  refreshScroll();
  /* Delayed refresh after layout unlocks — ensures About/Work are measured */
  window.setTimeout(() => refreshScroll(), 100);
  window.setTimeout(() => refreshScroll(), 600);
}

/**
 * Cinematic loader — counter, progress line, name reveal, curtain exit.
 * Uses CSS scroll lock only (never lenis.stop — that adds overflow:clip to html).
 */
export function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const { isComplete, completeLoader } = useLoader();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(!prefersReducedMotion);

  useScrollLock(!isComplete);

  useEffect(() => {
    if (prefersReducedMotion) {
      finishLoader(completeLoader);
      setIsMounted(false);
    }
  }, [prefersReducedMotion, completeLoader]);

  useEffect(() => {
    if (prefersReducedMotion || isComplete) return;

    const fallback = window.setTimeout(() => {
      if (!hasAnimated.current) {
        finishLoader(completeLoader);
        setIsMounted(false);
      }
    }, 8000);

    return () => window.clearTimeout(fallback);
  }, [prefersReducedMotion, isComplete, completeLoader]);

  useGsapContext(
    () => {
      if (prefersReducedMotion || hasAnimated.current) return;

      const counter = { value: 0 };
      const counterEl = counterRef.current;
      const progressEl = progressRef.current;
      const nameEl = nameRef.current;
      const labelEl = labelRef.current;
      const curtainEl = curtainRef.current;

      if (!counterEl || !progressEl || !curtainEl) {
        finishLoader(completeLoader);
        setIsMounted(false);
        return;
      }

      hasAnimated.current = true;

      gsap.set([nameEl, labelEl], { opacity: 0, y: 20 });
      gsap.set(progressEl, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        onComplete: () => {
          finishLoader(completeLoader);
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: EASE.exit,
            onComplete: () => setIsMounted(false),
          });
        },
      });

      tl.to(counter, {
        value: 100,
        duration: LOADER.counterDuration,
        ease: EASE.cinematic,
        onUpdate: () => {
          counterEl.textContent = String(Math.round(counter.value)).padStart(
            3,
            "0"
          );
        },
      })
        .to(
          progressEl,
          {
            scaleX: 1,
            duration: LOADER.counterDuration,
            ease: EASE.cinematic,
          },
          0
        )
        .to(
          [labelEl, nameEl],
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: EASE.reveal,
          },
          LOADER.counterDuration * 0.55
        )
        .to({}, { duration: LOADER.holdDuration })
        .to(curtainEl, {
          yPercent: -100,
          duration: LOADER.exitDuration,
          ease: EASE.cinematic,
        });
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, completeLoader],
    }
  );

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[var(--z-loader)]",
        isComplete && "pointer-events-none"
      )}
      aria-hidden={isComplete}
      aria-busy={!isComplete}
    >
      <div
        ref={curtainRef}
        className="absolute inset-0 flex flex-col bg-[var(--color-bg-primary)]"
      >
        <div className="flex items-start justify-between px-[var(--space-gutter-full)] pt-8 md:pt-10">
          <span
            ref={labelRef}
            className="font-body text-label-editorial text-[var(--color-text-secondary)]"
          >
            Loading
          </span>
          <span
            ref={counterRef}
            className="font-display text-sm tabular-nums tracking-tight text-[var(--color-text-primary)] md:text-base"
          >
            000
          </span>
        </div>

        <div className="flex flex-1 items-center px-[var(--space-gutter-full)]">
          <p
            ref={nameRef}
            className="font-display text-h2 font-medium text-[var(--color-text-primary)] md:text-h1"
          >
            {siteConfig.name}
          </p>
        </div>

        <div className="px-[var(--space-gutter-full)] pb-8 md:pb-10">
          <div className="mb-3 h-px w-full bg-[var(--color-border)]">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-[var(--color-accent)]"
            />
          </div>
          <span className="font-body text-label-editorial text-[var(--color-text-secondary)]">
            {siteConfig.role}
          </span>
        </div>
      </div>
    </div>
  );
}
