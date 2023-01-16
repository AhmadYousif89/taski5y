import { FC, useState } from 'react';

import { useTaskItem } from './context';
import { useAppDispatch } from 'app/hooks';
import { updateTask } from 'features/services/tasks';
import { toggleNotification } from 'features/slices/ui';
import { setTaskActionType } from 'features/slices/task';

import { InfoIcon, SpinnerIcon } from 'assets/icons';
import { ActionModal, Backdrop, Button } from 'components/ui';

export const TaskUpdateButtons: FC<{ taskId: string }> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const {
    state: { isEditing, isUpdating, updatedDetails, showUpdateBtn },
    setTaskIsUpdating,
    setTaskUpdateBtn,
    setTaskIsEditing
  } = useTaskItem();

  const markTaskCompleted = () => {
    if (isEditing && !modal) {
      setModal(true);
      return;
    }
    setTaskIsUpdating(true);
    setTaskUpdateBtn(true);
    dispatch(toggleNotification(true));
    dispatch(setTaskActionType('updating'));
    dispatch(updateTask({ id: taskId, status: 'Completed' }));
  };

  const updateTaskDetailHandler = () => {
    setTaskUpdateBtn(true);
    setTaskIsEditing(false);
    setTaskIsUpdating(true);
    dispatch(toggleNotification(true));
    dispatch(setTaskActionType('updating'));
    dispatch(updateTask({ id: taskId, details: updatedDetails }));
  };

  return (
    <>
      {modal ? (
        <>
          <ActionModal
            icon={<InfoIcon />}
            confirmAction={markTaskCompleted}
            closeModal={() => setModal(false)}
            msg="You have unsaved changes, Task will be marked as completed ?"
          />
          <Backdrop onClick={() => setModal(false)} />
        </>
      ) : null}
      <div aria-label="task-update-buttons" className="flex items-center gap-4">
        {showUpdateBtn || isEditing ? (
          <Button
            className="bg-btn-color-base px-4 text-xl !ring-0 hover:bg-btn-color-highlight hover:ring-0"
            onClick={updateTaskDetailHandler}>
            {isUpdating ? <SpinnerIcon className="h-8 w-8" /> : 'save'}
          </Button>
        ) : null}
        <Button
          label={'complete'}
          onClick={markTaskCompleted}
          className="bg-btn-color-base px-4 text-xl !ring-0 hover:bg-btn-color-highlight hover:ring-0"
        />
      </div>
    </>
  );
};
