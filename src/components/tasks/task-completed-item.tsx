import { FC } from 'react';

import { Card } from 'components/ui';
import { useAppDispatch } from 'app/hooks';

import { Task } from 'features/types';
import { deleteTasks } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

import { addTimer } from 'helpers/timeout';
import { DisplayTaskTime } from './task-item/display-time';

export const CompletedTaskItem: FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(task.id));
    addTimer(() => dispatch(setTaskActionType('')), 1);
  };

  return (
    <Card className={`ring-1 ring-color-valid`}>
      <li className="flex w-full flex-col gap-8 p-4 text-color-base md:text-3xl">
        <h2 className="text-3xl tracking-wide">{task.title}</h2>
        <DisplayTaskTime label="created" time={task.createdAt} />
        <div className="text-2xl">{task.details}</div>
        <button
          onClick={deleteTaskHandler}
          className="mt-4 cursor-pointer self-center rounded-md px-6 py-2 text-2xl active:bg-btn-color-base max-xs:bg-red-600 xs:ring-1 xs:ring-color-base  xs:hover:bg-red-600">
          Delete
        </button>
      </li>
    </Card>
  );
};
