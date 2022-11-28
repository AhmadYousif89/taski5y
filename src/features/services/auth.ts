import axios, { axiosPrivate } from '@features/config/axios';
import { SignInRequest, ResponseError, SignUpRequest, User } from '@features/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk<
  User,
  SignUpRequest,
  { rejectValue: ResponseError }
>('auth/signup', async (user: SignUpRequest, { rejectWithValue }) => {
  try {
    // DON'T USE AXIOS PRIVATE, otherwise no response will be returned
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
    // DON'T USE AXIOS PRIVATE, otherwise no response will be returned
    const { data } = await axios.post(`/auth/login`, credentials, {
      withCredentials: true,
    });
    return data;
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
