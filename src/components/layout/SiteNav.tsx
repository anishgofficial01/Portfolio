"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { useLoader } from "@/context/LoaderContext";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenis } from "@/hooks/useLenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

const sectionIds = navigationItems.map((item) => item.id);

/**
 * Fixed editorial navigation — fades in after loader, highlights active section.
 */
export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const { isComplete } = useLoader();
  const lenis = useLenis();
  const activeId = useActiveSection(sectionIds);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isComplete || !navRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(navRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
    );
  }, [isComplete, prefersReducedMotion]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ): void => {
    e.preventDefault();
    scrollToSection(lenis, id);
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed left-0 right-0 top-0 z-[var(--z-overlay)] opacity-0",
        "border-b border-[var(--color-border)] bg-[rgba(13,13,13,0.85)] backdrop-blur-md",
        "transition-[background] duration-300"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--space-max-width)] items-center justify-between px-[var(--space-gutter)]"
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="font-display text-sm font-medium tracking-tight text-[var(--color-text-primary)] transition-opacity hover:opacity-70"
          data-cursor-hover
        >
          {siteConfig.name.split(" ")[0]}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navigationItems.slice(1).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "group relative font-body text-label-editorial transition-colors duration-300",
                  activeId === item.id
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
                data-cursor-hover
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-[var(--color-accent)] transition-all duration-500 ease-[var(--ease-premium)]",
                    activeId === item.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="font-body text-label-editorial text-[var(--color-accent)] transition-opacity hover:opacity-80 md:hidden"
          data-cursor-hover
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
