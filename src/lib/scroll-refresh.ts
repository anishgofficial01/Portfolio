import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Recalculate ScrollTrigger positions after layout / loader / Lenis changes */
export function refreshScroll(): void {
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    ScrollTrigger.refresh(true);
  });
}
