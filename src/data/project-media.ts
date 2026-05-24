export interface ProjectVideo {
  src: string;
  poster?: string;
  label: string;
}

export const projectVideos: Record<string, ProjectVideo> = {};

export function getProjectVideo(projectId: string): ProjectVideo | undefined {
  return projectVideos[projectId];
}
