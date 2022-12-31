import { searchTasks, sortTasks } from './helpers';
import { useSortParams } from 'hooks/use-sort-params';
import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { ActionModal, Backdrop } from 'components/ui';
import { CompletedTaskItem } from './task-completed-item';

export const CompletedTaskList = () => {
  const { actionType, completedTasks, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { order, type } = useSortParams();

  let filteredCompletedTasks = searchTasks(completedTasks, query);
  const sortedData = sortTasks(filteredCompletedTasks, { order, type });
  filteredCompletedTasks = sortedData;

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
      {filteredCompletedTasks.map(task => (
        <CompletedTaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
  if (filteredCompletedTasks.length === 0) {
    content = (
      <h2 className="mt-8 text-center text-3xl text-color-base">
        You have {filteredCompletedTasks.length} completed task
      </h2>
    );
  }
  if (query && filteredCompletedTasks.length === 0) {
    content = (
      <h3 className="mt-8 text-center text-3xl text-color-base">
        your search didn't match any results
      </h3>
    );
  }

  const searchMsg =
    query && filteredCompletedTasks.length > 0 ? (
      <h3 className="ml-8 text-3xl text-color-base">Search result</h3>
    ) : null;

  return (
    <section className="mt-8 flex flex-col">
      <>
        {searchMsg}
        {content}
      </>
    </section>
  );
};
