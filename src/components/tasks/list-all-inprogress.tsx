import { useSearchParams } from 'hooks';

import { TaskItem } from './task-item';
import { SearchMsg } from './search-msg';
import { NoTaskMsg } from './no-task-msg';
import { SearchErrMsg } from './search-error-msg';
import { searchTasks, sortTasks } from './helpers';
import { useFetchTasks } from './hooks/use-fetch-tasks';

export const InProgressTaskList = () => {
  const tasks = useFetchTasks();
  const { sort, type, query } = useSearchParams();

  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');

  let filteredTasks = searchTasks(inProgressTasks, query);
  const sortedData = sortTasks(filteredTasks, { sort, type });
  filteredTasks = sortedData;

  let content = (
    <ul className="grid-container">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );

  const searchMsg = query && filteredTasks.length > 0 ? <SearchMsg tasks={filteredTasks} /> : null;

  if (query && filteredTasks.length === 0) content = <SearchErrMsg />;

  if (filteredTasks.length === 0)
    content = (
      <NoTaskMsg className="mt-8" msg={`You have ${filteredTasks.length} in progress task`} />
    );

  return (
    <section className="mt-8 flex flex-col gap-8">
      <>
        {searchMsg}
        {content}
      </>
    </section>
  );
};
