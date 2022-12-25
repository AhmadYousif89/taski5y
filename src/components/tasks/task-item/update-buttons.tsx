import { Dispatch, FC, SetStateAction, useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { TaskButton } from '../task-button';
import { InfoIcon, SpinnerIcon } from 'assets/icons';
import { ActionModal, Backdrop } from 'components/ui';
import { updateTask } from 'features/services/tasks';

type Props = {
  taskId: string;
  isEditing: boolean;
  isUpdating: boolean;
  updatedDetails: string;
  showUpdateBtn: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  setShowUpdateBtn: Dispatch<SetStateAction<boolean>>;
};

export const TaskUpdateButtons: FC<Props> = ({
  taskId,
  isEditing,
  isUpdating,
  updatedDetails,
  setShowUpdateBtn,
  showUpdateBtn,
  setIsUpdating,
  setIsEditing,
}) => {
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
    setShowUpdateBtn(true);
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
        <TaskButton onClick={markTaskCompleted} title={'complete'} />
      </div>
    </>
  );
};
