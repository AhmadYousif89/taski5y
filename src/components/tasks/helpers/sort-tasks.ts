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
  params: { sort: TaskSortOrder; type: TaskSortType }
): Task[] => {
  const data = tasks ? [...tasks] : [];

  const sortedData = data.sort((taskA, taskB) => {
    const { sort, type } = params;
    switch (type) {
      case 'alpha': {
        if (sort === 'asc')
          return taskA.title.toLowerCase().localeCompare(taskB.title.toLowerCase());
        else return taskB.title.toLowerCase().localeCompare(taskA.title.toLowerCase());
      }
      case 'createdAt': {
        if (sort === 'asc') return taskA.createdAt.localeCompare(taskB.createdAt);
        else return taskB.createdAt.localeCompare(taskA.createdAt);
      }
      case 'priority': {
        if (sort === 'asc') return taskA.priority === 'Normal' ? -1 : 1;
        else return taskB.priority === 'Normal' ? -1 : 1;
      }
      default:
        return taskA.priority.localeCompare(taskB.priority);
    }
  });

  return sortedData;
};
