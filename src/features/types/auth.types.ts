export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};
export type SignInRequest = {
  email: string;
  password: string;
};
export type AuthActionType = 'logout' | 'delete' | 'refresh' | 'uploading image' | '';
export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
export type User = {
  id: string;
  image?: string;
  name: string;
  email: string;
  provider: 'google' | 'No provider';
  createdAt: string;
  updatedAt: string;
};
