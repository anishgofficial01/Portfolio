export interface ExperienceSection {
  label?: string;
  items: readonly string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  note?: string;
  summary?: string;
  highlights?: readonly string[];
  sections?: readonly ExperienceSection[];
}

export const experienceContent = {
  index: "05",
  label: "Experience",
  title: "Enterprise engineering & product delivery",
  entries: [
    {
      id: "vitaledge",
      period: "Jun 2023 — Present",
      role: "Software Engineer 1",
      company: "VitalEdge Technologies",
      note: "Promoted from Associate Software Engineer · Jan 2025",
      summary:
        "ERP development, R&D innovation, and team leadership across high-priority customer modules — from Baan core systems to AI-driven developer workflows.",
      sections: [
        {
          label: "ERP Development",
          items: [
            "Developed core ERP software using Baan language — APIs, BDE, and reports to enhance functionality and streamline data access.",
            "Built the Equipment Project Module with team lead for a high-priority customer, including invoicing and transaction registry.",
            "Designed and delivered the Warranty Registration Module with XML integration to third-party portals for real-time validation and faster claim cycles.",
          ],
        },
        {
          label: "Research & Development",
          items: [
            "Infor Mongoose: Replaced SOAP API data retrieval with direct database connections, reducing load times by 20%; enhanced UI/UX with advanced components and custom HTML.",
            "Dynamic Dashboard: Designed an ERP-integrated dashboard with Angular and .NET REST APIs for rapid data access and intuitive business insights.",
            "Email Integration App: Connected ERP to Outlook and Gmail via Microsoft Graph and Gmail APIs — auto-populated emails with ERP record details and contextual metadata.",
          ],
        },
        {
          label: "Leadership & Training",
          items: [
            "Led a team of 10 freshers as point of contact between engineering and management — hands-on support, query resolution, and delivery quality.",
            "Conducted internal training on Sessions and MMT Sessions for onboarding new engineers.",
          ],
        },
        {
          label: "AI R&D",
          items: [
            "Spearheaded AI tooling initiatives — evaluated prompt engineering and LLM capabilities to streamline code generation, review automation, and cross-team efficiency.",
          ],
        },
        {
          label: "Recognition",
          items: [
            "Best Performer of Q4 2024 for outstanding contributions across development and R&D initiatives.",
            "Promoted to Software Engineer 1 in Jan 2025 during the Email Integration project.",
          ],
        },
      ],
    },
    {
      id: "reva",
      period: "Oct 2021 — Mar 2022",
      role: "React Developer",
      company: "Reva Technologies",
      summary:
        "Frontend development for a SaaS product — interactive interfaces, API integration, and responsive UX.",
      highlights: [
        "Developed interactive, user-friendly interfaces with React to enhance the SaaS product experience.",
        "Built and integrated RESTful APIs between front-end and backend for efficient, scalable data flow.",
        "Collaborated on UI/UX improvements — optimizing responsiveness and accessibility across devices.",
      ],
    },
  ] as const satisfies readonly ExperienceEntry[],
} as const;
