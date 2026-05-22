"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { EASE } from "@/animations/easing";
import type { ExperienceEntry } from "@/data/experience";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

/** Single timeline entry — cinematic reveal on scroll enter */
export function TimelineItem({ entry, isLast = false }: TimelineItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !itemRef.current) return;

      const root = itemRef.current;
      const dot = root.querySelector(".timeline-dot");
      const content = root.querySelectorAll(".timeline-content");

      ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.reveal } });

          tl.from(dot, {
            scale: 0,
            duration: 0.6,
            immediateRender: false,
          }).from(
            content,
            {
              x: -24,
              opacity: 0,
              duration: 0.9,
              stagger: 0.06,
              immediateRender: false,
            },
            "-=0.3"
          );
        },
      });
    },
    { scope: itemRef, dependencies: [prefersReducedMotion, entry.id] }
  );

  const hasSections = entry.sections && entry.sections.length > 0;
  const hasHighlights = entry.highlights && entry.highlights.length > 0;

  return (
    <li
      ref={itemRef}
      className={cn(
        "timeline-item relative pb-16 md:pb-20 md:pl-16",
        isLast && "pb-0"
      )}
    >
      <span
        className="timeline-dot absolute left-6 top-1.5 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] md:block"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <span className="timeline-content font-body text-label-editorial text-[var(--color-accent)]">
            {entry.period}
          </span>
        </div>
        <div className="md:col-span-9">
          <h3 className="timeline-content font-display text-h3 font-medium text-[var(--color-text-primary)]">
            {entry.role}
          </h3>
          <p className="timeline-content mt-2 font-body text-small-editorial text-[var(--color-text-secondary)]">
            {entry.company}
          </p>
          {entry.note && (
            <p className="timeline-content mt-2 font-body text-label-editorial text-[var(--color-accent)]">
              {entry.note}
            </p>
          )}
          {entry.summary && (
            <p className="timeline-content mt-4 max-w-2xl font-body text-body-editorial text-pretty text-[var(--color-text-secondary)]">
              {entry.summary}
            </p>
          )}

          {hasSections &&
            entry.sections!.map((section) => (
              <div key={section.label ?? section.items[0]} className="timeline-content mt-8">
                {section.label && (
                  <p className="mb-4 font-body text-label-editorial text-[var(--color-text-primary)]">
                    {section.label}
                  </p>
                )}
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item.slice(0, 40)}
                      className="flex items-start gap-4 text-[var(--color-text-secondary)]"
                    >
                      <span
                        className="mt-2.5 h-px w-4 shrink-0 bg-[var(--color-border-strong)]"
                        aria-hidden
                      />
                      <span className="font-body text-small-editorial text-pretty leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {hasHighlights && (
            <ul className="timeline-content mt-6 flex flex-col gap-3">
              {entry.highlights!.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex items-start gap-4 text-[var(--color-text-secondary)]"
                >
                  <span
                    className="mt-2.5 h-px w-4 shrink-0 bg-[var(--color-border-strong)]"
                    aria-hidden
                  />
                  <span className="font-body text-small-editorial text-pretty leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
