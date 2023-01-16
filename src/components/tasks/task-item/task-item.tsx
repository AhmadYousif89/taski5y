import { FC } from 'react';

import { Card } from 'components/ui';
import { Task } from 'features/types';
import { TaskProvider } from './context';

import { TaskDeleteButton } from './delete-button';
import { SwitchTaskStatus } from './switch-status';
import { TaskUpdateButtons } from './update-buttons';
import { DisplayTaskTime } from './display-time';
import { DetailsSection } from './details-section';

export const TaskItem: FC<{ task: Task }> = ({ task }) => {
  const wasUpdated = task.createdAt !== task.updatedAt;
  const styles = task.status === 'InProgress' ? 'ring-1 ring-color-validating' : '';

  return (
    <TaskProvider>
      <Card priority={task.priority} className={`relative ${styles}`}>
        <li className="flex flex-col gap-6 py-6 px-4 text-color-base md:text-3xl">
          <TaskDeleteButton taskId={task.id} />

          <header className="space-y-4 self-start">
            <h2 className="text-3xl tracking-wide">{task.title}</h2>
            <DisplayTaskTime label="created" time={task.createdAt} />
          </header>

          <DetailsSection taskDetails={task.details} />

          <footer className="mt-6 flex items-end justify-between gap-4">
            <SwitchTaskStatus taskId={task.id} taskStatus={task.status} />
            <TaskUpdateButtons taskId={task.id} />
          </footer>

          {wasUpdated ? <DisplayTaskTime label="updated" time={task.updatedAt} /> : null}
        </li>
      </Card>
    </TaskProvider>
  );
};
