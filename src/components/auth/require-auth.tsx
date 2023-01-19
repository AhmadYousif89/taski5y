import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'hooks';

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to={'/'} state={{ from: location }} replace={true} />;
};
