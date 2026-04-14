const TOKEN_KEY = 'token';
const USER_NAME_KEY = 'userName';
const USER_LAST_NAME_KEY = 'userLastName';

const isBrowser = () => typeof window !== 'undefined';

export const getSessionToken = () =>
  isBrowser() ? localStorage.getItem(TOKEN_KEY) : null;

export const getSessionUser = () => ({
  firstName: isBrowser() ? localStorage.getItem(USER_NAME_KEY) : null,
  lastName: isBrowser() ? localStorage.getItem(USER_LAST_NAME_KEY) : null,
});

export const persistSession = ({
  token,
  firstName,
  lastName,
}: {
  token: string;
  firstName: string;
  lastName: string;
}) => {
  if (!isBrowser()) return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_NAME_KEY, firstName);
  localStorage.setItem(USER_LAST_NAME_KEY, lastName);
};

export const clearSession = () => {
  if (!isBrowser()) return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_LAST_NAME_KEY);
};
