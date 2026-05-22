"use client";

import { useRef } from "react";

import { scrollParallax, scrollReveal } from "@/animations/scroll";
import { Container, Grid, GridItem, Section } from "@/components/ui";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/data/about";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * About — editorial asymmetric layout with scroll reveals and subtle parallax.
 */
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const root = sectionRef.current;
      const headline = root.querySelector(".about-headline");
      const reveals = root.querySelectorAll("[data-reveal]");

      if (headline) {
        scrollParallax({
          trigger: root,
          target: headline as Element,
          intensity: 0.12,
        });
      }

      scrollReveal({
        trigger: root,
        targets: reveals,
        start: "top 78%",
        stagger: 0.12,
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section id="about" aria-label="About" padding="default" className="bg-[var(--color-bg-primary)]">
      <Container>
        <div ref={sectionRef}>
          <SectionHeader
            index={aboutContent.index}
            label={aboutContent.label}
            className="mb-16 md:mb-24"
          />

          <Grid cols={12} gap="lg">
            <GridItem span={12} className="lg:col-span-5">
              <h2
                className={cn(
                  "about-headline font-display text-h1 font-medium leading-[0.95] tracking-tight",
                  "text-balance text-[var(--color-text-primary)]"
                )}
                data-reveal
              >
                {aboutContent.headline}
              </h2>
            </GridItem>

            <GridItem span={12} offset={0} className="lg:col-span-6 lg:col-start-7">
              <div className="flex flex-col gap-8 md:gap-10">
                {aboutContent.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    data-reveal
                    className="font-body text-body-editorial text-pretty text-[var(--color-text-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </GridItem>
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
