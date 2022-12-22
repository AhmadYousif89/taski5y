import { FC, useState } from 'react';
import { useAppDispatch } from '@app/hooks';

import { Backdrop } from '@ui/backdrop';
import { TrashIcon } from 'assets/icons';
import { addTimer } from 'helpers/timeout';
import { ActionModal } from '@ui/action-modal';
import { deleteTasks } from '@features/services/tasks';
import { setTaskActionType } from '@features/slices/task';

type Props = { taskId: string };

export const TaskDeleteButton: FC<Props> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const deleteTaskHandler = () => {
    dispatch(setTaskActionType('deleting'));
    dispatch(deleteTasks(taskId));
    addTimer(() => dispatch(setTaskActionType('')), 1);
  };

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
        onClick={() => setModal(true)}>
        <TrashIcon className="transition-colors hover:fill-rose-600" />
      </button>
    </>
  );
};
