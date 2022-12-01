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
  todoTasks: Task[];
  completedTasks: Task[];
  inProgressTasks: Task[];
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
  todoTasks: [],
  completedTasks: [],
  inProgressTasks: [],
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
    storeTaskSearchQuery(state, { payload }: PayloadAction<string>) {
      state.searchedTaskQuery = payload.toLowerCase();
    },
    storeTaskActivePanel(state, { payload }: PayloadAction<TaskStatus | string>) {
      state.activeTaskPanel = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.tasks = payload.filter(t => t.status !== 'Completed');
        state.totalTasks = state.tasks.length;
        state.todoTasks = payload.filter(t => t.status === 'Todo');
        state.totalTodoTasks = state.todoTasks.length;
        state.completedTasks = payload.filter(t => t.status === 'Completed');
        state.totalCompletedTasks = state.completedTasks.length;
        state.inProgressTasks = payload.filter(t => t.status === 'InProgress');
        state.totalInProgressTasks = state.inProgressTasks.length;
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
        if (payload.status === 'Todo') {
          state.todoTasks.push(payload);
          state.totalTodoTasks++;
        }
        if (payload.status === 'InProgress') {
          state.inProgressTasks.push(payload);
          state.totalInProgressTasks++;
        }
        state.tasks.push(payload);
        state.totalTasks++;
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
        // add updated task to the main Tasks[] then distribute to other task arrays
        state.tasks = state.tasks.map(t => (t.id !== updatedTaskId ? t : { ...payload }));

        // Case => Task details was updated or task was switched from todo to inProgress or vice versa
        state.todoTasks = state.tasks.filter(t => t.status === 'Todo');
        state.totalTodoTasks = state.todoTasks.length;
        state.inProgressTasks = state.tasks.filter(t => t.status === 'InProgress');
        state.totalInProgressTasks = state.inProgressTasks.length;

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
        state.todoTasks = state.todoTasks.filter(task => task.id !== taskId);
        state.totalTodoTasks = state.todoTasks.length;
        state.inProgressTasks = state.inProgressTasks.filter(t => t.id !== taskId);
        state.totalInProgressTasks = state.inProgressTasks.length;
        state.completedTasks = state.completedTasks.filter(task => task.id !== taskId);
        state.totalCompletedTasks = state.completedTasks.length;
      })
      .addCase(deleteTasks.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload || initError;
      });
  },
});

export const { resetTasks, storeTaskSearchQuery, storeTaskActivePanel } =
  taskSlice.actions;
export const taskSelector = (state: RootState) => state.tasks;
export default taskSlice.reducer;
