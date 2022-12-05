import { useAppDispatch } from '@app/hooks';
import { deleteTasks } from '@features/services/tasks';
import { setTaskActionType } from '@features/slices/task';
import { Backdrop } from '@ui/backdrop';
import { TrashIcon } from 'assets/icons';
import { ActionModal } from '@ui/action-modal';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  taskId: string;
  isDeleting: boolean;
  onDelete: Dispatch<SetStateAction<boolean>>;
};

export const TaskDeleteButton = ({ taskId, isDeleting, onDelete }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = async () => {
    dispatch(setTaskActionType('deleting'));
    await dispatch(deleteTasks(taskId));
    dispatch(setTaskActionType(''));
  };

  return (
    <>
      {isDeleting ? (
        <>
          <ActionModal
            msg="Delete this task ?"
            confirmAction={() => deleteTaskHandler()}
            closeModal={() => onDelete(false)}
          />
          <Backdrop onClick={() => onDelete(false)} />
        </>
      ) : null}
      <button
        title="delete task"
        className="absolute top-10 right-8 cursor-pointer"
        onClick={() => onDelete(true)}>
        <TrashIcon className="transition-colors hover:fill-rose-600" />
      </button>
    </>
  );
};
