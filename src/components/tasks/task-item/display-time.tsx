import { FC } from 'react';
import { TaskTime } from '../task-time';

type Props = { time: string; label: string; className?: string };

export const DisplayTaskTime: FC<Props> = ({ time, label, className }) => {
  return (
    <div
      className={`${className} flex items-center gap-2 self-start rounded-full bg-color-base px-4 py-2 text-xl tracking-wide text-color-base ring-2 ring-color-base`}>
      <span>{label}</span>
      <TaskTime time={time} />
    </div>
  );
};
