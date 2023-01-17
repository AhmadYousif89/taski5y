import { ResponseError, ResponseStatus } from './http.types';

export type TaskSortOrder = 'asc' | 'desc' | '';
export type TaskSortType = 'alpha' | 'priority' | 'createdAt' | 'updatedAt' | '';
export type TaskActionType =
  | 'fetching'
  | 'creating'
  | 'updating'
  | 'deleting'
  | 'create_success'
  | 'update_success'
  | 'delete_success'
  | '';
export type TaskStatus = 'Todo' | 'InProgress' | 'Completed' | '';
export type TaskPriority = 'Normal' | 'High';
export type Task = {
  id: string;
  userId: string;
  title: string;
  details: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};
export type TaskState = {
  tasks: Task[];
  completedTasks: Task[];
  totalTasks: number;
  totalTodoTasks: number;
  totalInProgressTasks: number;
  totalCompletedTasks: number;
  searchedTaskQuery: string;
  activeTaskPanel: TaskStatus;
  actionType: TaskActionType;
  status: ResponseStatus;
  error: Partial<ResponseError>;
};
