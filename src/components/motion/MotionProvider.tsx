"use client";

import type { ReactNode } from "react";

import { CustomCursor } from "./CustomCursor";
import { SmoothScroll } from "./SmoothScroll";

interface MotionProviderProps {
  children: ReactNode;
}

/** Root motion — Lenis smooth scroll + custom cursor */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
