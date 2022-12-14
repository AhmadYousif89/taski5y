import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setProfile, toggleSideMenu } from 'features/slices/ui';
import { ActionModal, Backdrop } from 'components/ui';
import { taskSelector } from 'features/slices/task';

import { TaskItem } from './task-item';
import { useSearchParams } from 'hooks';
import { SearchMsg } from './search-msg';
import { SearchErrMsg } from './search-error-msg';
import { searchTasks, sortTasks } from './helpers';
import { useFetchTasks } from './hooks/use-fetch-tasks';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const { actionType, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { sort, type } = useSearchParams();
  const tasks = useFetchTasks();

  let updatedTasks = [...tasks];
  const sortedData = sortTasks(updatedTasks, { sort, type });
  updatedTasks = sortedData;

  switch (actionType) {
    case 'fetching':
      return (
        <>
          <ActionModal actionType="transition" msg="loading" />
          <Backdrop />
        </>
      );
    case 'deleting':
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
          className="mt-8 block self-center rounded-md px-6 py-4 text-2xl text-color-base ring-color-base transition-colors hover:ring-2 hover:transition-transform active:translate-y-1 active:bg-sky-500">
          Create new task ?
        </button>
      </div>
    );
  }

  updatedTasks = searchTasks(updatedTasks, query);

  if (query && updatedTasks.length === 0) return <SearchErrMsg />;

  const searchMsg = query && updatedTasks.length > 0 ? <SearchMsg tasks={updatedTasks} /> : null;

  return (
    <>
      {searchMsg}
      <ul aria-label="task-list" className="grid-container mt-8">
        {updatedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};
