import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { useAppDispatch } from 'app/hooks';
import { loginWithGoogle } from 'features/services/auth';

import { AuthRedirectMsg } from './auth-redirect-msg';
import { wait, modifyLocalStorage } from 'helpers';
import { AuthType } from 'features/types';
import { path } from 'components/app';

export const GoogleRedirect: FC<{ authType: AuthType }> = ({ authType }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = modifyLocalStorage({ action: 'get', key: 'logged_in' });

  useEffect(() => {
    if (isLoggedIn !== 'true') {
      wait(() => dispatch(loginWithGoogle())).then(() => {
        modifyLocalStorage({ action: 'set', key: 'logged_in', value: 'true' });
        modifyLocalStorage({ action: 'remove', key: 'server_error' });
        navigate(path.dashboard);
      });
    }

    if (user && isLoggedIn === 'true') navigate(path.dashboard);
  }, [user, isLoggedIn, navigate, dispatch]);

  return <AuthRedirectMsg authType={authType} />;
};
