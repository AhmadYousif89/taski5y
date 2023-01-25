import { ResponseError, ResponseStatus } from './http.types';

const actionTypes = [
  'fetching',
  'creating',
  'updating',
  'deleting',
  'create_success',
  'update_success',
  'delete_success'
] as const;

export type TaskActionType = typeof actionTypes[number] | '';
export type TaskStatus = 'Todo' | 'InProgress' | 'Completed' | '';
export type TaskPriority = 'Normal' | 'High';

export type TaskState = {
  tasks: Task[];
  completedTasks: Task[];
  totalTasks: number;
  totalTodoTasks: number;
  totalInProgressTasks: number;
  totalCompletedTasks: number;
  actionType: TaskActionType;
  status: ResponseStatus;
  error: Partial<ResponseError>;
};
export type Task = {
  id: string;
  userId: string;
  title: string;
  details: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  expireDate: string | null;
  isExpired: boolean;
};
