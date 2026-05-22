import type { ReactNode } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface SectionProps extends BaseProps {
  id?: string;
  as?: "section" | "div" | "article";
  fullHeight?: boolean;
  padding?: "default" | "sm" | "none";
  "aria-label"?: string;
}
