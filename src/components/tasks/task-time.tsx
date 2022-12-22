import { formatDistanceToNow, parseISO } from 'date-fns';
import { FC } from 'react';

export const TaskTime: FC<{ time: string }> = ({ time }) => {
  let timeAgo = '';
  if (time) {
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <div title={time}>
      <>{timeAgo}</>
    </div>
  );
};
