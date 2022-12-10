import { useAppSelector } from '@app/hooks';
import { sortTasks, searchTasks } from './helpers';
import { taskSelector } from '@features/slices/task';
import { CompletedTaskItem } from './task-completed-item';
import { ActionModal } from '@ui/action-modal';
import { Backdrop } from '@ui/backdrop';

export const CompletedTaskList = () => {
  const {
    actionType,
    completedTasks,
    searchedTaskQuery: query,
  } = useAppSelector(taskSelector);

  let filteredCompletedTasks = searchTasks(completedTasks, query);

  filteredCompletedTasks = sortTasks(filteredCompletedTasks);

  if (actionType === 'deleting') {
    return (
      <>
        <ActionModal actionType="transition" msg="Deleting ..." />
        <Backdrop />
      </>
    );
  }

  let content = (
    <ul
      className="
        mx-4 grid grid-cols-[repeat(auto-fit,minmax(32rem,.65fr))] justify-center gap-8 py-12">
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
