import type { ProjectSlide } from "./project-galleries";
import { getProjectGallery } from "./project-galleries";
import type { ProjectVideo } from "./project-media";

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: readonly string[];
  gallery?: readonly ProjectSlide[];
  video?: ProjectVideo;
}

export const projectsContent = {
  index: "03",
  label: "Selected Work",
  title: "Projects that define the craft",
} as const;

export const projects: readonly Project[] = [
  {
    id: "oem-pipeline",
    index: "01",
    title: "Common OEM Data Pipeline",
    category: "Enterprise Systems",
    year: "2024",
    description:
      "Unified multi-OEM data ingestion and transformation pipeline — standardizing manufacturing data across enterprise stakeholders with reliable, auditable flows.",
    tags: ["ETL", "Node.js", "Azure", "SQL"],
    gallery: getProjectGallery("oem-pipeline"),
  },
  {
    id: "ai-analytics",
    index: "02",
    title: "AI Usage Analytics Platform",
    category: "Analytics",
    year: "2024",
    description:
      "Real-time analytics platform tracking AI adoption, cost, and usage patterns — enabling data-driven decisions for enterprise AI governance.",
    tags: ["React", "Python", "PostgreSQL", "Dashboards"],
  },
  {
    id: "erp-systems",
    index: "03",
    title: "ERP Development Systems",
    category: "Enterprise Systems",
    year: "2023",
    description:
      "Modular ERP architecture for inventory, procurement, and operations — designed for scalability across distributed manufacturing teams.",
    tags: ["ERP", "Microservices", "REST APIs", "TypeScript"],
  },
  {
    id: "solo-leveling",
    index: "04",
    title: "Solo Leveling Productivity App",
    category: "Product Design",
    year: "2023",
    description:
      "Gamified productivity experience inspired by progression systems — blending habit tracking with cinematic UI and motion-led feedback.",
    tags: ["Next.js", "Mobile-first", "UX", "Gamification"],
  },
] as const;
