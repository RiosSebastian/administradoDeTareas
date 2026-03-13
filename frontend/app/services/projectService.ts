// src/services/projectService.ts
import { fetchWithAuth } from "./api";

interface ProjectRequest {
  name: string;
  description?: string;
  creatorId: number; 
}
export const projectService = {
 
  createProject: async (projectData: ProjectRequest) => {
    return fetchWithAuth("/projects", { 
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  getProjectsByUser: async (creatorId: number) => {
    return fetchWithAuth(`/projects/user/${creatorId}`);
  },

  deleteProject: async (projectId: number) => {
    return fetchWithAuth(`/projects/${projectId}`, { method: "DELETE" });
  },
};