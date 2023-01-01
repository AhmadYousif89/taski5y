import { FC } from 'react';

import { Button, Card } from 'components/ui';
import { useAppDispatch } from 'app/hooks';

import { Task } from 'features/types';
import { deleteTasks } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

import { wait } from 'helpers/wait';
import { DisplayTaskTime } from './task-item/display-time';
import { TrashIcon } from 'assets/icons';

export const CompletedTaskItem: FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(task.id));
    wait(() => dispatch(setTaskActionType('')), 1);
  };

  return (
    <Card className={`ring-1 ring-color-valid`}>
      <li className="flex w-full flex-col gap-8 p-4 text-color-base md:text-3xl">
        <h2 className="text-3xl tracking-wide">{task.title}</h2>
        <DisplayTaskTime label="created" time={task.createdAt} />
        <div className="text-2xl">{task.details}</div>
        <Button
          title="delete task"
          onClick={deleteTaskHandler}
          className="self-center ring-2 ring-color-base">
          <TrashIcon />
        </Button>
      </li>
    </Card>
  );
};
