import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'app/hooks';

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) return <Outlet />;
  return <Navigate to={'/'} state={{ from: location }} replace={true} />;
};
