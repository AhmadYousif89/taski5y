import { useEffect } from 'react';

import { AppRoutes } from 'components/app';
import { Backdrop, ActionModal } from 'components/ui';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { modifyLocalStorage } from 'helpers';
import { getUser } from 'features/services/auth';
import { authSelector, setAuthActionType } from 'features/slices/auth';
import { useMatchMedia } from 'hooks';

function App() {
  const dispatch = useAppDispatch();
  const { status, actionType } = useAppSelector(authSelector);
  const persist = modifyLocalStorage({ action: 'get', key: 'persist' });
  const isLoggedIn = modifyLocalStorage({ action: 'get', key: 'logged_in' });
  const isDark = useMatchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (!('theme' in localStorage)) {
      isDark
        ? (document.documentElement.className = 'dark')
        : document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn !== 'true')
      modifyLocalStorage({ action: 'remove', key: 'persist' });

    if (!persist || persist !== 'true') modifyLocalStorage({ action: 'remove', key: 'logged_in' });

    if (persist === 'true' && isLoggedIn === 'true') {
      dispatch(setAuthActionType('refresh_user'));
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading') {
    if (actionType === 'refresh_user') {
      return (
        <>
          <ActionModal actionType="transition" message={'redirecting please wait'} />
          <Backdrop />
        </>
      );
    }
    if (actionType === 'sign_out') {
      return (
        <>
          <ActionModal actionType="transition" message={'logging out'} />
          <Backdrop />
        </>
      );
    }
    if (actionType === 'delete_account') {
      return (
        <>
          <ActionModal actionType="transition" message={'deleting account'} />
          <Backdrop />
        </>
      );
    }
  }

  return <AppRoutes />;
}

export default App;
