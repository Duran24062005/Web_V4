export interface ApiSuccessResponse<T> {
  status: string;
  message?: string;
  data: T;
  meta?: {
    total?: number;
  };
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  path?: string;
}
