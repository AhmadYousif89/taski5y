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
  const persist = modifyLocalStorage({ type: 'get', key: 'persist' });
  const hasAccess = modifyLocalStorage({ type: 'get', key: 'has_access' });

  useEffect(() => {
    if (hasAccess === 'false' || !hasAccess) {
      modifyLocalStorage({ type: 'remove', key: 'persist' });
    }
    if (persist === 'false' || !persist) {
      modifyLocalStorage({ type: 'remove', key: 'has_access' });
    }
    if (persist === 'true' && hasAccess === 'true') {
      dispatch(setAuthActionType('refresh'));
      dispatch(getUser());
    }
  }, []);

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
