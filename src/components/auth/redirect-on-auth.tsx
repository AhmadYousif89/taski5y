import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { path } from 'components/app';
import { AuthType } from 'features/types';
import { wait } from 'helpers/wait';
import { updateUser } from 'features/services/auth';
import { useAppDispatch, useAuth } from 'app/hooks';
import { AuthSuccessMsg } from './auth-success-msg';
import { modifyLocalStorage } from 'helpers/modify-local-storage';

export const AuthRedirect: FC<{ authType: AuthType }> = ({ authType }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = modifyLocalStorage({ action: 'get', key: 'logged_in' });

  useEffect(() => {
    if (user && !user.registered)
      wait(() => dispatch(updateUser({ registered: true }))).then(() => {
        modifyLocalStorage({ action: 'set', key: 'logged_in', value: 'true' });
        navigate(path.dashboard);
      });

    if (user && user.registered && isLoggedIn !== 'true')
      wait(() => {
        modifyLocalStorage({ action: 'set', key: 'logged_in', value: 'true' });
        navigate(path.dashboard);
      });

    if (user && isLoggedIn === 'true') navigate(path.dashboard);

    if (!user) navigate(path.root);
  }, [user, isLoggedIn]);

  return <AuthSuccessMsg authType={authType} />;
};