"use client";

import { useLoader } from "@/context/LoaderContext";
import { useLenis } from "@/hooks/useLenis";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

interface HeroScrollIndicatorProps {
  label: string;
  className?: string;
}

export function HeroScrollIndicator({
  label,
  className,
}: HeroScrollIndicatorProps) {
  const lenis = useLenis();
  const { isComplete } = useLoader();

  const handleClick = (): void => {
    if (!isComplete) return;
    scrollToSection(lenis, "about");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "hero-scroll flex flex-col items-start gap-4 md:items-end",
        "cursor-pointer bg-transparent border-0 p-0 text-left",
        className
      )}
      data-cursor-hover
      aria-label="Scroll to about section"
    >
      <span className="font-body text-label-editorial text-[var(--color-text-secondary)]">
        {label}
      </span>
      <div className="hero-scroll-track relative h-16 w-px overflow-hidden md:h-24">
        <div className="hero-scroll-line absolute inset-x-0 top-0 h-full w-px bg-[var(--color-accent)]" />
      </div>
    </button>
  );
}
