import { Task } from 'features/types';

export const searchTasks = (tasks: Task[], query: string) => {
  if (query) {
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(query) ||
        task.details.toLowerCase().includes(query),
    );
  }

  return tasks;
};
