export interface ProjectSlide {
  src: string;
  alt: string;
  label: string;
}

/** Gallery assets keyed by project id */
export const projectGalleries: Record<string, readonly ProjectSlide[]> = {
  "oem-pipeline": [
    {
      src: "/CommonOEMDataPipelineImages/MainPage.png",
      alt: "Common OEM Data Pipeline — main dashboard",
      label: "Main Page",
    },
    {
      src: "/CommonOEMDataPipelineImages/Architecture.png",
      alt: "Common OEM Data Pipeline — system architecture",
      label: "Architecture",
    },
    {
      src: "/CommonOEMDataPipelineImages/Details.png",
      alt: "Common OEM Data Pipeline — detail view",
      label: "Details",
    },
    {
      src: "/CommonOEMDataPipelineImages/ErorLogs.png",
      alt: "Common OEM Data Pipeline — error logs",
      label: "Error Logs",
    },
  ],
};

export function getProjectGallery(projectId: string): readonly ProjectSlide[] | undefined {
  return projectGalleries[projectId];
}
