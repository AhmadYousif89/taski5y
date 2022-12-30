import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { modifyLocalStorage } from 'helpers/modify-local-storage';
import { loginWithGoogle } from 'features/services/auth';
import { useAppDispatch, useAuth } from 'app/hooks';
import { AuthSuccessMsg } from './auth-success-msg';
import { addTimer } from 'helpers/timeout';
import { AuthType } from 'features/types';
import { path } from 'components/app';

export const GoogleRedirect: FC<{ authType: AuthType }> = ({ authType }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = modifyLocalStorage({ type: 'get', key: 'logged_in' });

  useEffect(() => {
    if (isLoggedIn !== 'true') {
      addTimer(() =>
        dispatch(loginWithGoogle()).then(() => {
          modifyLocalStorage({ type: 'set', key: 'logged_in', value: 'true' });
          navigate(path.dashboard);
        }),
      );
    }

    if (user && isLoggedIn === 'true') navigate(path.dashboard);
  }, [user, isLoggedIn]);

  return <AuthSuccessMsg authType={authType} />;
};
