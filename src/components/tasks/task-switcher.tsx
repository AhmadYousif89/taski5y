import { useAppDispatch } from '@app/hooks';
import { updateTask } from '@features/services/tasks';
import { TaskStatus } from '@features/types';

export const Switcher = ({
  taskId,
  taskStatus,
}: {
  taskId: string;
  taskStatus: TaskStatus;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        dispatch(
          updateTask({
            id: taskId,
            status: taskStatus === 'Todo' ? 'InProgress' : 'Todo',
          }),
        )
      }>
      <div
        className={`${
          taskStatus === 'InProgress' ? 'bg-amber-400' : 'bg-zinc-400'
        } p2 flex h-4 w-12 items-center rounded-full transition-all duration-200`}>
        <div
          className={`${
            taskStatus === 'InProgress'
              ? 'translate-x-full bg-amber-600'
              : 'translate-x-0 bg-white'
          } h-6 w-6 rounded-full shadow-sm transition-all duration-200`}></div>
      </div>
    </div>
  );
};
