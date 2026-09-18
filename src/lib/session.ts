const TOKEN_KEY = 'token';
const USER_NAME_KEY = 'userName';
const USER_LAST_NAME_KEY = 'userLastName';
const USER_ID_KEY = 'userId';
const USER_EMAIL_KEY = 'userEmail';
const USER_ROLE_KEY = 'userRole';
const USER_STATUS_KEY = 'userStatus';
const USER_IS_ADMIN_KEY = 'userIsAdmin';

const isBrowser = () => typeof window !== 'undefined';

export const getSessionToken = () =>
  isBrowser() ? localStorage.getItem(TOKEN_KEY) : null;

export const getSessionUser = () => ({
  id: isBrowser() ? localStorage.getItem(USER_ID_KEY) : null,
  firstName: isBrowser() ? localStorage.getItem(USER_NAME_KEY) : null,
  lastName: isBrowser() ? localStorage.getItem(USER_LAST_NAME_KEY) : null,
  email: isBrowser() ? localStorage.getItem(USER_EMAIL_KEY) : null,
  role: isBrowser() ? localStorage.getItem(USER_ROLE_KEY) : null,
  status: isBrowser() ? localStorage.getItem(USER_STATUS_KEY) : null,
  isAdmin: isBrowser() ? localStorage.getItem(USER_IS_ADMIN_KEY) === 'true' : false,
});

export const persistSession = ({
  token,
  id,
  firstName,
  lastName,
  email,
  role,
  status,
  isAdmin,
}: {
  token: string;
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  status?: string;
  isAdmin?: boolean;
}) => {
  if (!isBrowser()) return;

  localStorage.setItem(TOKEN_KEY, token);
  if (id) localStorage.setItem(USER_ID_KEY, id);
  localStorage.setItem(USER_NAME_KEY, firstName);
  localStorage.setItem(USER_LAST_NAME_KEY, lastName);
  if (email) localStorage.setItem(USER_EMAIL_KEY, email);
  if (role) localStorage.setItem(USER_ROLE_KEY, role);
  if (status) localStorage.setItem(USER_STATUS_KEY, status);
  localStorage.setItem(USER_IS_ADMIN_KEY, String(Boolean(isAdmin)));
};

export const clearSession = () => {
  if (!isBrowser()) return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_LAST_NAME_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(USER_STATUS_KEY);
  localStorage.removeItem(USER_IS_ADMIN_KEY);
};
