export interface SkillGroup {
  category: string;
  items: readonly string[];
}

export const skillsContent = {
  index: "04",
  label: "Expertise",
  title: "Capabilities across the full product stack",
  groups: [
    {
      category: "Frontend Architecture",
      items: [
        "React / Next.js",
        "TypeScript",
        "GSAP & ScrollTrigger",
        "Framer Motion",
        "Design Systems",
      ],
    },
    {
      category: "Product Engineering",
      items: [
        "Enterprise UX",
        "API Design",
        "System Architecture",
        "Performance Optimization",
        "Technical Leadership",
      ],
    },
    {
      category: "Backend & Data",
      items: [
        "Node.js",
        "REST / GraphQL",
        "PostgreSQL",
        "ETL Pipelines",
        "Cloud (Azure)",
      ],
    },
    {
      category: "Tools & Workflow",
      items: [
        "Git / CI/CD",
        "Figma",
        "Agile Delivery",
        "Code Review",
        "Documentation",
      ],
    },
  ] as const satisfies readonly SkillGroup[],
} as const;
