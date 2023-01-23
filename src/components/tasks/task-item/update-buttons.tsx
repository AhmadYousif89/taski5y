import { FC, useState } from 'react';

import { useTaskItem } from './context';
import { useAppDispatch } from 'app/hooks';
import { updateTask } from 'features/services/tasks';
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

  const markTaskCompleted = async () => {
    if (isEditing && !modal) {
      setModal(true);
      return;
    }
    setTaskIsUpdating(true);
    setTaskUpdateBtn(true);
    try {
      dispatch(setTaskActionType('updating'));
      const result = await dispatch(updateTask({ id: taskId, status: 'Completed' })).unwrap();
      if (result) dispatch(setTaskActionType('update_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const updateTaskDetailHandler = async () => {
    setTaskUpdateBtn(true);
    setTaskIsUpdating(true);
    setTaskIsEditing(false);
    try {
      dispatch(setTaskActionType('updating'));
      const result = await dispatch(updateTask({ id: taskId, details: updatedDetails })).unwrap();
      if (result) dispatch(setTaskActionType('update_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
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
            {isUpdating ? <SpinnerIcon className="h-7 w-7" /> : 'save'}
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
