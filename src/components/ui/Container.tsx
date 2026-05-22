import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide" | "full";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: "div" | "section" | "article" | "main";
}

const sizeStyles: Record<ContainerSize, string> = {
  default: "mx-auto max-w-[var(--space-max-width)]",
  narrow: "mx-auto max-w-[var(--space-content-narrow)]",
  wide: "mx-auto max-w-[var(--space-content-wide)]",
  full: "max-w-none",
};

const gutterStyles: Record<ContainerSize, string> = {
  default: "px-[var(--space-gutter)]",
  narrow: "px-[var(--space-gutter)]",
  wide: "px-[var(--space-gutter)]",
  full: "px-[var(--space-gutter-full)]",
};

/**
 * Horizontal rhythm container — asymmetric editorial layouts
 * `full` = near viewport width (hero)
 */
export function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full",
        sizeStyles[size],
        gutterStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
