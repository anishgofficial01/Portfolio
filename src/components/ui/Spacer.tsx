import { cn } from "@/lib/utils";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "section";

interface SpacerProps {
  className?: string;
  size?: SpacerSize;
}

const sizeStyles: Record<SpacerSize, string> = {
  xs: "h-4 md:h-6",
  sm: "h-8 md:h-12",
  md: "h-16 md:h-24",
  lg: "h-24 md:h-32",
  xl: "h-32 md:h-48",
  section: "h-[var(--space-section-y-sm)]",
};

/** Whitespace rhythm utility — editorial vertical breathing room */
export function Spacer({ className, size = "md" }: SpacerProps) {
  return <div aria-hidden className={cn("w-full shrink-0", sizeStyles[size], className)} />;
}
