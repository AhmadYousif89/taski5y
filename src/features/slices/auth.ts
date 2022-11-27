import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@app/store';
import { ResponseError, ResponseStatus } from '../types';
import { signUp, signIn, signOut, resetPassword } from '../services/auth';

export interface AuthState {
  error: ResponseError;
  status: ResponseStatus;
  message: string;
}
const initError = { statusCode: 0, message: '', error: '' };

const initialState: AuthState = {
  error: initError,
  status: 'idle',
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth(state) {
      state.status = 'idle';
      state.error = initError;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.message = payload;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
        state.message = '';
      });

    builder
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.message = payload;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
        state.message = '';
      });

    builder
      .addCase(signOut.pending, state => {
        state.status = 'loading';
      })
      .addCase(signOut.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(resetPassword.pending, state => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.message = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
        state.message = '';
      });
  },
});

export const { resetAuth } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
