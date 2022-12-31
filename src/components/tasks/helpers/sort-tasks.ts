import { Task, TaskSortOrder, TaskSortType } from 'features/types';

export const sortTasks = (tasks: Task[], params: { order: TaskSortOrder; type: TaskSortType }) => {
  const data = tasks ? [...tasks] : [];

  const sortedData = data.sort((taskA, taskB) => {
    const { order, type } = params;
    switch (type) {
      case 'alpha': {
        if (order === 'asc')
          return taskA.title.toLowerCase().localeCompare(taskB.title.toLowerCase());
        else return taskB.title.toLowerCase().localeCompare(taskA.title.toLowerCase());
      }
      case 'createdAt': {
        if (order === 'asc') return taskA.createdAt.localeCompare(taskB.createdAt);
        else return taskB.createdAt.localeCompare(taskA.createdAt);
      }
      case 'priority': {
        if (order === 'asc') return taskA.priority === 'Normal' ? -1 : 1;
        else return taskB.priority === 'Normal' ? -1 : 1;
      }
      default:
        return taskA.priority.localeCompare(taskB.priority);
    }
  });

  return sortedData;
};
