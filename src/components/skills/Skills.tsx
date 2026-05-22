"use client";

import { useRef } from "react";

import { scrollReveal } from "@/animations/scroll";
import { InfiniteHorizontalMarquee } from "@/components/motion/InfiniteHorizontalMarquee";
import { Container, Section } from "@/components/ui";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillsContent } from "@/data/skills";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

import { ExpertiseCard } from "./ExpertiseCard";

/**
 * Expertise — cinematic horizontal infinite marquee showcase.
 */
export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const root = sectionRef.current;
      const header = root.querySelector(".skills-header");

      if (header) {
        scrollReveal({
          trigger: root,
          targets: header.querySelectorAll("[data-reveal]"),
          start: "top 85%",
          stagger: 0.12,
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section
      id="skills"
      aria-label="Skills and expertise"
      padding="default"
      className="overflow-x-clip bg-[var(--color-bg-secondary)]"
    >
      <div ref={sectionRef}>
        <Container>
          <div className="skills-header mb-12 md:mb-16">
            <div data-reveal>
              <SectionHeader
                index={skillsContent.index}
                label={skillsContent.label}
                title={skillsContent.title}
              />
            </div>
            <p
              data-reveal
              className="mt-8 max-w-xl font-body text-body-editorial text-pretty text-[var(--color-text-secondary)] md:mt-10"
            >
              Depth across frontend craft, product engineering, and the systems
              that power enterprise experiences.
            </p>
          </div>
        </Container>

        <div className="relative mt-4 md:mt-8">
          {/* Edge fades — cinematic vignette */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28",
              "bg-gradient-to-r from-[var(--color-bg-secondary)] to-transparent"
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28",
              "bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent"
            )}
            aria-hidden
          />

          <InfiniteHorizontalMarquee
            duration={110}
            className="py-4 md:py-6"
            trackClassName="pr-[var(--space-gutter)]"
          >
            {skillsContent.groups.map((group, i) => (
              <ExpertiseCard key={group.category} group={group} index={i} />
            ))}
          </InfiniteHorizontalMarquee>
        </div>
      </div>
    </Section>
  );
}
