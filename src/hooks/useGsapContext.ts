"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

import { registerGsapPlugins } from "@/animations/gsap-config";

registerGsapPlugins();

export interface UseGsapContextOptions {
  scope: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Scoped GSAP context — animations auto-revert on unmount.
 * Use inside section components for clean lifecycle management.
 */
export function useGsapContext(
  callback: () => void | (() => void),
  options: UseGsapContextOptions
): void {
  const { scope, dependencies = [] } = options;

  useGSAP(callback, {
    scope,
    dependencies: [scope, ...dependencies],
  });
}

export { gsap, ScrollTrigger };
