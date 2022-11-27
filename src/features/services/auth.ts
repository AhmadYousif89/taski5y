import axios, { axiosPrivate } from '@features/config/axios';
import { User, SignInRequest, ResponseError } from '@features/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk<
  string,
  Partial<User>,
  { rejectValue: ResponseError }
>('auth/signup', async (user: Partial<User>, { rejectWithValue }) => {
  try {
    // DON'T USE AXIOS PRIVATE, otherwise no response will be returned
    const response = await axios.post(`/auth/register`, user, { withCredentials: true });
    return response.data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const signIn = createAsyncThunk<
  string,
  Partial<User>,
  { rejectValue: ResponseError }
>('auth/login', async (user: Partial<User>, { rejectWithValue }) => {
  try {
    // DON'T USE AXIOS PRIVATE, otherwise no response will be returned
    const response = await axios.post(`/auth/login`, user, { withCredentials: true });
    return response.data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const signOut = createAsyncThunk<
  void | string,
  void,
  { rejectValue: ResponseError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.post(`/auth/logout`);
    return response.data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const resetPassword = createAsyncThunk<
  string,
  SignInRequest,
  { rejectValue: ResponseError }
>('auth/reset', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/auth/reset`, data);
    return response.data?.message;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});
