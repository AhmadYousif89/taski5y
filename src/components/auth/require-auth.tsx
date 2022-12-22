import { useAuth } from '@app/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <Navigate to={'/'} state={{ from: location }} replace={true} />
      )}
    </>
  );
};
