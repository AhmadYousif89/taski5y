import { useAppDispatch } from '@app/hooks';
import { getUser } from '@features/services/user';
import { AppLayout, AppRoutes } from 'components/app';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}

export default App;
