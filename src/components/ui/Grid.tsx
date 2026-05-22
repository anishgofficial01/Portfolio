import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GridCols = 1 | 2 | 3 | 4 | 12;

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: GridCols;
  gap?: "sm" | "md" | "lg";
}

const colStyles: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  12: "grid-cols-1 lg:grid-cols-12",
};

const gapStyles = {
  sm: "gap-4 md:gap-6",
  md: "gap-6 md:gap-10",
  lg: "gap-10 md:gap-16",
};

/** Asymmetrical-friendly grid — 12-col for editorial offset layouts */
export function Grid({
  children,
  className,
  cols = 12,
  gap = "md",
}: GridProps) {
  return (
    <div className={cn("grid", colStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  );
}

interface GridItemProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const spanStyles: Record<NonNullable<GridItemProps["span"]>, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

const offsetStyles: Record<NonNullable<GridItemProps["offset"]>, string> = {
  0: "",
  1: "lg:col-start-2",
  2: "lg:col-start-3",
  3: "lg:col-start-4",
  4: "lg:col-start-5",
  5: "lg:col-start-6",
  6: "lg:col-start-7",
};

export function GridItem({
  children,
  className,
  span = 6,
  offset = 0,
}: GridItemProps) {
  return (
    <div className={cn(spanStyles[span], offsetStyles[offset], className)}>
      {children}
    </div>
  );
}
