import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { authSelector } from '@features/slices/auth';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAuth = () => {
  const { user } = useAppSelector(authSelector);
  return useMemo(() => ({ user }), [user]);
};
