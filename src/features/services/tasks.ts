import { axiosPrivate } from '@features/config';
import { Task } from '@features/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: { statusCode: number; message: string } }
>('all/tasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get('/tasks');
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const addNewTask = createAsyncThunk<
  Task,
  Partial<Task>,
  { rejectValue: { statusCode: number; message: string } }
>('add/task', async (task: Partial<Task>, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.post('/tasks', task);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const updateTask = createAsyncThunk<
  Task,
  Partial<Task>,
  { rejectValue: { statusCode: number; message: string } }
>('update/task', async (task: Partial<Task>, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate(`/tasks/${task.id}`, {
      method: 'PATCH',
      data: { ...task },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteTasks = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: { statusCode: number; message: string } }
>('delete/task', async (taskId: string, { rejectWithValue }) => {
  try {
    const confirmation = window.confirm(
      'You are about to delete this task, Are you sure?',
    );
    if (!confirmation) return;
    const response = await axiosPrivate.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
