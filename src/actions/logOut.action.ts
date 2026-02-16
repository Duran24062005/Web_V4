import { apiBase } from "../api/base.api";
import type { LogOut } from "../interfaces/logout.response";

export const logoutAction = async (token: string): Promise<LogOut> => {
  try {
    const { data } = await apiBase.post<LogOut>(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
