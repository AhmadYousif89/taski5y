import { axiosPrivate } from '../config/axios';
import { ResponseError, User } from '@features/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk<User, void, { rejectValue: ResponseError }>(
  'get/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/users/me`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: ResponseError }
>('update/user', async (data: Partial<User>, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate(`/users/me`, {
      data: { ...data },
      method: 'PATCH',
    });
    return response.data;
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
    const response = await axiosPrivate.delete(`/users/me`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
