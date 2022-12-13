import { useLocation } from 'react-router-dom';
import { Task, TaskSortOrder, TaskSortType } from '@features/types';

export const sortTasks = (data: Task[]) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const sortOrder = params.get('sort') as TaskSortOrder;
  const sortType = params.get('type') as TaskSortType;

  const tasks = [...data];

  return tasks.sort((taskA, taskB) => {
    switch (sortType) {
      case 'alpha': {
        if (sortOrder === 'asc')
          return taskA.title.toLowerCase().localeCompare(taskB.title.toLowerCase());
        else return taskB.title.toLowerCase().localeCompare(taskA.title.toLowerCase());
      }
      case 'createdAt': {
        if (sortOrder === 'asc') return taskA.createdAt.localeCompare(taskB.createdAt);
        else return taskB.createdAt.localeCompare(taskA.createdAt);
      }
      case 'priority': {
        if (sortOrder === 'asc') return taskA.priority === 'Normal' ? -1 : 1;
        else return taskB.priority === 'Normal' ? -1 : 1;
      }
      default:
        return taskA.priority.localeCompare(taskB.priority);
    }
  });
};
