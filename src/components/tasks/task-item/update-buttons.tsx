import { Dispatch, SetStateAction, useState } from 'react';
import { SpinnerIcon } from 'assets/icons';
import { useAppDispatch } from '@app/hooks';
import { updateTask } from '@features/services/tasks';
import { TaskButton } from '@tasks/task-button';
import { ActionModal } from '@ui/action-modal';
import { Backdrop } from '@ui/backdrop';
import { InfoIcon } from 'assets/icons/info';

type Props = {
  taskId: string;
  updatedDetails: string;
  isUpdating: boolean;
  isEditing: boolean;
  showUpdateBtn: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  setShowUpdateBtn: Dispatch<SetStateAction<boolean>>;
};

export const TaskUpdateButtons = ({
  taskId,
  isEditing,
  isUpdating,
  updatedDetails,
  setShowUpdateBtn,
  showUpdateBtn,
  setIsUpdating,
  setIsEditing,
}: Props) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const markTaskCompleted = () => {
    if (isEditing && !modal) {
      setModal(true);
      return;
    }
    setIsUpdating(true);
    setShowUpdateBtn(true);
    dispatch(updateTask({ id: taskId, status: 'Completed' }));
  };

  const updateTaskDetailHandler = () => {
    setIsEditing(false);
    setIsUpdating(true);
    dispatch(updateTask({ id: taskId, details: updatedDetails }));
  };

  return (
    <>
      {modal ? (
        <>
          <ActionModal
            icon={<InfoIcon />}
            msg="You have unsaved changes ?"
            confirmAction={markTaskCompleted}
            closeModal={() => setModal(false)}
          />
          <Backdrop onClick={() => setModal(false)} />
        </>
      ) : null}
      <div aria-label="task-update-buttons" className="flex items-center gap-4">
        {showUpdateBtn || isEditing ? (
          <TaskButton onClick={updateTaskDetailHandler}>
            {isUpdating ? <SpinnerIcon className="h-7 w-7" /> : 'save'}
          </TaskButton>
        ) : null}
        <TaskButton onClick={markTaskCompleted} title={'mark complete'} />
      </div>
    </>
  );
};
