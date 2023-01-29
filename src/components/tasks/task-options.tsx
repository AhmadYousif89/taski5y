import { MutableRefObject, useState } from 'react';

import { useEventListener } from 'hooks';
import { useAppDispatch } from 'app/hooks';
import { ActionModal, Backdrop, Card } from 'components/ui';
import { deleteActiveTasks } from 'features/services/tasks';
import { toggleProfile, toggleSideMenu } from 'features/slices/ui';
import { setTaskActionType } from 'features/slices/task';

export const TaskOptions = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const optionRef = useEventListener({
    insideElement: () => setToggleMenu(true),
    outsideElement: () => setToggleMenu(false)
  });

  const openMenu = () => {
    dispatch(toggleSideMenu());
    dispatch(toggleProfile(false));
  };
  const deleteActiveTasksHandler = async () => {
    try {
      setModal(false);
      dispatch(setTaskActionType('deleting'));
      await dispatch(deleteActiveTasks());
      dispatch(setTaskActionType('delete_all_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const showOptions = (
    <Card className="absolute top-full -left-full z-10 -translate-y-2 py-4 ring-1 ring-color-base">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <button title="create new task" className="li-item" onClick={openMenu}>
          add new
        </button>
        <button
          title="delete all active tasks"
          className="li-item text-red-500"
          onClick={() => setModal(true)}>
          delete all
        </button>
      </ul>
    </Card>
  );

  const displayModal = modal ? (
    <>
      <ActionModal
        message="You are about to delete all your active tasks ?"
        confirmAction={() => deleteActiveTasksHandler()}
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
        className="rounded-md bg-color-card py-4 px-3 ring-1 ring-color-base hover:ring-color-highlight">
        <span className="text-lg">Options</span>
      </button>
      {toggleMenu && showOptions}
    </div>
  );
};
