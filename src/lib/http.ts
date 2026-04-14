import axios from 'axios';
import { clearSession, getSessionToken } from './session';

export class HttpError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_API || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    const message =
      error.response?.data?.message || error.message || 'Unexpected request error';

    if (statusCode === 401) {
      clearSession();
    }

    return Promise.reject(new HttpError(message, statusCode));
  },
);

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
