import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { axiosPrivate } from '@features/config/axios';
import { SignInRequest, ResponseError, SignUpRequest, User } from '@features/types';

export const signUp = createAsyncThunk<
  User,
  SignUpRequest,
  { rejectValue: ResponseError }
>('auth/signup', async (user: SignUpRequest, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/register`, user, { withCredentials: true });
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const signIn = createAsyncThunk<
  User,
  SignInRequest,
  { rejectValue: ResponseError }
>('auth/login', async (credentials: SignInRequest, { rejectWithValue }) => {
  try {
    // Don't use axiosPrivate on this end point !
    const { data } = await axios.post(`/auth/login`, credentials, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const googleLogin = createAsyncThunk<
  User,
  { credential: string },
  { rejectValue: ResponseError }
>('auth/login-with-google', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/google/login`, credentials, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const signOut = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: ResponseError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate.post(`/auth/logout`);
    return data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const resetPassword = createAsyncThunk<
  string,
  SignInRequest,
  { rejectValue: ResponseError }
>('auth/reset', async (credentials: SignInRequest, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/reset`, credentials);
    return data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

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
  { message: string },
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
