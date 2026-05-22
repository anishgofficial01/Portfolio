"use client";

import { useRef } from "react";

import { scrollReveal } from "@/animations/scroll";
import { Container, Section } from "@/components/ui";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectsContent } from "@/data/projects";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

import { ProjectList } from "./ProjectList";

/**
 * Selected Work — cinematic editorial project showcase.
 * Sticky section header on desktop; per-project scroll animations.
 */
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const header = sectionRef.current.querySelector(".projects-header");
      if (!header) return;

      scrollReveal({
        trigger: sectionRef.current,
        targets: header.querySelectorAll("[data-reveal]"),
        start: "top 88%",
        stagger: 0.14,
        y: 40,
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section
      id="work"
      aria-label="Selected work"
      padding="default"
      className="bg-[var(--color-bg-primary)]"
    >
      <Container>
        <div ref={sectionRef}>
          <div
            className={cn(
              "projects-header mb-12 md:mb-16",
              "lg:sticky lg:top-28 lg:z-10 lg:mb-20 lg:bg-[var(--color-bg-primary)] lg:pb-8"
            )}
          >
            <div data-reveal>
              <SectionHeader
                index={projectsContent.index}
                label={projectsContent.label}
                title={projectsContent.title}
              />
            </div>
          </div>

          <ProjectList />
        </div>
      </Container>
    </Section>
  );
}
