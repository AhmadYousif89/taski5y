import { RootState } from '@app/store';
import {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTasks,
} from '@features/services/tasks';
import {
  Task,
  TaskStatus,
  TaskSortQuery,
  ResponseError,
  ResponseStatus,
} from '@features/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
  tasks: Task[];
  completedTasks: Task[];
  totalTasks: number;
  totalTodoTasks: number;
  totalInProgressTasks: number;
  totalCompletedTasks: number;
  searchedTaskQuery: string;
  activeTaskPanel: TaskStatus | string;
  sortedTaskQuery: TaskSortQuery | string;
  status: ResponseStatus;
  error: ResponseError;
}

const initError: ResponseError = { statusCode: 0, message: '', error: '' };

const initialState: TaskState = {
  tasks: [],
  completedTasks: [],
  totalTasks: 0,
  totalTodoTasks: 0,
  totalCompletedTasks: 0,
  totalInProgressTasks: 0,
  activeTaskPanel: '',
  sortedTaskQuery: '',
  searchedTaskQuery: '',
  error: initError,
  status: 'idle',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks() {
      return initialState;
    },
    storeTaskSearchQuery(state, action: PayloadAction<string>) {
      state.searchedTaskQuery = action.payload.toLowerCase();
    },
    storeTaskActivePanel(state, action: PayloadAction<TaskStatus | string>) {
      state.activeTaskPanel = action.payload as TaskStatus;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const tasks = action.payload.filter(t => t.status !== 'Completed');
        state.tasks = tasks;
        state.totalTasks = state.tasks.length;
        const completedTasks = action.payload.filter(t => t.status === 'Completed');
        state.completedTasks = completedTasks;
        state.totalCompletedTasks = state.completedTasks.length;
        state.totalTodoTasks = tasks.filter(t => t.status === 'Todo').length;
        state.totalInProgressTasks = tasks.filter(t => t.status === 'InProgress').length;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });

    builder
      .addCase(addNewTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload.status === 'Todo') {
          state.totalTodoTasks++;
        } else if (action.payload.status === 'InProgress') {
          state.totalInProgressTasks++;
        }
        state.tasks.push(action.payload as Task);
        state.totalTasks++;
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });

    builder
      .addCase(updateTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        // action.payload = { API Task object }
        state.status = 'fulfilled';
        const apiTask = action.payload;
        state.tasks = state.tasks.map(task =>
          task.id !== apiTask.id ? task : { ...task, ...apiTask },
        );
        const updatedTask = state.tasks.find(task => task.id === apiTask.id);

        if (updatedTask?.status === 'Completed') {
          state.completedTasks.push(updatedTask);
          state.totalCompletedTasks++;
          if (state.totalTasks > 0) state.totalTasks--;
          state.tasks = state.tasks.filter(task => task.id !== updatedTask?.id);
        }
        state.totalTodoTasks = state.tasks.filter(t => t.status === 'Todo').length;
        state.totalInProgressTasks = state.tasks.filter(
          t => t.status === 'InProgress',
        ).length;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });

    builder
      .addCase(deleteTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        // action.payload = { id: deletedTaskId , message: 'Task deleted'}
        state.status = 'fulfilled';
        const taskId = action?.payload?.id;
        const deletedTask = state.tasks.find(task => task.id === taskId);
        if (deletedTask?.status === 'Todo' && state.totalTodoTasks > 0) {
          state.totalTodoTasks--;
        }
        if (deletedTask?.status === 'InProgress' && state.totalInProgressTasks > 0) {
          state.totalInProgressTasks--;
        }
        state.tasks = state.tasks.filter(task => task.id !== taskId);
        const deleteCompletedTask = state.completedTasks.find(task => task.id === taskId);
        if (deleteCompletedTask) {
          state.completedTasks = state.completedTasks.filter(
            task => task.id !== deleteCompletedTask.id,
          );
          state.totalCompletedTasks--;
        }
        state.totalTasks--;
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || initError;
      });
  },
});

export const { resetTasks, storeTaskSearchQuery, storeTaskActivePanel } =
  taskSlice.actions;
export const taskSelector = (state: RootState) => state.tasks;
export default taskSlice.reducer;
