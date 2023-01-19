import { useMemo } from 'react';
import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/slices/auth';

export const useAuth = () => {
  const { user } = useAppSelector(authSelector);
  return useMemo(() => ({ user }), [user]);
};
