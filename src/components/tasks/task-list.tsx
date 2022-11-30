import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { TaskItem } from './task-item';
import { toggleSideMenu } from '@features/slices/ui';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  Task,
  TaskStatus,
  TaskSortType,
  TaskSortQuery,
  TaskSortOrder,
} from '@features/types';
import { taskSelector } from '@features/slices/task';
import { getAllTasks } from '@features/services/tasks';
import { Modal } from '@ui/modal';

export const TaskList = ({ filterBy }: { filterBy?: TaskStatus }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    tasks,
    status,
    activeTaskPanel,
    searchedTaskQuery: query,
  } = useAppSelector(taskSelector);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  if (status === 'fulfilled') return <Modal />;

  const searchedTasks = () => {
    const data = [...tasks];
    // general search on main task list
    if (query && !activeTaskPanel) {
      return data.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.details.toLowerCase().includes(query),
      );
    }
    // specific search based on active task panel [Todo, In Progress, Completed]
    if (query) {
      return data.filter(task => {
        if (activeTaskPanel === task.status) {
          return (
            task.title.toLowerCase().includes(query) ||
            task.details.toLowerCase().includes(query)
          );
        }
      });
    }
    if (filterBy === 'Todo') {
      return data.filter(task => task.status === 'Todo');
    }
    if (filterBy === 'InProgress') {
      return data.filter(task => task.status === 'InProgress');
    }
    return data;
  };

  const params = new URLSearchParams(location.search);
  const sortOrder = params.get('sort') as TaskSortOrder;
  const sortType = params.get('type') as TaskSortType;
  const sortObj = { sortOrder, sortType };

  const sortedTasks = ({ sortOrder, sortType }: TaskSortQuery) => {
    const data = [...tasks];
    return data.sort((taskA, taskB) => {
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
          return 0;
      }
    });
  };

  let updatedTasks = [...tasks];
  updatedTasks.sort((a, b) => a.priority.localeCompare(b.priority));

  if (query || filterBy) {
    updatedTasks = searchedTasks();
  }

  if (params.has('sort') && !query) {
    updatedTasks = sortedTasks(sortObj);
  }

  if (query && updatedTasks.length === 0) {
    return (
      <h2 className="mt-20 text-center text-3xl">Your search didn't match any result!</h2>
    );
  }

  if (updatedTasks.length === 0) {
    return (
      <div className="my-20 flex flex-col items-center text-color-base">
        <h2 className="text-center text-3xl">You don't have any active tasks</h2>
        <button
          onClick={() => dispatch(toggleSideMenu())}
          className="mt-8 block rounded-md px-6 py-4 text-center text-3xl text-color-base ring-color-base transition-colors hover:ring-2 hover:transition-transform active:translate-y-1 active:bg-sky-500">
          Create new task ?
        </button>
      </div>
    );
  }

  return (
    <ul
      aria-label="Task-list"
      className="my-16 mx-4 grid grid-cols-[repeat(auto-fit,minmax(31rem,.5fr))] justify-center gap-8">
      {updatedTasks.map(task => (
        <TaskItem key={task?.id} task={task as Task} />
      ))}
    </ul>
  );
};
