import type Lenis from "lenis";

const HEADER_OFFSET = -88;

/** Smooth scroll to section via Lenis with header offset */
export function scrollToSection(
  lenis: Lenis | null,
  sectionId: string
): void {
  const target = document.getElementById(sectionId);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
