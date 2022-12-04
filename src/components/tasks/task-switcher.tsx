import { useAppDispatch } from '@app/hooks';
import { TaskStatus } from '@features/types';
import { updateTask } from '@features/services/tasks';
import { setTaskActionType } from '@features/slices/task';

type Props = { taskId: string; taskStatus: TaskStatus; onSwitch: () => void };

export const SwitchTaskStatus = ({ taskId, taskStatus, onSwitch }: Props) => {
  const dispatch = useAppDispatch();

  const updateTaskStatus = () => {
    dispatch(setTaskActionType('updating'));
    dispatch(
      updateTask({ id: taskId, status: taskStatus === 'Todo' ? 'InProgress' : 'Todo' }),
    );
    onSwitch();
  };

  const switchBgColor = taskStatus === 'InProgress' ? 'bg-amber-400' : 'bg-zinc-400';
  const switchAnimation =
    taskStatus === 'InProgress'
      ? 'translate-x-full bg-amber-600'
      : 'translate-x-0 bg-white';

  return (
    <div className="flex items-center gap-4">
      <div className="cursor-pointer" onClick={updateTaskStatus}>
        <div
          className={`${switchBgColor} p2 flex h-4 w-12 items-center rounded-full transition-all duration-200`}>
          <div
            className={`${switchAnimation} h-6 w-6 rounded-full shadow-sm transition-all duration-200`}></div>
        </div>
      </div>
      <span className="text-xl capitalize">in progress</span>
    </div>
  );
};
