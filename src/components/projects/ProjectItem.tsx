"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { EASE } from "@/animations/easing";
import { scrollParallax } from "@/animations/scroll";
import type { Project } from "@/data/projects";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { ProjectCarousel } from "./ProjectCarousel";
import { ProjectVideo } from "./ProjectVideo";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectItemProps {
  project: Project;
}

/**
 * Single project row — editorial typographic layout, per-item scroll reveal.
 * Uses onEnter (not scrubbed timeline) so content stays visible before trigger.
 */
export function ProjectItem({ project }: ProjectItemProps) {
  const itemRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !itemRef.current) return;

      const root = itemRef.current;
      const divider = root.querySelector(".project-divider");
      const title = root.querySelector(".project-title-inner");
      const meta = root.querySelectorAll(".project-meta");
      const body = root.querySelectorAll(".project-body");
      const visual = root.querySelector(".project-visual");

      ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: EASE.reveal } });

          tl.from(divider, {
            scaleX: 0,
            duration: 1.2,
            transformOrigin: "left center",
            immediateRender: false,
          })
            .from(
              title,
              {
                yPercent: 100,
                duration: 1.1,
                opacity: 0.3,
                immediateRender: false,
              },
              "-=0.8"
            )
            .from(
              meta,
              {
                y: 24,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                immediateRender: false,
              },
              "-=0.6"
            )
            .from(
              body,
              {
                y: 32,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                immediateRender: false,
              },
              "-=0.5"
            );
        },
      });

      if (visual) {
        scrollParallax({
          trigger: root,
          target: visual as Element,
          intensity: 0.2,
          start: "top bottom",
          end: "bottom top",
        });
      }
    },
    { scope: itemRef, dependencies: [prefersReducedMotion, project.id] }
  );

  return (
    <article
      ref={itemRef}
      className="group/project relative"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div
        className="project-divider h-px w-full origin-left bg-[var(--color-border)]"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12 md:gap-6 md:py-16 lg:py-20">
        <div className="md:col-span-1">
          <span className="project-meta font-display text-sm text-[var(--color-text-secondary)] md:text-base">
            {project.index}
          </span>
        </div>

        <div className="md:col-span-8 lg:col-span-7">
          <h3
            id={`project-${project.id}-title`}
            className="project-title overflow-hidden font-display text-h2 font-medium leading-[0.95] tracking-tight text-[var(--color-text-primary)] transition-transform duration-700 ease-[var(--ease-premium)] group-hover/project:translate-x-2"
          >
            <span className="project-title-inner block">{project.title}</span>
          </h3>

          <p className="project-body mt-6 max-w-2xl font-body text-body-editorial text-pretty text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          <ul className="project-body mt-6 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="font-body text-label-editorial text-[var(--color-text-secondary)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row items-start justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-start">
          <span className="project-meta font-body text-label-editorial text-[var(--color-text-secondary)]">
            {project.category}
          </span>
          <span className="project-meta font-display text-sm text-[var(--color-text-primary)]">
            {project.year}
          </span>
        </div>

        <div className="md:col-span-12">
          {project.video ? (
            <ProjectVideo
              video={project.video}
              projectTitle={project.title}
              className="transition-transform duration-700 ease-[var(--ease-premium)] group-hover/project:scale-[1.01]"
            />
          ) : project.gallery && project.gallery.length > 0 ? (
            <ProjectCarousel
              slides={project.gallery}
              projectTitle={project.title}
              className="transition-transform duration-700 ease-[var(--ease-premium)] group-hover/project:scale-[1.01]"
            />
          ) : (
            <ProjectVisual
              title={project.title}
              className="transition-transform duration-700 ease-[var(--ease-premium)] group-hover/project:scale-[1.01]"
            />
          )}
        </div>
      </div>
    </article>
  );
}
