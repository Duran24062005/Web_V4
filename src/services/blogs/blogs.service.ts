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

export interface BlogPayload {
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  imageUrl?: string;
  published: boolean;
}

export const createBlog = async (payload: BlogPayload): Promise<Blog> => {
  const response = await apiClient.post<ApiSuccessResponse<Blog>>('/api/blogs', payload);
  return response.data.data;
};

export const updateBlog = async (id: string, payload: BlogPayload): Promise<Blog> => {
  const response = await apiClient.put<ApiSuccessResponse<Blog>>(`/api/blogs/${id}`, payload);
  return response.data.data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/blogs/${id}`);
};
