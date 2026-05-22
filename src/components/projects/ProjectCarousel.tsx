"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { CSS_EASE } from "@/animations/easing";
import type { ProjectSlide } from "@/data/project-galleries";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  slides: readonly ProjectSlide[];
  projectTitle: string;
  className?: string;
}

/**
 * Editorial project gallery — fade transitions, minimal controls.
 */
export function ProjectCarousel({
  slides,
  projectTitle,
  className,
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex((index + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  const current = slides[activeIndex];

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.65, ease: CSS_EASE.premium };

  return (
    <div
      className={cn(
        "project-visual project-carousel relative aspect-[16/9] w-full overflow-hidden",
        "bg-[var(--color-bg-secondary)]",
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${projectTitle} screenshots`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1120px"
            className="object-contain object-center p-2 md:p-4"
            unoptimized
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top meta */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between bg-gradient-to-b from-[rgba(13,13,13,0.85)] to-transparent p-4 md:p-6">
        <span className="font-body text-label-editorial text-[var(--color-text-primary)]">
          {current.label}
        </span>
        <span className="font-display text-sm tabular-nums text-[var(--color-text-secondary)]">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className={cn(
              "absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
              "border border-[var(--color-border)] bg-[rgba(13,13,13,0.6)] backdrop-blur-sm",
              "text-[var(--color-text-primary)] transition-colors duration-300",
              "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            )}
            aria-label="Previous screenshot"
            data-cursor-hover
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className={cn(
              "absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
              "border border-[var(--color-border)] bg-[rgba(13,13,13,0.6)] backdrop-blur-sm",
              "text-[var(--color-text-primary)] transition-colors duration-300",
              "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            )}
            aria-label="Next screenshot"
            data-cursor-hover
          >
            <ChevronRight size={18} aria-hidden />
          </button>

          <div
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6"
            role="tablist"
            aria-label="Screenshot navigation"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`View ${slide.label}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-px transition-all duration-500 ease-[var(--ease-premium)]",
                  i === activeIndex
                    ? "w-10 bg-[var(--color-accent)]"
                    : "w-6 bg-[var(--color-border-strong)] hover:w-8 hover:bg-[var(--color-text-secondary)]"
                )}
                data-cursor-hover
              />
            ))}
          </div>
        </>
      )}

      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px origin-top bg-[var(--color-accent)] opacity-80"
        aria-hidden
      />
    </div>
  );
}
