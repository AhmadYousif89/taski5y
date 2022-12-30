import { FC } from 'react';

import { useAppDispatch } from 'app/hooks';
import { TaskStatus } from 'features/types';
import { updateTask } from 'features/services/tasks';

type SwitcherProps = { taskId: string; taskStatus: TaskStatus; onSwitch: () => void };

export const SwitchTaskStatus: FC<SwitcherProps> = ({ taskId, taskStatus, onSwitch }) => {
  const dispatch = useAppDispatch();

  const updateTaskStatus = () => {
    dispatch(updateTask({ id: taskId, status: taskStatus === 'Todo' ? 'InProgress' : 'Todo' }));
    onSwitch();
  };

  const switchBgColor = taskStatus === 'InProgress' ? 'bg-amber-400' : 'bg-neutral-500';
  const switchAnimation =
    taskStatus === 'InProgress'
      ? 'translate-x-full bg-amber-600'
      : 'translate-x-0 bg-btn-color-base';

  return (
    <div className="flex items-center gap-4">
      <button className="flex cursor-default items-center">
        <div
          onKeyDown={e => (e.key === 'Enter' ? updateTaskStatus() : null)}
          onClick={updateTaskStatus}
          className={`${switchBgColor} flex h-4 w-14 cursor-pointer items-center rounded-full transition-colors duration-200`}>
          <div className={`${switchAnimation} h-7 w-7 rounded-full transition-all duration-200`} />
        </div>
      </button>
      <span className="text-xl capitalize">in progress</span>
    </div>
  );
};
