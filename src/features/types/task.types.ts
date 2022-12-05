export type TaskSortOrder = 'asc' | 'desc';
export type TaskSortType = 'alpha' | 'priority' | 'createdAt' | 'updatedAt';
export type TaskActionType = 'fetching' | 'creating' | 'updating' | 'deleting' | '';
export interface TaskSortQuery {
  sortOrder: TaskSortOrder;
  sortType: TaskSortType;
}
export type TaskStatus = 'Todo' | 'InProgress' | 'Completed' | '';
export type TaskPriority = 'Normal' | 'High';

export interface Task {
  id: string;
  userId: string;
  title: string;
  details: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}
