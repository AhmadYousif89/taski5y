import { useEffect } from 'react';
import { AppRoutes } from 'components/app';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { authSelector, setAuthActionType } from '@features/slices/auth';
import { getUser } from '@features/services/auth';
import { Backdrop } from '@ui/backdrop';
import { Modal } from '@ui/modal';

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

  if (status === 'loading' && actionType) {
    return (
      <>
        <Modal
          actionMsg={`${
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
