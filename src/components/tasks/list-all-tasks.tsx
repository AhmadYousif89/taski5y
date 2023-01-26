import { useSearchParams } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleProfile, toggleSideMenu } from 'features/slices/ui';
import { ActionModal, Backdrop, Button } from 'components/ui';
import { taskSelector } from 'features/slices/task';

import { TaskItem } from './task-item';
import { SearchMsg } from './search-msg';
import { NoTaskMsg } from './no-task-msg';
import { SearchErrMsg } from './search-error-msg';
import { searchTasks, sortTasks } from './helpers';
import { useFetchTasks } from './hooks/use-fetch-tasks';

export const TaskList = () => {
  const tasks = useFetchTasks();
  const dispatch = useAppDispatch();
  const { sort, type, query } = useSearchParams();
  const { actionType } = useAppSelector(taskSelector);

  let updatedTasks = [...tasks];
  const sortedData = sortTasks(updatedTasks, { sort, type });
  updatedTasks = sortedData;

  updatedTasks = searchTasks(updatedTasks, query);

  const searchMsg = query && updatedTasks.length > 0 ? <SearchMsg tasks={updatedTasks} /> : null;

  if (query && updatedTasks.length === 0) return <SearchErrMsg />;

  if (updatedTasks.length === 0) {
    return (
      <div className="my-20 flex flex-col text-center text-color-base">
        <NoTaskMsg msg="You don't have any active tasks" />
        <Button
          onClick={() => {
            dispatch(toggleProfile(false));
            dispatch(toggleSideMenu());
          }}
          className="mt-8 self-center !py-6">
          Create new task ?
        </Button>
      </div>
    );
  }

  if (actionType === 'fetching') {
    return (
      <>
        <ActionModal actionType="transition" message="loading" />
        <Backdrop />
      </>
    );
  }
  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" message="deleting" />
        <Backdrop />
      </>
    );
  }

  return (
    <>
      {searchMsg}
      <ul aria-label="task-list" className="grid-container mt-4">
        {updatedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};
