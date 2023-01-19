import { ResponseError, ResponseStatus } from './http.types';

const actionTypes = [
  'sign_up',
  'sign_in',
  'sign_out',
  'refresh_user',
  'password_reset',
  'delete_account',
  'profile_update',
  'upload_image'
] as const;

export type AuthType = 'register' | 'login';
export type AuthSignUp = {
  name: string;
  email: string;
  password: string;
};
export type AuthSignIn = {
  email: string;
  password: string;
};
export type AuthActionType = typeof actionTypes[number] | '';
export type AuthState = {
  user: User | null;
  message: string;
  error: ResponseError;
  status: ResponseStatus;
  actionType: AuthActionType;
};

export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  registered: boolean;
  provider: 'google' | 'No_Provider';
  createdAt: string;
  updatedAt: string;
};
