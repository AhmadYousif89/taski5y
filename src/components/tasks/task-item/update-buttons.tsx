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
    state: { updatedDetails, isError, isEditing, isUpdating, showUpdateBtn },
    setTaskIsUpdating,
    setTaskUpdateBtn,
    setTaskIsEditing,
    setTaskHasError
  } = useTaskItem();

  const onUpdate = () => {
    dispatch(setTaskActionType('updating'));
    setTaskHasError(false);
    setTaskIsEditing(false);
    setTaskUpdateBtn(true);
    setTaskIsUpdating(true);
  };

  const markTaskCompleted = async () => {
    if ((isEditing || isError) && !modal) {
      setModal(true);
      return;
    }
    try {
      onUpdate();
      const result = await dispatch(updateTask({ id: taskId, status: 'Completed' })).unwrap();
      if (result) dispatch(setTaskActionType('update_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const updateTaskDetailHandler = async () => {
    if (updatedDetails.trim().length === 0) {
      setTaskHasError(true);
      setTaskIsEditing(false);
      return;
    }
    try {
      onUpdate();
      const result = await dispatch(updateTask({ id: taskId, details: updatedDetails })).unwrap();
      if (result) dispatch(setTaskActionType('update_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const displayModal = modal ? (
    <>
      <ActionModal
        figure={<InfoIcon />}
        confirmAction={markTaskCompleted}
        closeModal={() => setModal(false)}
        message="You have unsaved changes, proceed anyway ?"
      />
      <Backdrop onClick={() => setModal(false)} />
    </>
  ) : null;

  return (
    <>
      {displayModal}
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
