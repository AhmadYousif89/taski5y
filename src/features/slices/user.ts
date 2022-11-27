import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@app/store';
import { ResponseError, ResponseStatus, User } from '@features/types';
import { deleteUser, getUser, updateUser } from '@features/services/user';

interface UserState {
  user: User | null;
  error: ResponseError;
  status: ResponseStatus;
}

const initError: ResponseError = { statusCode: 0, message: '', error: '' };

const initialState: UserState = {
  user: null,
  error: initError,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser(state) {
      state.status = 'idle';
      state.error = initError;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.user = null;
        state.error = action.payload || initError;
      });

    builder
      .addCase(updateUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });

    builder
      .addCase(deleteUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, state => {
        state.status = 'fulfilled';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });
  },
});

export const { resetUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.users;
export default userSlice.reducer;
