import { Routes, Route } from 'react-router-dom';

import { AppPaths } from '@features/types';
import { AppLayout } from './layout';
import { NotFound } from 'pages/404';
import { TasksPage } from 'pages/dashboard';
import { LoginForm } from '@auth/login-form';
import { RequireAuth } from '@auth/require-auth';
import { RegisterForm } from '@auth/register-form';
import { ResetPassword } from '@auth/reset-password-form';
import { RedirectSuccess } from '@auth/redirect-success';

export const path: AppPaths = {
  root: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
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
          <Route path={path.dashboard} element={<TasksPage />} />
        </Route>

        <Route path={path.notFound} element={<NotFound />} />
      </Route>
      <Route path={path.googleLogin} element={<RedirectSuccess />} />
    </Routes>
  );
};
