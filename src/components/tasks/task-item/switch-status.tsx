import { FC } from 'react';

import { useTaskItem } from './context';
import { useAppDispatch } from 'app/hooks';
import { TaskStatus } from 'features/types';
import { updateTask } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

type SwitcherProps = { taskId: string; taskStatus: TaskStatus };

export const SwitchTaskStatus: FC<SwitcherProps> = ({ taskId, taskStatus }) => {
  const dispatch = useAppDispatch();
  const { setTaskIsUpdating, setTaskUpdateBtn } = useTaskItem();

  const updateTaskStatus = async () => {
    setTaskUpdateBtn(true);
    setTaskIsUpdating(true);
    try {
      dispatch(setTaskActionType('updating'));
      const result = await dispatch(
        updateTask({ id: taskId, status: taskStatus === 'Todo' ? 'InProgress' : 'Todo' })
      ).unwrap();
      if (result) dispatch(setTaskActionType('update_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const switchColor = taskStatus === 'InProgress' ? 'bg-amber-400' : 'bg-neutral-500';
  const transition =
    taskStatus === 'InProgress'
      ? 'translate-x-full bg-amber-600'
      : 'translate-x-0 bg-btn-color-base';

  return (
    <div aria-label="task switcher" className="flex items-center gap-4">
      <button
        onKeyDown={e => {
          if (e.key === 'Enter') updateTaskStatus();
        }}
        className="flex cursor-default items-center">
        <div
          onClick={updateTaskStatus}
          className={`${switchColor} flex h-3 w-12 cursor-pointer items-center rounded-full transition-colors duration-200`}>
          <div className={`${transition} h-6 w-6 rounded-full transition-all duration-200`} />
        </div>
      </button>
      <span className="text-xl capitalize">in progress</span>
    </div>
  );
};
