import type { SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";

export interface ExpertiseCardProps {
  group: SkillGroup;
  index: number;
  className?: string;
}

/**
 * Large editorial expertise block for horizontal marquee showcase.
 */
export function ExpertiseCard({ group, index, className }: ExpertiseCardProps) {
  return (
    <article
      className={cn(
        "expertise-card group/card flex w-[min(85vw,20rem)] shrink-0 flex-col",
        "border border-[var(--color-border)] bg-[var(--color-bg-primary)]/40",
        "p-8 transition-[transform,border-color,background-color] duration-500 ease-[var(--ease-premium)]",
        "hover:-translate-y-1 hover:border-[var(--color-border-strong)]",
        "hover:bg-[var(--color-bg-primary)]/70",
        "md:w-[min(32vw,24rem)] md:p-10 lg:w-[26rem]",
        className
      )}
    >
      <div className="mb-8 flex items-baseline gap-4 border-b border-[var(--color-border)] pb-6 md:mb-10 md:pb-8">
        <span className="font-display text-sm tracking-tight text-[var(--color-text-secondary)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-h2 font-semibold leading-[0.95] tracking-tight text-[var(--color-text-primary)]">
          {group.category}
        </h3>
      </div>

      <ul className="flex flex-col gap-4 md:gap-5">
        {group.items.map((item, i) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-4",
              i > 0 && "border-t border-[var(--color-border)] pt-4 md:pt-5"
            )}
          >
            <span
              className="h-px w-5 shrink-0 bg-[var(--color-border)] transition-all duration-500 ease-[var(--ease-premium)] group-hover/card:w-8 group-hover/card:bg-[var(--color-accent)]"
              aria-hidden
            />
            <span className="font-body text-body-editorial text-[var(--color-text-secondary)] transition-colors duration-300 group-hover/card:text-[var(--color-text-primary)]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
