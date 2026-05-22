import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

const paddingStyles = {
  default: "py-[var(--space-section-y)]",
  sm: "py-[var(--space-section-y-sm)]",
  none: "",
};

export function Section({
  children,
  className,
  id,
  as: Component = "section",
  fullHeight = false,
  padding = "default",
  "aria-label": ariaLabel,
}: SectionProps & { children: ReactNode; "aria-label"?: string }) {
  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full",
        paddingStyles[padding],
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </Component>
  );
}
