import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'app/hooks';
import { path } from 'components/app';
import { addTimer } from 'helpers/timeout';
import { AuthSuccessMsg } from './auth-success-msg';

export const RedirectOnRegister = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.registered) navigate(path.dashboard);
    else if (user) addTimer(() => navigate(path.dashboard));
    else navigate(path.root);
  }, [user]);

  return <AuthSuccessMsg />;
};
