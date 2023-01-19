import { Task } from 'features/types';
import { SortOrder, SortType } from 'hooks';

type Sort = { sort: SortOrder; type: SortType };
/**
 * Sorts a list of tasks based on the specified sorting parameters.
 * @param {Task[]} tasks - The list of tasks to be sorted.
 * @param {Sort} params - An object containing the sorting parameters.
 * @property {SortOrder} params.sort - The sort order ('asc' or 'desc').
 * @property {SortType} params.type - The type of sorting to be applied ('alpha', 'date' or 'priority').
 * @returns {Task[]} The sorted list of tasks.
 * @example
 * const sortedTasks = sortTasks(tasks, { sort: 'asc', type: 'alpha' });
 * console.log(sortedTasks);
 */
export const sortTasks = (tasks: Task[], { sort, type }: Sort): Task[] => {
  const data = tasks ? [...tasks] : [];

  const sortFn = (taskA: Task, taskB: Task) => {
    switch (type) {
      case 'alpha':
        return sort === 'asc'
          ? taskA.title.toLowerCase().localeCompare(taskB.title.toLowerCase())
          : taskB.title.toLowerCase().localeCompare(taskA.title.toLowerCase());
      case 'date':
        return sort === 'asc'
          ? taskA.createdAt.localeCompare(taskB.createdAt)
          : taskB.createdAt.localeCompare(taskA.createdAt);
      case 'priority':
        if (sort === 'asc') {
          return taskA.priority < taskB.priority ? 1 : -1;
        } else {
          return taskA.priority > taskB.priority ? 1 : -1;
        }
      default:
        return taskA.priority > taskB.priority ? 1 : -1;
    }
  };

  return data.sort(sortFn);
};
