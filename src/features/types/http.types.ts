export type AppPaths = {
  root: '/';
  login: '/login';
  register: '/register';
  dashboard: '/dashboard';
  googleLogin: '/google/login';
  passwordReset: '/password-reset';
  notFound: '*';
};
export type ResponseStatus = 'idle' | 'loading' | 'fulfilled' | 'rejected';
export type ResponseError = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
