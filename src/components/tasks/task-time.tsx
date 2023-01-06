import { FC } from 'react';
import { getTimeDifference } from './helpers/get-time-difference';

export const TaskTime: FC<{ time: string }> = ({ time }) => {
  const timeAgo = getTimeDifference(time);
  return (
    <div title={time}>
      <>{timeAgo}</>
    </div>
  );
};
