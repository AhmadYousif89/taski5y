import { Task, TaskSortOrder, TaskSortType } from 'features/types';

export const sortTasks = (tasks: Task[], params: { sort: TaskSortOrder; type: TaskSortType }) => {
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
