import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTasks,
  deleteAllTasks
} from 'features/services/tasks';
import { ResponseError, TaskActionType, TaskState } from 'features/types';

const initError: Partial<ResponseError> = { statusCode: 0, message: '', error: '' };

const initialState: TaskState = {
  tasks: [],
  completedTasks: [],
  totalTasks: 0,
  totalTodoTasks: 0,
  totalInProgressTasks: 0,
  totalCompletedTasks: 0,
  error: initError,
  status: 'idle',
  actionType: ''
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks() {
      return initialState;
    },
    resetTaskStatus(state) {
      state.status = 'idle';
    },
    setTaskActionType(state, { payload }: PayloadAction<TaskActionType>) {
      state.actionType = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.tasks = payload.filter(t => t.status !== 'Completed');
        state.completedTasks = payload.filter(t => t.status === 'Completed');
        state.totalTasks = state.tasks.length;
        state.totalTodoTasks = state.tasks.filter(t => t.status === 'Todo').length;
        state.totalInProgressTasks = state.tasks.filter(t => t.status === 'InProgress').length;
        state.totalCompletedTasks = state.completedTasks.length;
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(addNewTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.totalTasks++;
        state.tasks.push(payload);
        if (payload.status === 'Todo') state.totalTodoTasks++;
        if (payload.status === 'InProgress') state.totalInProgressTasks++;
      })
      .addCase(addNewTask.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(updateTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const updatedTaskId = payload.id;
        state.tasks = state.tasks.map(task => (task.id !== updatedTaskId ? task : { ...payload }));
        state.totalTodoTasks = state.tasks.filter(task => task.status === 'Todo').length;
        state.totalInProgressTasks = state.tasks.filter(
          task => task.status === 'InProgress'
        ).length;
        // Case => Task was marked as complete
        if (payload.status === 'Completed') {
          state.totalTasks--;
          state.totalCompletedTasks++;
          state.completedTasks.push(payload);
          state.tasks = state.tasks.filter(t => t.status !== 'Completed');
        }
      })
      .addCase(updateTask.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(deleteTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteTasks.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const taskId = payload.id;
        state.tasks = state.tasks.filter(task => task.id !== taskId);
        state.totalTasks = state.tasks.length;
        state.totalTodoTasks = state.tasks.filter(task => task.status === 'Todo').length;
        state.totalInProgressTasks = state.tasks.filter(
          task => task.status === 'InProgress'
        ).length;
        state.completedTasks = state.completedTasks.filter(task => task.id !== taskId);
        state.totalCompletedTasks = state.completedTasks.length;
      })
      .addCase(deleteTasks.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });

    builder
      .addCase(deleteAllTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteAllTasks.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        if (payload.status === 'active') {
          state.tasks = [];
          state.totalTasks = 0;
          state.totalTodoTasks = 0;
          state.totalInProgressTasks = 0;
        } else if (payload.status === 'completed') {
          state.completedTasks = [];
          state.totalCompletedTasks = 0;
        }
      })
      .addCase(deleteAllTasks.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });
  }
});

export const { resetTasks, resetTaskStatus, setTaskActionType } = taskSlice.actions;
export const taskSelector = (state: RootState) => state.tasks;
export default taskSlice.reducer;
