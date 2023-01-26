import { useAppSelector } from 'app/hooks';
import { useSearchParams } from 'hooks';
import { searchTasks, sortTasks } from './helpers';
import { taskSelector } from 'features/slices/task';
import { ActionModal, Backdrop } from 'components/ui';
import { CompletedTaskItem } from './task-completed-item';
import { SearchErrMsg } from './search-error-msg';
import { NoTaskMsg } from './no-task-msg';
import { SearchMsg } from './search-msg';

export const CompletedTaskList = () => {
  const { actionType, completedTasks } = useAppSelector(taskSelector);
  const { sort, type, query } = useSearchParams();

  let filteredTasks = searchTasks(completedTasks, query);
  const sortedData = sortTasks(filteredTasks, { sort, type });
  filteredTasks = sortedData;

  let content = (
    <ul className="grid-container">
      {filteredTasks.map(task => (
        <CompletedTaskItem key={task.id} task={task} />
      ))}
    </ul>
  );

  const searchMsg = query && filteredTasks.length > 0 ? <SearchMsg tasks={filteredTasks} /> : null;

  if (query && filteredTasks.length === 0) content = <SearchErrMsg />;

  if (filteredTasks.length === 0)
    content = (
      <NoTaskMsg className="mt-8" msg={`You have ${filteredTasks.length} completed task`} />
    );

  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" message="deleting" />
        <Backdrop />
      </>
    );
  }

  return (
    <section className="mt-8 flex flex-col gap-8">
      {searchMsg}
      {content}
    </section>
  );
};
