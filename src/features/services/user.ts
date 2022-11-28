import { axiosPrivate } from '../config/axios';
import { ResponseError, User } from '@features/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk<User, void, { rejectValue: ResponseError }>(
  'get/user',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/users/me`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: ResponseError }
>('update/user', async (patch: Partial<User>, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate(`/users/me`, {
      data: { ...patch },
      method: 'PATCH',
    });
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteUser = createAsyncThunk<
  { status: number; message: string },
  void,
  { rejectValue: ResponseError }
>('delete/user', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate.delete(`/users/me`);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
