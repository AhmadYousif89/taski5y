import { FC, useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { deleteTasks } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

import { ActionModal, Backdrop, Button } from 'components/ui';

export const TaskDeleteButton: FC<{ taskId: string }> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const deleteTaskHandler = async () => {
    try {
      dispatch(setTaskActionType('deleting'));
      const result = await dispatch(deleteTasks(taskId)).unwrap();
      if (result) dispatch(setTaskActionType('delete_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const displayModal = modal ? (
    <>
      <ActionModal
        message="Delete this task ?"
        confirmAction={() => deleteTaskHandler()}
        closeModal={() => setModal(false)}
      />
      <Backdrop onClick={() => setModal(false)} />
    </>
  ) : null;

  return (
    <>
      {displayModal}
      <Button
        title="delete task"
        className="self-end bg-slate-500 px-7 text-xl text-neutral-200 !ring-0 hover:bg-red-600 hover:ring-0"
        onClick={() => setModal(true)}>
        delete
      </Button>
    </>
  );
};
