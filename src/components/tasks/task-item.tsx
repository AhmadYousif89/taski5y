import { ChangeEvent, useState } from 'react';

import { Card } from '@ui/card';
import { TaskButton } from './task-button';
import { useAppDispatch } from '@app/hooks';
import { Switcher } from '@tasks/task-switcher';
import { TrashIcon, SpinnerIcon } from 'assets/icons';
import { Task } from '@features/types';
import { TaskTime } from './task-time';
import { deleteTasks, updateTask } from '@features/services/tasks';

export const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const [updatedDetails, setUpdatedDetails] = useState('');
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const markTaskCompleteHandler = () => {
    dispatch(updateTask({ id: task.id, status: 'Completed' }));
  };
  const deleteTaskHandler = () => {
    const confirmation = window.confirm(
      'You are about to delete this task, Are you sure?',
    );
    if (!confirmation) return;
    dispatch(deleteTasks(task.id));
  };

  const updateTaskDetailHandler = () => {
    setIsEditing(false);
    dispatch(
      updateTask({
        id: task.id,
        details: updatedDetails,
      }),
    );
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowUpdateBtn(false);
    }, 1000);
  };

  const onBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    if (task.details === e.target.textContent) {
      setShowUpdateBtn(false);
      setIsEditing(false);
      return;
    }
    setShowUpdateBtn(true);
    setUpdatedDetails(e.target.textContent as string);
  };
  const onInputHandler = () => setIsEditing(true);

  const isTimeDifferent = task.createdAt !== task.updatedAt;

  return (
    <Card
      priority={task.priority}
      className={`relative ${
        task.status === 'InProgress' ? 'ring-1 ring-color-validating' : ''
      }`}>
      <li className="flex flex-col gap-6 py-6 px-4 text-color-base md:text-3xl">
        <button
          title="delete task"
          className="absolute top-10 right-8 cursor-pointer"
          onClick={deleteTaskHandler}>
          <TrashIcon className="transition-colors hover:fill-rose-600" />
        </button>
        <header>
          <h2 className="text-3xl tracking-wide">{task.title}</h2>
        </header>
        <div className="flex items-center gap-2 place-self-start rounded-full bg-color-base px-4 py-2 text-xl tracking-wide text-color-base ring ring-color-base ring-opacity-75">
          <span>created</span>
          <TaskTime time={task.createdAt} />
        </div>
        <section className="relative">
          <div
            className="relative break-words rounded-md p-4 text-2xl ring-1 ring-color-base"
            contentEditable
            suppressContentEditableWarning
            onInput={onInputHandler}
            onBlur={onBlurHandler}>
            {task.details}
          </div>
          {isUpdating ? (
            <p className={`text-green absolute left-0 -bottom-10 text-xl`}>
              updating . . .
            </p>
          ) : null}
          {isEditing ? (
            <p className="text-amber absolute left-0 -bottom-10 text-xl tracking-wide">
              edited . . .
            </p>
          ) : null}
        </section>
        <footer className="mt-4 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Switcher taskId={task.id} taskStatus={task.status} />
              <span className="text-xl capitalize">in progress</span>
            </div>
          </div>
          <div aria-label="action-buttons" className="flex items-center gap-4">
            {showUpdateBtn ? (
              <TaskButton onClick={updateTaskDetailHandler}>
                {isUpdating ? <SpinnerIcon /> : 'save'}
              </TaskButton>
            ) : null}
            <TaskButton onClick={markTaskCompleteHandler} title={'mark complete'} />
          </div>
        </footer>
        {isTimeDifferent ? (
          <div className="flex items-center gap-2 place-self-start rounded-full bg-color-base px-4 py-2 text-xl tracking-wide text-color-base ring ring-color-base ring-opacity-75">
            <span>updated</span> <TaskTime time={task.updatedAt} />
          </div>
        ) : null}
      </li>
    </Card>
  );
};
