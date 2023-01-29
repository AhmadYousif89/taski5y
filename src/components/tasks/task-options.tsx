import { MutableRefObject, useState } from 'react';

import { CreateTaskIcon, TrashIcon } from 'assets/icons';
import { useEventListener, useSearchParams } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ActionModal, Backdrop, Card } from 'components/ui';

import { deleteAllTasks } from 'features/services/tasks';
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

  const haveTasks =
    (filter !== 'completed' && totalTasks > 0) ||
    (filter === 'completed' && totalCompletedTasks > 0);
  const haveNoTasks =
    (filter !== 'completed' && totalTasks === 0) ||
    (filter === 'completed' && totalCompletedTasks === 0);

  const deleteAllTasksHandler = async () => {
    if (haveNoTasks) return;
    try {
      setModal(false);
      dispatch(setTaskActionType('deleting'));
      filter === 'completed'
        ? await dispatch(deleteAllTasks('completed'))
        : await dispatch(deleteAllTasks());
      dispatch(setTaskActionType('delete_all_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const deleteBtnTitle = haveTasks
    ? `delete all ${filter === 'completed' ? 'completed' : 'active'} tasks`
    : '';

  const openModalHandler = () => (haveTasks ? setModal(true) : setModal(false));

  const showOptions = (
    <Card className="absolute top-full right-0 z-10 translate-y-2 py-4 ring-1 ring-color-base">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <button
          title="create new task"
          className="li-item flex items-center justify-start gap-4"
          onClick={openMenu}>
          <CreateTaskIcon />
          <span>add new</span>
        </button>
        <button
          title={deleteBtnTitle}
          disabled={haveNoTasks}
          onClick={openModalHandler}
          className={`${
            haveNoTasks ? 'cursor-not-allowed' : 'cursor-pointer'
          } li-item flex items-center justify-start gap-4`}>
          <TrashIcon />
          <span className="text-red-500">delete all</span>
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
    <div className="absolute right-[2%] xs:right-[10%] lg:right-[18%]">
      {displayModal}
      <button
        title="task options"
        ref={optionRef as MutableRefObject<HTMLButtonElement>}
        className="rounded-md bg-color-card py-4 pl-2 pr-3 text-color-base ring-1 ring-color-base hover:ring-color-highlight">
        <span className="text-lg">Options</span>
      </button>
      {toggleMenu && showOptions}
    </div>
  );
};
