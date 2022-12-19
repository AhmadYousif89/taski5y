import { useEffect } from 'react';
import { Backdrop } from '@ui/backdrop';
import { AppRoutes } from 'components/app';
import { ActionModal } from '@ui/action-modal';
import { getUser } from '@features/services/auth';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { authSelector, setAuthActionType } from '@features/slices/auth';

function App() {
  const dispatch = useAppDispatch();
  const { status, actionType } = useAppSelector(authSelector);
  const persist = localStorage.getItem('persist');
  const hasAccess = localStorage.getItem('hasAccess');
  useEffect(() => {
    if (persist === 'false' || !persist) localStorage.removeItem('hasAccess');
    if (persist === 'true' && hasAccess) {
      dispatch(setAuthActionType('refresh'));
      dispatch(getUser());
    }
  }, []);

  if (status === 'loading') {
    switch (actionType) {
      case 'refresh':
        return (
          <>
            <ActionModal actionType="transition" msg={'Redirecting . . . '} />
            <Backdrop />
          </>
        );
      case 'logout':
        return (
          <>
            <ActionModal actionType="transition" msg={'Logging out . . .'} />
            <Backdrop />
          </>
        );
      case 'delete':
        return (
          <>
            <ActionModal actionType="transition" msg={'Deleting account . . .'} />
            <Backdrop />
          </>
        );
    }
  }

  return <AppRoutes />;
}

export default App;
