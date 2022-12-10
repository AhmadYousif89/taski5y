import { useEffect } from 'react';
import { AppRoutes } from 'components/app';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { authSelector, setAuthActionType } from '@features/slices/auth';
import { getUser } from '@features/services/auth';
import { ActionModal } from '@ui/action-modal';
import { Backdrop } from '@ui/backdrop';

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

  if (actionType && status === 'loading') {
    return (
      <>
        <ActionModal
          actionType="transition"
          msg={`${
            actionType === 'refresh'
              ? 'Redirecting ...'
              : actionType === 'logout'
              ? 'Logging out ...'
              : actionType === 'delete'
              ? 'Deleting user account ...'
              : ''
          }`}
        />
        <Backdrop />
      </>
    );
  }

  return <AppRoutes />;
}

export default App;
