import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

import { TaskItem } from './task-item';
import { sortTasks, searchTasks } from './helpers';

export const TodoTaskList = () => {
  const { tasks, searchedTaskQuery: query } = useAppSelector(taskSelector);

  const todoTasks = tasks.filter(task => task.status === 'Todo');

  let filteredTodoTasks = searchTasks(todoTasks, query);
  filteredTodoTasks = sortTasks(filteredTodoTasks);

  let content = (
    <ul className="grid-container">
      {filteredTodoTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );

  if (filteredTodoTasks.length === 0)
    content = (
      <h2 className="mt-8 text-center text-3xl text-color-base">
        You have {filteredTodoTasks.length} in todo task
      </h2>
    );
  if (query && filteredTodoTasks.length === 0)
    content = (
      <h3 className="mt-8 text-center text-3xl text-color-base">
        your search didn't match any results
      </h3>
    );

  const searchMsg =
    query && filteredTodoTasks.length > 0 ? (
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
