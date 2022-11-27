import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { userSelector } from '@features/slices/user';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAuth = () => {
  const { user } = useAppSelector(userSelector);
  return useMemo(() => ({ user }), [user]);
};
