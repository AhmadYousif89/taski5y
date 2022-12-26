import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'app/hooks';
import { User } from 'features/types';
import { path } from 'components/app';
import { addTimer } from 'helpers/timeout';
import { AuthSuccessMsg } from './auth-success-msg';

export const RedirectOnRegister = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate(path.root);
    if (user?.registered) navigate(path.dashboard);
    if (user) addTimer(() => navigate(path.dashboard));
  }, [user]);

  return <AuthSuccessMsg />;
};
