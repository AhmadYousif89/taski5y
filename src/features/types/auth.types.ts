import { ResponseError, ResponseStatus } from './http.types';

export type AuthType = 'register' | 'login';
export type AuthState = {
  user: User | null;
  message: string;
  error: ResponseError;
  status: ResponseStatus;
  actionType: AuthActionType;
};
export type AuthSignUp = {
  name: string;
  email: string;
  password: string;
};
export type AuthSignIn = {
  email: string;
  password: string;
};
export type AuthActionType =
  | 'sign_up'
  | 'sign_in'
  | 'sign_out'
  | 'refresh_user'
  | 'password_reset'
  | 'delete_account'
  | 'profile_update'
  | 'upload_image'
  | '';
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
