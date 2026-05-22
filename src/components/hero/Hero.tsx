"use client";

import { gsap } from "gsap";
import { useRef } from "react";

import { EASE } from "@/animations/easing";
import { Container, Label, Section } from "@/components/ui";
import { useLoader } from "@/context/LoaderContext";
import { heroContent } from "@/data/hero";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

import { RotatingText } from "@/components/motion/RotatingText";

import { HeroBackground } from "./HeroBackground";
import { HeroScrollIndicator } from "./HeroScrollIndicator";

/**
 * Cinematic hero — asymmetric editorial layout with staggered line reveals.
 * Animations begin only after loader completes.
 */
export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { isComplete } = useLoader();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (!isComplete || !contentRef.current || hasAnimated.current) return;
      hasAnimated.current = true;

      const root = contentRef.current;
      const titleLine = root.querySelector(".hero-line--title");
      const subline = root.querySelector(".hero-line-sub");
      const rotating = root.querySelector(".hero-rotating");
      const meta = root.querySelectorAll(".hero-meta");
      const tagline = root.querySelector(".hero-tagline");
      const scroll = root.querySelector(".hero-scroll");
      const rule = root.querySelector(".hero-rule");

      if (prefersReducedMotion) {
        gsap.set(
          [titleLine, subline, rotating, meta, tagline, scroll, rule].filter(
            Boolean
          ),
          { opacity: 1, y: 0, scaleX: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.reveal } });

      tl.from(meta, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
      })
        .from(
          titleLine,
          {
            yPercent: 110,
            duration: 1.2,
          },
          "-=0.5"
        )
        .from(
          subline,
          {
            y: 18,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.9"
        )
        .from(
          rotating,
          {
            y: 30,
            opacity: 0,
            duration: 1.05,
          },
          "-=0.75"
        )
        .from(
          rule,
          {
            scaleX: 0,
            duration: 1,
            transformOrigin: "left center",
          },
          "-=0.8"
        )
        .from(
          tagline,
          {
            y: 32,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          scroll,
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.5"
        )
        .from(
          ".hero-scroll-line",
          {
            scaleY: 0,
            duration: 1.4,
            transformOrigin: "top center",
            ease: EASE.cinematic,
          },
          "-=0.7"
        );
    },
    {
      scope: contentRef,
      dependencies: [isComplete, prefersReducedMotion],
    }
  );

  return (
    <Section
      id="hero"
      aria-label="Introduction"
      fullHeight
      padding="none"
      className="relative overflow-x-clip"
    >
      <HeroBackground />
      <Container size="full" className="relative z-10 min-h-[100dvh]">
        <div
          ref={contentRef}
          className="relative flex min-h-[100dvh] flex-col"
        >
        {/* Top bar */}
        <header className="flex items-start justify-between pt-8 md:pt-10 lg:pt-12">
          <Label accent className="hero-meta">
            {heroContent.role}
          </Label>
          <span className="hero-meta font-display text-sm tracking-tight text-[var(--color-text-secondary)] md:text-base">
            {heroContent.index}
          </span>
        </header>

        {/* Main editorial block */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8">
              <h1 className="hero-heading flex w-full max-w-[min(100%,54rem)] flex-col items-start text-left">
                <span className="block w-full overflow-hidden">
                  <span className="hero-line hero-line--title block font-display text-hero-title font-semibold uppercase text-[var(--color-text-primary)]">
                    {heroContent.title}
                  </span>
                </span>

                <span className="hero-line-sub mt-0.5 block font-body text-hero-sub font-normal text-[var(--color-text-secondary)]">
                  {heroContent.subtitle}
                </span>

                <RotatingText
                  items={heroContent.rotatingSkills}
                  isActive={isComplete}
                  className="mt-1 md:mt-2"
                />
              </h1>

              <div
                className="hero-rule mt-10 h-px w-full max-w-[120px] bg-[var(--color-border-strong)] md:mt-14 md:max-w-[200px]"
                aria-hidden
              />

              <p className="hero-tagline mt-8 max-w-xl font-body text-body-editorial text-pretty text-[var(--color-text-secondary)] md:mt-10 lg:max-w-2xl">
                {heroContent.tagline}
              </p>
            </div>

            <aside className="flex flex-col justify-between lg:col-span-4 lg:items-end lg:pt-4">
              <p className="hero-meta font-body text-small-editorial text-[var(--color-text-secondary)] lg:text-right">
                {heroContent.availability}
              </p>
              <HeroScrollIndicator
                label={heroContent.scrollLabel}
                className="mt-10 lg:mt-auto"
              />
            </aside>
          </div>
        </div>

        {/* Bottom accent — subtle parallax anchor for Phase 5 */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 right-0",
            "hidden font-display text-[clamp(8rem,20vw,16rem)] font-medium leading-none",
            "select-none text-[var(--color-text-primary)]/5 md:block"
          )}
          aria-hidden
        >
          {heroContent.index}
        </div>
        </div>
      </Container>
    </Section>
  );
}
