import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Modal } from '@ui/modal';
import { TaskItem } from './task-item';
import { sortTasks } from './helper/sort-tasks';
import { toggleSideMenu } from '@features/slices/ui';
import { taskSelector } from '@features/slices/task';
import { getAllTasks } from '@features/services/tasks';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Task, TaskSortType, TaskSortOrder } from '@features/types';

export const TaskList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { tasks, status, searchedTaskQuery: query } = useAppSelector(taskSelector);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  if (status === 'loading') return <Modal msg="Loading . . ." />;

  let updatedTasks = [...tasks];
  updatedTasks.sort((a, b) => a.priority.localeCompare(b.priority));

  const searchedTasks = () => {
    if (query) {
      return updatedTasks.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.details.toLowerCase().includes(query),
      );
    }
    return updatedTasks;
  };

  if (query) updatedTasks = searchedTasks();

  const params = new URLSearchParams(location.search);
  const sortOrder = params.get('sort') as TaskSortOrder;
  const sortType = params.get('type') as TaskSortType;
  const sortObj = { sortOrder, sortType };

  if (params.has('sort')) updatedTasks = sortTasks(updatedTasks, sortObj);

  const searchMsg =
    query && updatedTasks.length > 0 ? (
      <h3 className="ml-8 text-3xl text-color-base">Search result</h3>
    ) : null;

  if (query && updatedTasks.length === 0) {
    return (
      <h2 className="mt-20 text-center text-3xl text-color-base">
        Your search didn't match any result!
      </h2>
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
    <>
      {searchMsg}
      <ul
        aria-label="Task-list"
        className="my-8 mx-4 grid grid-cols-[repeat(auto-fit,minmax(31rem,.5fr))] justify-center gap-8">
        {updatedTasks.map(task => (
          <TaskItem key={task?.id} task={task as Task} />
        ))}
      </ul>
    </>
  );
};
