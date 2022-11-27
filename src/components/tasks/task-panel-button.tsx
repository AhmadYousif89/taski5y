import { Dispatch, SetStateAction } from 'react';

import { BackArrowIcon } from 'assets/icons';
import { useAppDispatch } from '@app/hooks';
import { TaskStatus } from '@features/types';
import { storeTaskActivePanel } from '@features/slices/task';

interface Props {
  toggleTaskPanels: Dispatch<SetStateAction<boolean>>;
  toggleIsActive: Dispatch<SetStateAction<boolean | TaskStatus>>;
}

export const TaskPanelButton = ({ toggleTaskPanels, toggleIsActive }: Props) => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    toggleTaskPanels(p => !p);
    toggleIsActive(p => !p);
    dispatch(storeTaskActivePanel(''));
  };

  return (
    <button
      onClick={onClickHandler}
      className="mx-auto flex items-center gap-4 self-center rounded-lg px-3 py-3 pr-5 text-3xl text-color-base ring-color-base hover:ring-2 active:translate-y-1">
      <BackArrowIcon /> Back
    </button>
  );
};
