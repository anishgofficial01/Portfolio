import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  title: string;
  className?: string;
}

/** Placeholder visual block — solid surface, no glassmorphism */
export function ProjectVisual({ title, className }: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "project-visual relative aspect-[16/9] w-full overflow-hidden",
        "bg-[var(--color-bg-secondary)]",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <span className="font-body text-label-editorial text-[var(--color-text-secondary)]">
          {title}
        </span>
      </div>
      <div
        className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--color-accent)] scale-y-0 transition-transform duration-700 ease-[var(--ease-premium)] group-hover/project:scale-y-100"
        aria-hidden
      />
    </div>
  );
}
