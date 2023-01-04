import { createAsyncThunk } from '@reduxjs/toolkit';

import axios, { axiosPrivate } from 'features/config/axios';
import { AuthSignIn, ResponseError, AuthSignUp, User } from 'features/types';

export const signUp = createAsyncThunk<User, AuthSignUp, { rejectValue: ResponseError }>(
  'auth/signup',
  async (user: AuthSignUp, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/auth/register`, user, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const signIn = createAsyncThunk<User, AuthSignIn, { rejectValue: ResponseError }>(
  'auth/login',
  async (credentials: AuthSignIn, { rejectWithValue }) => {
    try {
      // Don't use axiosPrivate on this end point !
      const { data } = await axios.post(`/auth/login`, credentials, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const loginWithGoogle = createAsyncThunk<User, void, { rejectValue: ResponseError }>(
  'auth/google/login',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/auth/google/login`, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const signOut = createAsyncThunk<{ message: string }, void, { rejectValue: ResponseError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/auth/logout`);
      return data?.message;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk<string, AuthSignIn, { rejectValue: ResponseError }>(
  'auth/reset',
  async (credentials: AuthSignIn, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/auth/reset`, credentials);
      return data?.message;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

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

export const updateUser = createAsyncThunk<User, Partial<User>, { rejectValue: ResponseError }>(
  'update/user',
  async (patch: Partial<User>, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate(`/users/me`, {
        data: { ...patch },
        method: 'PATCH',
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

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
