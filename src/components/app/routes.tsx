import { Routes, Route } from 'react-router-dom';

import { AppLayout } from './layout';
import { NotFound } from 'pages/404';
import { TasksPage } from 'pages/tasks';
import { LoginForm } from '@auth/login-form';
import { RequireAuth } from '@auth/require-auth';
import { RegisterForm } from '@auth/register-form';
import { ResetPassword } from '@auth/reset-password-form';
import { GoogleSuccess } from '@auth/google-success';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {['/', 'register'].map((path, i) => (
          <Route key={i} path={path} element={<RegisterForm />} />
        ))}
        <Route path="login" element={<LoginForm />} />
        <Route path="google/login" element={<GoogleSuccess />} />
        <Route path="password-reset" element={<ResetPassword />} />

        <Route element={<RequireAuth />}>
          <Route path="tasks" element={<TasksPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
