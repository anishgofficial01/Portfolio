import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TextBaseProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  balance?: boolean;
}

export function Display({
  children,
  className,
  as: Component = "h1",
  balance = true,
}: TextBaseProps) {
  return (
    <Component
      className={cn(
        "font-display text-display font-medium text-[var(--color-text-primary)]",
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Heading({
  children,
  className,
  as: Component = "h2",
  level = 2,
  balance = true,
}: TextBaseProps & { level?: 1 | 2 | 3 }) {
  const levelClass =
    level === 1 ? "text-h1" : level === 2 ? "text-h2" : "text-h3";

  return (
    <Component
      className={cn(
        "font-display font-medium text-[var(--color-text-primary)]",
        levelClass,
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Body({
  children,
  className,
  as: Component = "p",
  muted = false,
}: TextBaseProps & { muted?: boolean }) {
  return (
    <Component
      className={cn(
        "font-body text-body-editorial text-pretty",
        muted ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-primary)]",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function Label({
  children,
  className,
  as: Component = "span",
  accent = false,
}: TextBaseProps & { accent?: boolean }) {
  return (
    <Component
      className={cn(
        "font-body text-label-editorial",
        accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
