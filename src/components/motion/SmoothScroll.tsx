"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  applyGsapDefaults,
  registerGsapPlugins,
} from "@/animations/gsap-config";
import { MOTION } from "@/lib/constants";
import { refreshScroll } from "@/lib/scroll-refresh";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis + GSAP — official Lenis 1.3 pattern (no scrollerProxy).
 * scrollerProxy breaks scroll height with Lenis; ScrollTrigger syncs via scroll event.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add("lenis-off");
      refreshScroll();
      return;
    }

    registerGsapPlugins();
    applyGsapDefaults();

    const lenis = new Lenis({
      duration: MOTION.lenisDuration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      autoRaf: false,
      content: document.body,
      wrapper: window,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const syncScroll = (): void => {
      lenis.resize();
      refreshScroll();
    };

    const resizeObserver = new ResizeObserver(syncScroll);
    resizeObserver.observe(document.body);

    if (document.readyState === "complete") {
      syncScroll();
    } else {
      window.addEventListener("load", syncScroll);
    }

    requestAnimationFrame(syncScroll);
    const delayedSync = window.setTimeout(syncScroll, 500);

    const onVisibilityChange = (): void => {
      if (document.hidden) {
        gsap.ticker.sleep();
      } else {
        gsap.ticker.wake();
        syncScroll();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearTimeout(delayedSync);
      window.removeEventListener("load", syncScroll);
      resizeObserver.disconnect();
      document.documentElement.classList.remove("lenis-off");
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
