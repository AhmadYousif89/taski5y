import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { useAppDispatch } from 'app/hooks';
import { updateUser } from 'features/services/auth';

import { path } from 'components/app';
import { AuthType } from 'features/types';
import { wait, modifyLocalStorage } from 'helpers';
import { AuthRedirectMsg } from './auth-redirect-msg';

export const AuthRedirect: FC<{ authType: AuthType }> = ({ authType }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = modifyLocalStorage({ action: 'get', key: 'logged_in' });

  useEffect(() => {
    // user is not registered yet i.e (first time)
    if (user && !user.registered)
      wait(() => dispatch(updateUser({ registered: true }))).then(() => {
        modifyLocalStorage({ action: 'set', key: 'logged_in', value: 'true' });
        navigate(path.dashboard);
      });

    // user is registered user but wants to re-login i.e (logged out or session expired)
    if (user && user.registered && isLoggedIn !== 'true')
      wait(() => {
        modifyLocalStorage({ action: 'set', key: 'logged_in', value: 'true' });
        navigate(path.dashboard);
      });

    // user is registered and is logged in
    if (user && isLoggedIn === 'true') navigate(path.dashboard);

    // no user i.e (not registered or logged in)
    if (!user) navigate(path.root);
  }, [user, isLoggedIn, navigate, dispatch]);

  return <AuthRedirectMsg authType={authType} />;
};
