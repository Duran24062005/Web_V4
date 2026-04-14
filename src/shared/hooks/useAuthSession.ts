import { clearSession, getSessionToken, getSessionUser } from '../../lib/session';

export const useAuthSession = () => {
  const token = getSessionToken();
  const user = getSessionUser();

  return {
    token,
    isAuthenticated: Boolean(token),
    user,
    clearSession,
  };
};
