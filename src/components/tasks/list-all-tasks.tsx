import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ActionModal, Backdrop } from 'components/ui';

import { setProfile, toggleSideMenu } from 'features/slices/ui';
import { getAllTasks } from 'features/services/tasks';
import { taskSelector, setTaskActionType } from 'features/slices/task';

import { TaskItem } from './task-item';
import { addTimer } from 'helpers/timeout';
import { searchTasks, sortTasks } from './helpers';
import { useSortParams } from 'hooks/use-sort-params';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, actionType, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { order, type } = useSortParams();

  let updatedTasks = [...tasks];
  const sortedData = sortTasks(updatedTasks, { order, type });
  updatedTasks = sortedData;

  const fetchTasks = () => {
    dispatch(setTaskActionType('fetching'));
    dispatch(getAllTasks());
    addTimer(() => dispatch(setTaskActionType('')), 1);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (actionType === 'fetching') {
    return (
      <>
        <ActionModal actionType="transition" msg="loading" />
        <Backdrop />
      </>
    );
  }
  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" msg="deleting" />
        <Backdrop />
      </>
    );
  }

  if (updatedTasks.length === 0) {
    return (
      <div className="my-20 flex flex-col text-center text-color-base">
        <h2 className="text-3xl">You don't have any active tasks</h2>
        <button
          onClick={() => {
            dispatch(setProfile(false));
            dispatch(toggleSideMenu());
          }}
          className="mt-8 block self-center rounded-md px-6 py-4 text-3xl text-color-base ring-color-base transition-colors hover:ring-2 hover:transition-transform active:translate-y-1 active:bg-sky-500">
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
      <ul aria-label="task-list" className="grid-container mt-8 mb-16">
        {updatedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};
