import type { ApiSuccessResponse } from '../../interfaces/api';
import type { User } from '../../interfaces/auth.response';
import { apiClient } from '../../lib/http';

export const getAdminUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<ApiSuccessResponse<User[]>>('/api/admin/users');
  return response.data.data;
};

export const updateUserStatus = async (id: string, status: 'active' | 'inactive' | 'blocked'): Promise<User> => {
  const response = await apiClient.patch<ApiSuccessResponse<{ user: User }>>(`/api/admin/users/${id}/status`, {
    status,
  });

  return response.data.data.user;
};
