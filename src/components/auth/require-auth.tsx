import { useAuth } from '@app/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
  const { user, authUser } = useAuth();
  const location = useLocation();

  return (
    <>
      {user || authUser ? (
        <Outlet />
      ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
      )}
    </>
  );
};
