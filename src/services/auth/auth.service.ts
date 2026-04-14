import type { ApiSuccessResponse } from '../../interfaces/api';
import type { AuthApiResponseData, RegisterPayload } from '../../interfaces/auth.response';
import type { LogOut } from '../../interfaces/logout.response';
import { apiClient } from '../../lib/http';

export const login = async (email: string, password: string): Promise<AuthApiResponseData> => {
  const { data } = await apiClient.post<ApiSuccessResponse<AuthApiResponseData>>('/api/auth/login', {
    email,
    password,
  });

  return data.data;
};

export const register = async (payload: RegisterPayload): Promise<AuthApiResponseData> => {
  const { data } = await apiClient.post<ApiSuccessResponse<AuthApiResponseData>>('/api/auth/register', payload);
  return data.data;
};

export const logout = async (): Promise<LogOut> => {
  const { data } = await apiClient.post<ApiSuccessResponse<null>>('/api/auth/logout', {});
  return {
    status: data.status,
    message: data.message || 'Logout exitoso',
  };
};
