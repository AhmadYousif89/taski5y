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
  RedirectOnRegister,
  RedirectGoogleCheck,
  RedirectGoogleLogin,
} from 'components/auth';

export const path: AppPaths = {
  root: '/',
  login: '/login',
  register: '/register',
  redirect: '/redirect',
  dashboard: '/dashboard',
  googleCheck: '/google/check',
  googleLogin: '/google/login',
  passwordReset: '/password-reset',
  notFound: '*',
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {[path.root, path.register].map((path, i) => (
          <Route key={i} path={path} element={<RegisterForm />} />
        ))}
        <Route path={path.login} element={<LoginForm />} />
        <Route path={path.passwordReset} element={<ResetPassword />} />

        <Route element={<RequireAuth />}>
          <Route path={path.dashboard} element={<Dashboard />} />
        </Route>

        <Route path={path.notFound} element={<NotFound />} />
      </Route>
      <Route path={path.googleLogin} element={<RedirectGoogleLogin />} />
      <Route path={path.googleCheck} element={<RedirectGoogleCheck />} />
      <Route path={path.redirect} element={<RedirectOnRegister />} />
    </Routes>
  );
};
