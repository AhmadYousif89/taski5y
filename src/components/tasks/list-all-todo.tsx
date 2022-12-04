import { Modal } from '@ui/modal';
import { TaskItem } from './task-item/task-item';
import { useAppSelector } from '@app/hooks';
import { sortTasks, searchTasks } from './helpers';
import { taskSelector } from '@features/slices/task';

export const TodoTaskList = () => {
  const { status, tasks, searchedTaskQuery: query } = useAppSelector(taskSelector);

  const todoTasks = tasks.filter(task => task.status === 'Todo');

  let filteredTodoTasks = searchTasks(todoTasks, query);
  filteredTodoTasks = sortTasks(filteredTodoTasks);

  if (status === 'loading') return <Modal />;

  let content = (
    <ul
      className="
        mx-4 grid grid-cols-[repeat(auto-fit,minmax(32rem,.65fr))] justify-center gap-8 py-12">
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
