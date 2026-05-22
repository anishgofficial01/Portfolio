import { cn } from "@/lib/utils";

import { Heading, Label } from "./Text";

interface SectionHeaderProps {
  index: string;
  label: string;
  title?: string;
  className?: string;
  align?: "left" | "between";
}

/** Reusable editorial section header — index, label, optional title */
export function SectionHeader({
  index,
  label,
  title,
  className,
  align = "between",
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 md:gap-8",
        align === "between" &&
          "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm tracking-tight text-[var(--color-text-secondary)] md:text-base">
            {index}
          </span>
          <span className="h-px w-8 bg-[var(--color-border-strong)]" aria-hidden />
          <Label accent>{label}</Label>
        </div>
        {title && (
          <Heading level={2} className="max-w-2xl" balance>
            {title}
          </Heading>
        )}
      </div>
    </header>
  );
}
