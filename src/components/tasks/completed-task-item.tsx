import { Card } from '@ui/card';
import { useAppDispatch } from '@app/hooks';
import { Task } from '@features/types';
import { TaskTime } from './task-time';
import { deleteTasks } from '@features/services/tasks';

export const CompletedTaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();

  return (
    <Card className={`ring-1 ring-color-valid`}>
      <li className="flex w-full flex-col gap-4 p-4 text-color-base md:text-3xl">
        <h2 className="text-3xl tracking-wide">{task.title}</h2>
        <div className="flex items-center gap-2 rounded-full bg-color-base px-4 py-2 text-xl tracking-wide text-color-base ring ring-color-base ring-opacity-75">
          <span>created</span>
          <TaskTime time={task.createdAt} />
        </div>
        <div className="text-xl">{task.details}</div>
        <button
          onClick={() => dispatch(deleteTasks(task.id))}
          className="mt-4 cursor-pointer self-center rounded-md px-6 py-2 text-2xl ring-color-base hover:ring-2 active:bg-btn-color-base">
          Delete
        </button>
      </li>
    </Card>
  );
};
