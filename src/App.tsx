import { useEffect } from 'react';
import { AppRoutes } from 'components/app';
import { useAppDispatch } from '@app/hooks';
import { getUser } from '@features/services/user';

function App() {
  const dispatch = useAppDispatch();

  const persist = localStorage.getItem('persist');
  useEffect(() => {
    if (persist === 'true') {
      dispatch(getUser());
    }
  }, [persist]);

  return <AppRoutes />;
}

export default App;
