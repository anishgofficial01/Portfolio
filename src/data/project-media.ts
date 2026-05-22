export interface ProjectVideo {
  src: string;
  poster?: string;
  label: string;
}

export const projectVideos: Record<string, ProjectVideo> = {
  "solo-leveling": {
    src: "/SoloLevelingAppDemo.mp4",
    label: "Product Demo",
  },
};

export function getProjectVideo(projectId: string): ProjectVideo | undefined {
  return projectVideos[projectId];
}
