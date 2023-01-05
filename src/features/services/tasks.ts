import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosPrivate } from 'features/config';
import { ResponseError, Task } from 'features/types';

export const getAllTasks = createAsyncThunk<Task[], void, { rejectValue: Partial<ResponseError> }>(
  'all/tasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get('/tasks');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addNewTask = createAsyncThunk<
  Task,
  Partial<Task>,
  { rejectValue: Partial<ResponseError> }
>('add/task', async (task: Partial<Task>, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate.post('/tasks', task);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const updateTask = createAsyncThunk<
  Task,
  Partial<Task>,
  { rejectValue: Partial<ResponseError> }
>('update/task', async (patch: Partial<Task>, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate(`/tasks/${patch.id}`, {
      method: 'PATCH',
      data: { ...patch }
    });
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteTasks = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: Partial<ResponseError> }
>('delete/task', async (taskId: string, { rejectWithValue }) => {
  try {
    const { data } = await axiosPrivate.delete(`/tasks/${taskId}`);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
