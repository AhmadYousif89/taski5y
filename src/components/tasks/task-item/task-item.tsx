import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setTaskActionType, taskSelector } from '@features/slices/task';
import { deleteTasks, updateTask } from '@features/services/tasks';
import { Task } from '@features/types';

import { Card } from '@ui/card';
import { ActionModal } from '@ui/action-modal';
import { DeleteButton } from './delete-button';
import { DisplayTaskTime } from './display-time';
import { DetailsSection } from './details-section';
import { ActionButtons } from './action-buttons';
import { SwitchTaskStatus } from '@tasks/task-switcher';

export const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(taskSelector);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState('');
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  const markTaskCompleted = () => {
    setIsUpdating(true);
    setShowUpdateBtn(true);
    dispatch(setTaskActionType('updating'));
    dispatch(updateTask({ id: task.id, status: 'Completed' }));
  };

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(task.id));
  };

  const updateTaskDetailHandler = () => {
    setIsEditing(false);
    setIsUpdating(true);
    dispatch(setTaskActionType('updating'));
    dispatch(updateTask({ id: task.id, details: updatedDetails }));
  };

  const onInputHandler = () => setIsEditing(true);

  const onBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    if (task.details === e.target.textContent) {
      setShowUpdateBtn(false);
      setIsEditing(false);
      return;
    }
    setShowUpdateBtn(true);
    setUpdatedDetails(e.target.textContent as string);
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      setIsUpdating(false);
      setShowUpdateBtn(false);
    }
  }, [status]);

  const taskWasUpdated = task.createdAt !== task.updatedAt;
  const styles = task.status === 'InProgress' ? 'ring-1 ring-color-validating' : '';

  return (
    <>
      {isDeleting ? (
        <ActionModal
          msg="You are about to delete this task, Are you sure?"
          confirmAction={() => deleteTaskHandler()}
          closeModal={() => setIsDeleting(false)}
        />
      ) : null}
      <Card priority={task.priority} className={`relative ${styles}`}>
        <li className="flex flex-col gap-6 py-6 px-4 text-color-base md:text-3xl">
          <DeleteButton onDelete={() => setIsDeleting(true)} />

          <header className="space-y-4">
            <h2 className="text-3xl tracking-wide">{task.title}</h2>
            <DisplayTaskTime label="created" time={task.createdAt} />
          </header>

          <DetailsSection
            taskDetails={task.details}
            onInput={onInputHandler}
            onBlur={onBlurHandler}
            isUpdating={isUpdating}
            isEditing={isEditing}
          />

          <footer className="mt-4 flex items-end justify-between gap-4">
            <SwitchTaskStatus
              taskId={task.id}
              taskStatus={task.status}
              onSwitch={() => {
                setIsUpdating(true);
                setShowUpdateBtn(true);
              }}
            />
            <ActionButtons
              isUpdating={isUpdating}
              showUpdateBtn={showUpdateBtn}
              onTaskComplete={markTaskCompleted}
              onUpdateTask={updateTaskDetailHandler}
            />
          </footer>
          {taskWasUpdated ? (
            <DisplayTaskTime label="updated" time={task.updatedAt} />
          ) : null}
        </li>
      </Card>
    </>
  );
};
