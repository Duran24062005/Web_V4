import type { Blog } from '../../interfaces/blog.interface';
import type { ApiSuccessResponse } from '../../interfaces/api';
import { apiClient } from '../../lib/http';

export const getBlogs = async (path: string): Promise<Blog[]> => {
  const response = await apiClient.get<ApiSuccessResponse<Blog[]>>(`api/blogs/${path}`);
  return response.data.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await apiClient.get<ApiSuccessResponse<Blog>>(`api/blogs/${id}`);
  return response.data.data;
};
