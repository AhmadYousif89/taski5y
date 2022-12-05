import { Card } from '@ui/card';
import { Task } from '@features/types';
import { useAppDispatch } from '@app/hooks';
import { deleteTasks } from '@features/services/tasks';
import { DisplayTaskTime } from './task-item/display-time';
import { setTaskActionType } from '@features/slices/task';

export const CompletedTaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(task.id));
  };

  return (
    <Card className={`ring-1 ring-color-valid`}>
      <li className="flex w-full flex-col gap-8 p-4 text-color-base md:text-3xl">
        <h2 className="text-3xl tracking-wide">{task.title}</h2>
        <DisplayTaskTime label="created" time={task.createdAt} />
        <div className="text-2xl">{task.details}</div>
        <button
          onClick={deleteTaskHandler}
          className="mt-4 cursor-pointer self-center rounded-md px-6 py-2 text-2xl ring-color-base hover:ring-2 active:bg-btn-color-base">
          Delete
        </button>
      </li>
    </Card>
  );
};