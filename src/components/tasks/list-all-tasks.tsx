import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import { Modal } from '@ui/modal';
import { TaskItem } from './task-item/task-item';
import { sortTasks, searchTasks } from './helpers';
import { Task } from '@features/types';
import { toggleSideMenu } from '@features/slices/ui';
import { setTaskActionType, taskSelector } from '@features/slices/task';
import { getAllTasks } from '@features/services/tasks';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const {
    tasks,
    status,
    actionType,
    searchedTaskQuery: query,
  } = useAppSelector(taskSelector);

  useEffect(() => {
    dispatch(setTaskActionType('fetching'));
    dispatch(getAllTasks());
  }, []);

  useEffect(() => {
    if (status === 'fulfilled') {
      setTimeout(() => {
        dispatch(setTaskActionType(''));
      }, 1000);
    }
  }, [status]);

  if (status === 'loading') {
    if (actionType === 'fetching') return <Modal />;
    if (actionType === 'deleting') return <Modal actionMsg="Deleting ..." />;
  }

  let updatedTasks = [...tasks];
  updatedTasks.sort((a, b) => a.priority.localeCompare(b.priority));

  updatedTasks = searchTasks(updatedTasks, query);

  updatedTasks = sortTasks(updatedTasks);

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
        <h2 className="text-3xl">You don't have any active tasks</h2>
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
