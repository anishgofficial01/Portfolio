"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface InfiniteHorizontalMarqueeProps {
  children: ReactNode;
  /** Full loop duration in seconds — higher = slower */
  duration?: number;
  className?: string;
  trackClassName?: string;
  pauseOnHover?: boolean;
}

/**
 * Seamless infinite horizontal marquee — GPU transform, duplicated track.
 */
export function InfiniteHorizontalMarquee({
  children,
  duration = 100,
  className,
  trackClassName,
  pauseOnHover = true,
}: InfiniteHorizontalMarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const items = useMemo(
    () =>
      Children.toArray(children).filter(
        (child) => child !== null && child !== undefined
      ),
    [children]
  );

  const renderTrack = (copyKey: string) => (
    <div
      key={copyKey}
      className={cn(
        "expertise-marquee-set flex shrink-0 items-stretch gap-6 md:gap-10 lg:gap-12",
        trackClassName
      )}
      aria-hidden={copyKey === "copy"}
    >
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<{ "aria-hidden"?: boolean }>, {
          key: `${copyKey}-${index}`,
          ...(copyKey === "copy" ? { "aria-hidden": true } : {}),
        });
      })}
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "flex gap-6 overflow-x-auto overscroll-x-contain px-[var(--space-gutter)] pb-2",
          "snap-x snap-mandatory [-webkit-overflow-scrolling:touch]",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        {items}
      </div>
    );
  }

  const style = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "expertise-marquee group/marquee relative w-full overflow-hidden",
        pauseOnHover && "expertise-marquee--pausable",
        className
      )}
      style={style}
    >
      <div
        className={cn(
          "expertise-marquee-track flex w-max items-stretch will-change-transform",
          "pl-[var(--space-gutter)]"
        )}
      >
        {renderTrack("a")}
        {renderTrack("copy")}
      </div>
    </div>
  );
}
