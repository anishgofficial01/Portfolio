"use client";

import { useEffect, useState } from "react";

/** Detect touch-primary devices — disable custom cursor */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    setIsTouch(hasTouch);
  }, []);

  return isTouch;
}
