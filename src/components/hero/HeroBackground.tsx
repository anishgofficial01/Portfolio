"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

import { EASE } from "@/animations/easing";
import { scrollParallax } from "@/animations/scroll";
import { useLoader } from "@/context/LoaderContext";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HERO_IMAGE = "/heroImage.jfif";

/**
 * Full-height square portrait, centered horizontally with soft edge fades
 * into the dark background.
 */
export function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { isComplete } = useLoader();
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasFadedIn = useRef(false);

  useGsapContext(
    () => {
      if (!isComplete || !bgRef.current || hasFadedIn.current) return;
      hasFadedIn.current = true;

      if (prefersReducedMotion) {
        gsap.set(bgRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: EASE.cinematic, delay: 0.2 }
      );

      const imageEl = imageRef.current;
      if (imageEl) {
        scrollParallax({
          trigger: bgRef.current,
          target: imageEl,
          intensity: 0.08,
          start: "top top",
          end: "bottom top",
        });
      }
    },
    { scope: bgRef, dependencies: [isComplete, prefersReducedMotion] }
  );

  return (
    <div
      ref={bgRef}
      className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0"
      aria-hidden
    >
      {/* Position: tweak --hero-frame-* & --hero-image-object-x in src/styles/tokens.css */}
      <div
        ref={imageRef}
        className="hero-bg__frame absolute top-0 h-full aspect-square"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100dvh"
          className="hero-bg__image object-contain"
          unoptimized
        />
        {/* Soft edge fades — merge into page background */}
        <div className="hero-bg__edge-fade hero-bg__edge-fade--left" aria-hidden />
        <div className="hero-bg__edge-fade hero-bg__edge-fade--right" aria-hidden />
      </div>

      {/* Section overlays — text legibility on the left */}
      <div className="absolute inset-0 bg-[var(--color-bg-primary)]/30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.45) 35%, transparent 58%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 28%)",
        }}
      />
    </div>
  );
}
