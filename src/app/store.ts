import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import uiReducer from 'features/slices/ui';
import authReducer from 'features/slices/auth';
import taskReducer from 'features/slices/task';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    tasks: taskReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
