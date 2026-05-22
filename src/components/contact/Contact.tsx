"use client";

import { Mail } from "lucide-react";
import { useRef } from "react";

import { scrollReveal } from "@/animations/scroll";
import { Container, Section } from "@/components/ui";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactContent } from "@/data/contact";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

import { ContactLink } from "./ContactLink";

/**
 * Contact — minimal premium CTA, large editorial headline, email + links.
 */
export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagneticHover<HTMLAnchorElement>({ strength: 0.25 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const root = sectionRef.current;
      const reveals = root.querySelectorAll("[data-reveal]");

      scrollReveal({
        trigger: root,
        targets: reveals,
        start: "top 80%",
        stagger: 0.14,
        y: 48,
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section
      id="contact"
      aria-label="Contact"
      padding="default"
      className="bg-[var(--color-bg-secondary)]"
    >
      <Container>
        <div ref={sectionRef} className="flex min-h-[70dvh] flex-col justify-between">
          <SectionHeader
            index={contactContent.index}
            label={contactContent.label}
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h2
                data-reveal
                className="font-display text-h1 font-medium leading-[0.95] tracking-tight text-balance text-[var(--color-text-primary)]"
              >
                {contactContent.headline}
              </h2>
              <p
                data-reveal
                className="mt-8 max-w-xl font-body text-body-editorial text-pretty text-[var(--color-text-secondary)] lg:mt-10"
              >
                {contactContent.subline}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-10 lg:col-span-4">
              <a
                ref={ctaRef}
                href={`mailto:${contactContent.email}`}
                data-reveal
                data-cursor-hover
                className={cn(
                  "contact-cta group inline-flex items-center gap-4",
                  "border-b border-[var(--color-border)] pb-6",
                  "transition-colors duration-300 hover:border-[var(--color-accent)]"
                )}
              >
                <Mail
                  size={20}
                  className="shrink-0 text-[var(--color-accent)]"
                  aria-hidden
                />
                <span className="flex flex-col gap-1">
                  <span className="font-body text-label-editorial text-[var(--color-text-secondary)]">
                    {contactContent.cta}
                  </span>
                  <span className="font-display text-h3 font-medium text-[var(--color-text-primary)] transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1">
                    {contactContent.email}
                  </span>
                </span>
              </a>

              <nav
                data-reveal
                className="flex flex-wrap gap-8"
                aria-label="Social links"
              >
                {contactContent.links.map((link) => (
                  <ContactLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </nav>
            </div>
          </div>

          <footer
            data-reveal
            className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 md:mt-28 md:flex-row md:items-center"
          >
            <span className="font-body text-label-editorial text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} — Crafted with intention
            </span>
            <span className="font-display text-sm text-[var(--color-text-secondary)]">
              {contactContent.index}
            </span>
          </footer>
        </div>
      </Container>
    </Section>
  );
}
