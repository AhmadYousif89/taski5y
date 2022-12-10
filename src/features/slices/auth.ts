import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthActionType, ResponseError, ResponseStatus, User } from '../types';
import {
  signUp,
  signIn,
  signOut,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
} from '../services/auth';
import { persistData } from 'helpers/persist-data';

export interface AuthState {
  error: ResponseError;
  status: ResponseStatus;
  actionType: AuthActionType;
  user: User | null;
  message: string;
}
const initError = { statusCode: 0, message: '', error: '' };

const initialState: AuthState = {
  error: initError,
  status: 'idle',
  message: '',
  user: null,
  actionType: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth(state) {
      return { ...initialState, user: state.user };
    },
    setAuthActionType(state, { payload }: PayloadAction<AuthActionType>) {
      state.actionType = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.user = payload;
        persistData('hasAccess', true);
        localStorage.removeItem('error');
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
        state.user = null;
      });

    builder
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.user = payload;
        persistData('hasAccess', true);
        localStorage.removeItem('error');
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.user = null;
        state.error = payload || initError;
      });

    builder
      .addCase(signOut.pending, state => {
        state.status = 'loading';
      })
      .addCase(signOut.fulfilled, () => {
        localStorage.removeItem('persist');
        localStorage.removeItem('hasAccess');
        return initialState;
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

    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.user = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.actionType = '';
        state.user = null;
        state.error = payload || initError;
      });

    builder
      .addCase(updateUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(deleteUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, () => {
        localStorage.removeItem('persist');
        localStorage.removeItem('hasAccess');
        return initialState;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.actionType = '';
        state.error = payload || initError;
      });
  },
});

export const { resetAuth, setAuthActionType } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
