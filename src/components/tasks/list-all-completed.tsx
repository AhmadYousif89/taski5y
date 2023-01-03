import { useAppSelector } from 'app/hooks';
import { useSearchParams } from 'hooks';
import { searchTasks, sortTasks } from './helpers';
import { taskSelector } from 'features/slices/task';
import { ActionModal, Backdrop } from 'components/ui';
import { CompletedTaskItem } from './task-completed-item';
import { SearchErrMsg } from './search-error-msg';
import { SearchMsg } from './search-msg';
import { NoTasksMsg } from './no-tasks-msg';

export const CompletedTaskList = () => {
  const { actionType, completedTasks, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { sort, type } = useSearchParams();

  let filteredTasks = searchTasks(completedTasks, query);
  const sortedData = sortTasks(filteredTasks, { sort, type });
  filteredTasks = sortedData;

  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" msg="Deleting ..." />
        <Backdrop />
      </>
    );
  }

  let content = (
    <ul className="grid-container">
      {filteredTasks.map(task => (
        <CompletedTaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
  if (filteredTasks.length === 0)
    content = <NoTasksMsg msg={`You have ${filteredTasks.length} completed task`} />;

  if (query && filteredTasks.length === 0) content = <SearchErrMsg />;

  const searchMsg = query && filteredTasks.length > 0 ? <SearchMsg tasks={filteredTasks} /> : null;

  return (
    <section className="mt-8 flex flex-col gap-8">
      {searchMsg}
      {content}
    </section>
  );
};
