import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

import { TaskItem } from './task-item';
import { searchTasks, sortTasks } from './helpers';
import { useSortParams } from 'hooks/use-sort-params';
import { SearchErrMsg } from './search-error-msg';
import { SearchMsg } from './search-msg';
import { NoTasksMsg } from './no-tasks-msg';

export const InProgressTaskList = () => {
  const { tasks, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { order, type } = useSortParams();

  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');

  let filteredTasks = searchTasks(inProgressTasks, query);
  const sortedData = sortTasks(filteredTasks, { order, type });
  filteredTasks = sortedData;

  let content = (
    <ul className="grid-container">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );

  if (filteredTasks.length === 0)
    content = <NoTasksMsg msg={`You have ${filteredTasks.length} in progress task`} />;

  if (query && filteredTasks.length === 0) content = <SearchErrMsg />;

  const searchMsg = query && filteredTasks.length > 0 ? <SearchMsg tasks={filteredTasks} /> : null;

  return (
    <section className="mt-8 flex flex-col gap-8">
      <>
        {searchMsg}
        {content}
      </>
    </section>
  );
};
