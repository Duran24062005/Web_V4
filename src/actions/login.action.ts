import { apiBase } from "../api/base.api";
import type { AuthApiResponse } from "../interfaces/auth.response";

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthApiResponse> => {
  try {
    const { data } = await apiBase.post<AuthApiResponse>("/api/auth/login", {
      email: email,
      password: password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
