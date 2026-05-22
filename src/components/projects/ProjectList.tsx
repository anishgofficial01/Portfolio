import { projects, type Project } from "@/data/projects";

import { ProjectItem } from "./ProjectItem";

interface ProjectListProps {
  items?: readonly Project[];
}

export function ProjectList({ items = projects }: ProjectListProps) {
  return (
    <div className="flex flex-col">
      {items.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}
