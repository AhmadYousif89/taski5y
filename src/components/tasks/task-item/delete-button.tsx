import { useState } from 'react';
import { useAppDispatch } from '@app/hooks';

import { Backdrop } from '@ui/backdrop';
import { TrashIcon } from 'assets/icons';
import { addTimer } from 'helpers/timeout';
import { ActionModal } from '@ui/action-modal';
import { deleteTasks } from '@features/services/tasks';
import { setTaskActionType } from '@features/slices/task';

type Props = { taskId: string };

export const TaskDeleteButton = ({ taskId }: Props) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(taskId));
    addTimer(() => dispatch(setTaskActionType('')), 1);
  };

  const isTouchDevice = 'ontouchstart' in document.documentElement;

  return (
    <>
      {modal ? (
        <>
          <ActionModal
            msg="Delete this task ?"
            confirmAction={() => deleteTaskHandler()}
            closeModal={() => setModal(false)}
          />
          <Backdrop onClick={() => setModal(false)} />
        </>
      ) : null}
      <button
        type={'button'}
        title="delete task"
        className="absolute top-10 right-8 cursor-pointer"
        onClick={() => {
          if (!isTouchDevice) setModal(true);
        }}
        onTouchEnd={() => {
          if (isTouchDevice) setModal(true);
        }}>
        <TrashIcon className="transition-colors hover:fill-rose-600" />
      </button>
    </>
  );
};
