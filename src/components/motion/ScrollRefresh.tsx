"use client";

import { useEffect } from "react";

import { useLoader } from "@/context/LoaderContext";
import { useLenis } from "@/hooks/useLenis";
import { refreshScroll } from "@/lib/scroll-refresh";

/** Refreshes Lenis + ScrollTrigger once loader completes */
export function ScrollRefresh() {
  const { isComplete } = useLoader();
  const lenis = useLenis();

  useEffect(() => {
    if (!isComplete) return;

    const sync = (): void => {
      lenis?.resize();
      refreshScroll();
    };

    sync();
    const t1 = window.setTimeout(sync, 100);
    const t2 = window.setTimeout(sync, 800);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isComplete, lenis]);

  return null;
}
