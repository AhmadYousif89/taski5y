import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

import { TaskItem } from './task-item';
import { useSearchParams } from 'hooks';
import { searchTasks, sortTasks } from './helpers';
import { SearchErrMsg } from './search-error-msg';
import { NoTasksMsg } from './no-tasks-msg';
import { SearchMsg } from './search-msg';

export const TodoTaskList = () => {
  const { tasks, searchedTaskQuery: query } = useAppSelector(taskSelector);
  const { sort, type } = useSearchParams();

  const todoTasks = tasks.filter(task => task.status === 'Todo');
  let filteredTasks = searchTasks(todoTasks, query);
  const sortedData = sortTasks(filteredTasks, { sort, type });
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
