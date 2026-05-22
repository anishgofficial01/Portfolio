"use client";

import { useContext } from "react";

import { LenisContext } from "@/components/motion/SmoothScroll";
import type Lenis from "lenis";

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
