"use client";

import { useEffect } from "react";

import { refreshScroll } from "@/lib/scroll-refresh";

/** Refresh ScrollTrigger when page becomes scrollable (e.g. after loader) */
export function useScrollRefresh(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    refreshScroll();

    const handleResize = (): void => refreshScroll();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [enabled]);
}
