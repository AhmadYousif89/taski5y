import { useState } from 'react';
import { useAppDispatch } from '@app/hooks';
import { Backdrop } from '@ui/backdrop';
import { TrashIcon } from 'assets/icons';
import { ActionModal } from '@ui/action-modal';
import { deleteTasks } from '@features/services/tasks';
import { setTaskActionType } from '@features/slices/task';

type Props = { taskId: string };

export const TaskDeleteButton = ({ taskId }: Props) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const deleteTaskHandler = async () => {
    dispatch(setTaskActionType('deleting'));
    await dispatch(deleteTasks(taskId));
    dispatch(setTaskActionType(''));
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
        title="delete task"
        className="absolute top-10 right-8 cursor-pointer"
        onClick={() => setModal(true)}>
        <TrashIcon className="transition-colors hover:fill-rose-600" />
      </button>
    </>
  );
};
