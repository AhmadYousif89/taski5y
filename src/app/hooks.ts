import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { authSelector } from '@features/slices/auth';
import { userSelector } from '@features/slices/user';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAuth = () => {
  const { user: authUser } = useAppSelector(authSelector);
  const { user } = useAppSelector(userSelector);
  return useMemo(() => ({ authUser, user }), [authUser, user]);
};
