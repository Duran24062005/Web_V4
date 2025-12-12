import { api } from "../api/base.api";
import type { Project } from "../interfaces/Project.interfaces";
import type { ProjectResponse } from "../interfaces/project.response";


export default async function getProjects(paht: string): Promise<Project[]> {
  try {
    const response = await api.get<ProjectResponse>(`api/projects/${paht}`);

    return await response.data.data.map((datum) => ({
      id: datum.id,
      title: datum.title,
      description: datum.description,
      technologies: datum.technologies,
      imageUrl: datum.imageUrl,
      demoUrl: datum.demoUrl,
      repoUrl: datum.repoUrl,
      featured: datum.featured,
      createdAt: datum.createdAt,
      updatedAt: datum.updatedAt,
    }));

  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}