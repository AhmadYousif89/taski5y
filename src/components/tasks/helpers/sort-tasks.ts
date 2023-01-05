import { Task, TaskSortOrder, TaskSortType } from 'features/types';

/**
 * Sorts a list of tasks based on the specified sorting parameters.
 * @param {Task[]} tasks - The list of tasks to be sorted.
 * @param {{ sort: TaskSortOrder; type: TaskSortType }} params - An object containing the sorting parameters.
 * @property {TaskSortOrder} params.sort - The sort order (either 'asc' or 'desc').
 * @property {TaskSortType} params.type - The type of sorting to be applied (either 'alpha', 'createdAt', 'priority', or 'status').
 * @returns {Task[]} The sorted list of tasks.
 * @example
 * const sortedTasks = sortTasks(tasks, { sort: 'asc', type: 'alpha' });
 * console.log(sortedTasks);
 */
export const sortTasks = (
  tasks: Task[],
  { sort, type }: { sort: TaskSortOrder; type: TaskSortType }
): Task[] => {
  const data = tasks ? [...tasks] : [];

  const sortFn = (taskA: Task, taskB: Task) => {
    switch (type) {
      case 'alpha':
        return sort === 'asc'
          ? taskA.title.toLowerCase().localeCompare(taskB.title.toLowerCase())
          : taskB.title.toLowerCase().localeCompare(taskA.title.toLowerCase());
      case 'createdAt':
        return sort === 'asc'
          ? taskA.createdAt.localeCompare(taskB.createdAt)
          : taskB.createdAt.localeCompare(taskA.createdAt);
      case 'priority':
        return sort === 'asc'
          ? taskA.priority === 'High'
            ? 1
            : -1
          : taskA.priority.localeCompare(taskB.priority);
      default:
        return 0;
    }
  };

  return data.sort(sortFn);
};
