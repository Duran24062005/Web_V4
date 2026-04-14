export interface AuthApiResponseData {
  user: User;
  token: string;
  notifications?: {
    welcomeEmailSent: boolean;
  };
}

export interface User {
  _id?: string;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  birthdate: Date | string;
  document_number?: string;
  role: string;
  status: string;
  email_verified: boolean;
  is_admin: boolean;
  last_login: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  birthdate: string;
  document_number?: string;
  password: string;
  password_confirm: string;
  requested_role?: string;
}
