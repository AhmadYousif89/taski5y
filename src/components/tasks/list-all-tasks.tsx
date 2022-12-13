import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import { Backdrop } from '@ui/backdrop';
import { ActionModal } from '@ui/action-modal';
import { TaskItem } from './task-item/task-item';
import { sortTasks, searchTasks } from './helpers';
import { toggleSideMenu } from '@features/slices/ui';
import { getAllTasks } from '@features/services/tasks';
import { setTaskActionType, taskSelector } from '@features/slices/task';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, actionType, searchedTaskQuery: query } = useAppSelector(taskSelector);

  const fetchTasks = async () => {
    dispatch(setTaskActionType('fetching'));
    await dispatch(getAllTasks());
    dispatch(setTaskActionType(''));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (actionType === 'fetching') {
    return (
      <>
        <ActionModal actionType="transition" msg="Loading ..." />
        <Backdrop />
      </>
    );
  }
  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" msg="Deleting ..." />
        <Backdrop />
      </>
    );
  }

  let updatedTasks = [...tasks];

  updatedTasks = sortTasks(updatedTasks);

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

  updatedTasks = searchTasks(updatedTasks, query);

  if (query && updatedTasks.length === 0) {
    return (
      <h2 className="mt-20 text-center text-3xl text-color-base">
        Your search didn't match any result!
      </h2>
    );
  }

  const searchMsg =
    query && updatedTasks.length > 0 ? (
      <h3 className="ml-8 text-3xl text-color-base">Search result</h3>
    ) : null;

  return (
    <>
      {searchMsg}
      <ul
        aria-label="Task-list"
        className="mx-10 mt-8 mb-16 grid grid-cols-[repeat(auto-fit,minmax(32rem,.65fr))] justify-center gap-8">
        {updatedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};
