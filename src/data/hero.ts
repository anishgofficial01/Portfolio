import { siteConfig } from "./site";

export const heroRotatingSkills = [
  "Enterprise Systems",
  "Blockchain Architecture",
  "3D Interfaces",
  "Cinematic Frontend Experiences",
] as const;

export type HeroRotatingSkill = (typeof heroRotatingSkills)[number];

export const heroContent = {
  role: siteConfig.role,
  title: "Product Engineer",
  subtitle: "specialized in",
  rotatingSkills: heroRotatingSkills,
  tagline: siteConfig.description,
  index: "01",
  scrollLabel: "Scroll",
  availability: "Available for select projects",
} as const;
