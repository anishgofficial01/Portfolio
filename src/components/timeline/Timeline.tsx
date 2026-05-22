"use client";

import { gsap } from "gsap";
import { useRef } from "react";

import { EASE } from "@/animations/easing";
import { scrollReveal } from "@/animations/scroll";
import { Container, Section } from "@/components/ui";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experienceContent } from "@/data/experience";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { TimelineItem } from "./TimelineItem";

/**
 * Experience timeline — vertical editorial line with staggered entries.
 */
export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const root = sectionRef.current;
      const header = root.querySelector(".timeline-header");
      const line = root.querySelector(".timeline-line");

      if (header) {
        scrollReveal({
          trigger: root,
          targets: header.querySelectorAll("[data-reveal]"),
          start: "top 85%",
          stagger: 0.12,
        });
      }

      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: EASE.cinematic,
          immediateRender: false,
          scrollTrigger: {
            trigger: root.querySelector(".timeline-track"),
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section id="experience" aria-label="Experience" padding="default">
      <Container>
        <div ref={sectionRef}>
          <div className="timeline-header mb-16 md:mb-24">
            <div data-reveal>
              <SectionHeader
                index={experienceContent.index}
                label={experienceContent.label}
                title={experienceContent.title}
              />
            </div>
          </div>

          <div className="timeline-track relative">
            <div
              className="timeline-line absolute bottom-0 left-6 top-0 hidden w-px origin-top -translate-x-1/2 bg-[var(--color-border-strong)] md:block"
              aria-hidden
            />

            <ol className="flex flex-col">
              {experienceContent.entries.map((entry, i) => (
                <TimelineItem
                  key={entry.id}
                  entry={entry}
                  isLast={i === experienceContent.entries.length - 1}
                />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
