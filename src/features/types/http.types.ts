export interface AppPaths {
  root: '/';
  login: '/login';
  register: '/register';
  redirectOnRegister: '/register/redirect';
  redirectOnLogin: '/login/redirect';
  googleRegister: '/auth/google/signup';
  passwordReset: '/password-reset';
  googleLogin: '/auth/google/signin';
  dashboard: '/dashboard';
  notFound: '*';
}
export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
