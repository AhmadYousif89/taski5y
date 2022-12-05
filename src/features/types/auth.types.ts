export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};
export type SignInRequest = {
  email: string;
  password: string;
};
export type AuthActionType = 'logout' | 'delete' | 'refresh' | '';
export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
