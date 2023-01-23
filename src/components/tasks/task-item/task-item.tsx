import { FC, useEffect, useState } from 'react';

import { Card } from 'components/ui';
import { Task } from 'features/types';
import { TaskProvider } from './context';

import { TaskInfo } from './task-info';
import { TaskDeleteButton } from './delete-button';
import { SwitchTaskStatus } from './switch-status';
import { DetailsSection } from './details-section';
import { TaskUpdateButtons } from './update-buttons';
import { DisplayTaskTime } from './display-time';

export const TaskItem: FC<{ task: Task }> = ({ task }) => {
  const [animate, setAnimate] = useState(false);

  const styles = task.status === 'InProgress' ? 'ring-1 ring-color-validating' : '';
  const transition = animate
    ? 'translate-y-0 opacity-100 visible'
    : 'translate-y-10 opacity-0 invisible';

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <TaskProvider>
      <Card
        priority={task.priority}
        className={`relative ${styles} ${transition} h-fit transition-transform duration-500`}>
        <li className="flex -translate-y-0 flex-col gap-6 py-6 px-2 text-color-base md:text-3xl">
          <header className="relative flex items-center justify-between">
            <h2 className="text-3xl tracking-wide">{task.title}</h2>
            <TaskInfo task={task} />
          </header>

          <DetailsSection isExpired={task.isExpired} taskDetails={task.details} />

          <footer className="mt-12 flex justify-between gap-4">
            <div className="relative w-full">
              {!task.isExpired && <SwitchTaskStatus taskId={task.id} taskStatus={task.status} />}
              {task.expireDate && (
                <div className="absolute bottom-0 w-max">
                  <DisplayTaskTime task={task} />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between gap-4">
              {!task.isExpired && <TaskUpdateButtons taskId={task.id} />}
              <TaskDeleteButton taskId={task.id} />
            </div>
          </footer>
        </li>
      </Card>
    </TaskProvider>
  );
};
