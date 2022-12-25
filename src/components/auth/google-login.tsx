import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginWithGoogle } from 'features/services/auth';
import { useAppDispatch, useAuth } from 'app/hooks';
import { AuthSuccessMsg } from './auth-success-msg';
import { addTimer } from 'helpers/timeout';
import { path } from 'components/app';

export const RedirectGoogleLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate(path.dashboard);
    addTimer(() =>
      dispatch(loginWithGoogle()).then(() => navigate(path.dashboard, { replace: true })),
    );
  }, [user]);

  return <AuthSuccessMsg />;
};
