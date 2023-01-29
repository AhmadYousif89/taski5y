import { MutableRefObject, useState } from 'react';

import { useEventListener, useSearchParams } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ActionModal, Backdrop, Card } from 'components/ui';
import { deleteActiveTasks, deleteCompletedTasks } from 'features/services/tasks';
import { toggleProfile, toggleSideMenu } from 'features/slices/ui';
import { setTaskActionType, taskSelector } from 'features/slices/task';

export const TaskOptions = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { totalTasks, totalCompletedTasks } = useAppSelector(taskSelector);
  const { filter } = useSearchParams();

  const optionRef = useEventListener({
    insideElement: () => setToggleMenu(true),
    outsideElement: () => setToggleMenu(false)
  });

  const openMenu = () => {
    dispatch(toggleSideMenu());
    dispatch(toggleProfile(false));
  };
  const deleteAllTasksHandler = async () => {
    if (totalTasks === 0 && totalCompletedTasks === 0) return;
    try {
      setModal(false);
      dispatch(setTaskActionType('deleting'));
      if (filter === 'completed') {
        await dispatch(deleteCompletedTasks()); // to be changed
      } else {
        await dispatch(deleteActiveTasks());
      }
      dispatch(setTaskActionType('delete_all_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const deleteBtnTitle =
    totalTasks > 0
      ? 'delete all active tasks'
      : filter === 'completed' && totalCompletedTasks > 0
      ? 'delete all completed tasks'
      : '';

  const haveTasks = totalTasks > 0 || (filter === 'completed' && totalCompletedTasks > 0);

  const openModalHandler = () => (haveTasks ? setModal(true) : setModal(false));

  const showOptions = (
    <Card className="absolute top-full -left-full z-10 -translate-y-2 py-4 ring-1 ring-color-base">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <button title="create new task" className="li-item" onClick={openMenu}>
          add new
        </button>
        <button
          disabled={!haveTasks}
          title={deleteBtnTitle}
          className={`${!haveTasks ? 'cursor-not-allowed' : 'cursor-pointer'} li-item text-red-500`}
          onClick={openModalHandler}>
          delete all
        </button>
      </ul>
    </Card>
  );

  const displayModal = modal ? (
    <>
      <ActionModal
        message={`You are about to delete all your ${
          filter === 'completed' ? 'completed' : 'active'
        } tasks ?`}
        confirmAction={() => deleteAllTasksHandler()}
        closeModal={() => setModal(false)}
      />
      <Backdrop onClick={() => setModal(false)} />
    </>
  ) : null;

  return (
    <div className="absolute right-0 px-2 !py-4 xs:right-[8%] lg:right-[18%]">
      {displayModal}
      <button
        title="task options"
        ref={optionRef as MutableRefObject<HTMLButtonElement>}
        className="rounded-md bg-color-card py-4 px-3 text-color-base ring-1 ring-color-base hover:ring-color-highlight">
        <span className="text-lg">Options</span>
      </button>
      {toggleMenu && showOptions}
    </div>
  );
};
