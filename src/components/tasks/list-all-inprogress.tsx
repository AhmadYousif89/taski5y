import { TaskItem } from './task-item/task-item';
import { useAppSelector } from '@app/hooks';
import { sortTasks, searchTasks } from './helpers';
import { taskSelector } from '@features/slices/task';

export const InProgressTaskList = () => {
  const { tasks, searchedTaskQuery: query } = useAppSelector(taskSelector);

  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');

  let filteredInProgressTasks = searchTasks(inProgressTasks, query);

  filteredInProgressTasks = sortTasks(filteredInProgressTasks);

  let content = (
    <ul
      className="
        mx-4 grid grid-cols-[repeat(auto-fit,minmax(32rem,.65fr))] justify-center gap-8 py-12">
      {filteredInProgressTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
  if (filteredInProgressTasks.length === 0)
    content = (
      <h2 className="mt-8 text-center text-3xl text-color-base">
        You have {filteredInProgressTasks.length} in progress task
      </h2>
    );
  if (query && filteredInProgressTasks.length === 0)
    content = (
      <h3 className="mt-8 text-center text-3xl text-color-base">
        your search didn't match any results
      </h3>
    );

  const searchMsg =
    query && filteredInProgressTasks.length > 0 ? (
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
