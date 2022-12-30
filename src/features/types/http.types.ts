export type AppPaths = {
  root: '/';
  login: '/login';
  register: '/register';
  redirectOnRegister: '/register/redirect';
  redirectOnLogin: '/login/redirect';
  dashboard: '/dashboard';
  googleRegister: '/auth/google/signup';
  googleLogin: '/auth/google/signin';
  passwordReset: '/password-reset';
  notFound: '*';
};
export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
