import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { AppRoutes } from 'components/app';
import { Backdrop, ActionModal } from 'components/ui';

import { getUser } from 'features/services/auth';
import { authSelector, setAuthActionType } from 'features/slices/auth';
import { modifyLocalStorage } from 'helpers/modify-local-storage';

function App() {
  const dispatch = useAppDispatch();
  const { status, actionType } = useAppSelector(authSelector);
  const persist = modifyLocalStorage({ action: 'get', key: 'persist' });
  const isLoggedIn = modifyLocalStorage({ action: 'get', key: 'logged_in' });

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn !== 'true')
      modifyLocalStorage({ action: 'remove', key: 'persist' });

    if (!persist || persist !== 'true') modifyLocalStorage({ action: 'remove', key: 'logged_in' });

    if (persist === 'true' && isLoggedIn === 'true') {
      dispatch(setAuthActionType('refresh'));
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, persist]);

  if (status === 'loading') {
    switch (actionType) {
      case 'refresh':
        return (
          <>
            <ActionModal actionType="transition" msg={'redirecting'} />
            <Backdrop />
          </>
        );
      case 'logout':
        return (
          <>
            <ActionModal actionType="transition" msg={'logging out'} />
            <Backdrop />
          </>
        );
      case 'delete':
        return (
          <>
            <ActionModal actionType="transition" msg={'deleting account'} />
            <Backdrop />
          </>
        );
    }
  }

  return <AppRoutes />;
}

export default App;
