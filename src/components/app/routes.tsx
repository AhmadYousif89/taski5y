import { Routes, Route } from 'react-router-dom';

import { AppPaths } from 'features/types';
import { AppLayout } from './layout';
import { NotFound } from 'pages/404';
import { Dashboard } from 'pages/dashboard';
import {
  LoginForm,
  RequireAuth,
  RegisterForm,
  ResetPassword,
  GoogleRedirect,
  AuthRedirect,
} from 'components/auth';

export const path: AppPaths = {
  root: '/',
  login: '/login',
  redirectOnLogin: '/login/redirect',
  register: '/register',
  redirectOnRegister: '/register/redirect',
  dashboard: '/dashboard',
  googleRegister: '/auth/google/signup',
  googleLogin: '/auth/google/signin',
  passwordReset: '/password-reset',
  notFound: '*',
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {[path.root, path.register].map(path => (
          <Route key={path} path={path} element={<RegisterForm />} />
        ))}
        <Route path={path.login} element={<LoginForm />} />
        <Route path={path.passwordReset} element={<ResetPassword />} />

        <Route element={<RequireAuth />}>
          <Route path={path.dashboard} element={<Dashboard />} />
        </Route>

        <Route path={path.notFound} element={<NotFound />} />
      </Route>

      <Route path={path.redirectOnRegister} element={<AuthRedirect authType="register" />} />
      <Route path={path.redirectOnLogin} element={<AuthRedirect authType="login" />} />
      <Route path={path.googleRegister} element={<GoogleRedirect authType="register" />} />
      <Route path={path.googleLogin} element={<GoogleRedirect authType="login" />} />
    </Routes>
  );
};
