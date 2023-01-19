import { Task } from 'features/types';

/**
 * Filters a list of tasks based on a search query.
 * @param {Task[]} tasks - The list of tasks to be searched.
 * @param {string | null} query - The search query.
 * @returns {Task[]} A list of tasks that match the search query.
 * @example
 * const filteredTasks = searchTasks(tasks, 'buy some groceries');
 * console.log(filteredTasks);
 */
export const searchTasks = (tasks: Task[], query: string | null): Task[] => {
  if (query) {
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.details.toLowerCase().includes(query.toLowerCase())
    );
  }
  return tasks;
};
