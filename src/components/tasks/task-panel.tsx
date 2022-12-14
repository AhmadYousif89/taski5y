import { FC } from 'react';

import { useAppSelector } from 'app/hooks';
import { TaskStatus } from 'features/types';
import { taskSelector } from 'features/slices/task';

export type TaskPanelProps = {
  id?: string;
  count: number;
  color: string;
  tooltip: string;
  title: TaskStatus;
  className?: string;
  togglePanels: () => void;
};

export const TaskPanel: FC<TaskPanelProps> = ({ title, count, color, tooltip, togglePanels }) => {
  const { activeTaskPanel } = useAppSelector(taskSelector);

  const borderColor =
    color === 'sky'
      ? 'border-sky'
      : color === 'amber'
      ? 'border-amber'
      : color === 'green'
      ? 'border-green'
      : '';
  const textColor =
    color === 'sky'
      ? 'text-sky'
      : color === 'amber'
      ? 'text-amber'
      : color === 'green'
      ? 'text-green'
      : '';

  return (
    <button
      title={tooltip}
      className={`${
        activeTaskPanel === title ? textColor : ''
      } flex h-full w-full cursor-default flex-col items-center gap-8 rounded-sm bg-transparent text-color-base transition-colors `}>
      <div
        onClick={() => togglePanels()}
        className={`relative ${borderColor} h-28 w-28 cursor-pointer rounded-full border-[5px] bg-transparent shadow-md md:h-32 md:w-32 lg:h-44 lg:w-44`}>
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold md:text-4xl`}>
          {count}
        </span>
      </div>
      <p className={`rounded-md p-3 text-2xl capitalize tracking-wide md:text-4xl`}>{title}</p>
    </button>
  );
};
