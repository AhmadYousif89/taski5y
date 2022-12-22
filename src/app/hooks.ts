import { useMemo } from 'react';
import { AppDispatch, RootState } from './store';
import { authSelector } from '@features/slices/auth';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { user } = useAppSelector(authSelector);
  return useMemo(() => ({ user }), [user]);
};
