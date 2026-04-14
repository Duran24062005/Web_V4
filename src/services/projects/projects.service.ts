import type { Project } from '../../interfaces/Project.interfaces';
import type { ApiSuccessResponse } from '../../interfaces/api';
import { apiClient } from '../../lib/http';

export const getProjects = async (path: string): Promise<Project[]> => {
  const response = await apiClient.get<ApiSuccessResponse<Project[]>>(`api/projects/${path}`);
  return response.data.data;
};
