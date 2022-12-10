import { useEffect, useState } from 'react';
import { taskSelector } from '@features/slices/task';
import { useAppSelector } from '@app/hooks';
import { Task } from '@features/types';

import { Card } from '@ui/card';
import { TaskDeleteButton } from './delete-button';
import { TaskUpdateButtons } from './update-buttons';
import { DisplayTaskTime } from './display-time';
import { DetailsSection } from './details-section';
import { SwitchTaskStatus } from '@tasks/task-switcher';

export const TaskItem = ({ task }: { task: Task }) => {
  const { status } = useAppSelector(taskSelector);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState('');
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  useEffect(() => {
    if (status === 'fulfilled') {
      setIsUpdating(false);
      setShowUpdateBtn(false);
    }
  }, [status]);

  const taskWasUpdated = task.createdAt !== task.updatedAt;
  const styles = task.status === 'InProgress' ? 'ring-1 ring-color-validating' : '';

  return (
    <Card priority={task.priority} className={`relative ${styles}`}>
      <li className="flex flex-col gap-6 py-6 px-4 text-color-base md:text-3xl">
        <TaskDeleteButton taskId={task.id} />

        <header className="space-y-4 self-start">
          <h2 className="text-3xl tracking-wide">{task.title}</h2>
          <DisplayTaskTime label="created" time={task.createdAt} />
        </header>

        <DetailsSection
          taskDetails={task.details}
          setIsEditing={setIsEditing}
          setShowUpdateBtn={setShowUpdateBtn}
          setUpdatedDetails={setUpdatedDetails}
          isUpdating={isUpdating}
          isEditing={isEditing}
        />

        <footer className="mt-6 flex items-end justify-between gap-4">
          <SwitchTaskStatus
            taskId={task.id}
            taskStatus={task.status}
            onSwitch={() => {
              setIsUpdating(true);
              setShowUpdateBtn(true);
            }}
          />
          <TaskUpdateButtons
            taskId={task.id}
            isEditing={isEditing}
            isUpdating={isUpdating}
            updatedDetails={updatedDetails}
            showUpdateBtn={showUpdateBtn}
            setIsEditing={setIsEditing}
            setIsUpdating={setIsUpdating}
            setShowUpdateBtn={setShowUpdateBtn}
          />
        </footer>
        {taskWasUpdated ? (
          <DisplayTaskTime label="updated" time={task.updatedAt} />
        ) : null}
      </li>
    </Card>
  );
};
