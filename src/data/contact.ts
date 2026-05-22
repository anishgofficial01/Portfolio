import { siteConfig } from "./site";

export const contactContent = {
  index: "06",
  label: "Contact",
  headline: "Let's build something remarkable.",
  subline:
    "Open to enterprise product engineering, frontend architecture, and selective collaborations.",
  email: siteConfig.email,
  cta: "Start a conversation",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anish-ghogare-443936235",
    },
    { label: "GitHub", href: "https://github.com/AnishSG01" },
  ] as const,
} as const;
