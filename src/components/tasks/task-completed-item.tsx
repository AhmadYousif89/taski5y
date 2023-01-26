import { FC, useEffect, useState } from 'react';

import { TaskInfo } from './task-item';
import { useAppDispatch } from 'app/hooks';
import { Button, Card } from 'components/ui';

import { Task } from 'features/types';
import { deleteTasks } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

export const CompletedTaskItem: FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [animate, setAnimate] = useState(false);

  const deleteTaskHandler = async () => {
    try {
      dispatch(setTaskActionType('deleting'));
      const result = await dispatch(deleteTasks(task.id)).unwrap();
      if (result) dispatch(setTaskActionType('delete_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const transition = animate
    ? 'translate-y-0 opacity-100 visible'
    : 'translate-y-10 opacity-0 invisible';

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <Card className={`${transition} ring-1 ring-color-valid transition-transform duration-700`}>
      <li className="flex w-full flex-col gap-8 p-4 text-color-base md:text-3xl">
        <div className="relative my-4 flex items-center justify-between">
          <h2 className="h2">{task.title}</h2>
          <TaskInfo task={task} />
        </div>

        <div className="rounded-lg p-4 text-2xl ring-1 ring-color-base">{task.details}</div>
        <Button
          title="delete task"
          onClick={deleteTaskHandler}
          className="my-4 self-center bg-slate-500 text-neutral-200 hover:bg-red-600 hover:!ring-0">
          delete
        </Button>
      </li>
    </Card>
  );
};
