import { useAppSelector } from '@app/hooks';
import { taskSelector } from '@features/slices/task';
import { CompletedTaskItem } from './completed-task-item';

export const CompletedTaskList = () => {
  const { completedTasks, searchedTaskQuery: query } = useAppSelector(taskSelector);

  const filteredCompletedTasks = completedTasks.filter(
    task =>
      task.title.toLowerCase().includes(query) ||
      task.details.toLowerCase().includes(query),
  );

  const content =
    completedTasks.length === 0 ? (
      <h2 className="mt-16 text-center text-4xl text-color-base">
        You have {completedTasks.length} completed task
      </h2>
    ) : (
      <ul
        className="
        mx-4 grid grid-cols-[repeat(auto-fit,minmax(30rem,.65fr))] justify-center gap-8 py-12">
        {filteredCompletedTasks.map(task => (
          <CompletedTaskItem key={task.id} task={task} />
        ))}
      </ul>
    );

  return <section className="mt-8 flex flex-col">{content}</section>;
};
