import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

/** Register GSAP plugins once — safe for SSR/client hydration */
export function registerGsapPlugins(): void {
  if (typeof window === "undefined" || isRegistered) return;

  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
}

/** Global GSAP defaults — expensive, restrained motion */
export function applyGsapDefaults(): void {
  gsap.defaults({
    ease: "power3.out",
    duration: 1.1,
  });

  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === "development" && false,
    scrub: false,
  });
}

/** Kill all ScrollTriggers — use on route change or unmount */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
