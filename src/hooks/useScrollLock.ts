"use client";

import { useEffect } from "react";

/** Lock document scroll — used during cinematic loader (CSS only, not Lenis.stop) */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (locked) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      return () => {
        html.style.overflow = "";
        body.style.overflow = "";
      };
    }

    html.style.overflow = "";
    body.style.overflow = "";
  }, [locked]);
}
