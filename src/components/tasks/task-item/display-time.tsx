import { FC, useEffect, useState } from 'react';

import { Task } from 'features/types';
import { getTaskTime } from '../helpers';
import { useAppDispatch } from 'app/hooks';
import { updateTask } from 'features/services/tasks';

type Props = {
  task?: Task;
  time?: string;
  className?: string;
};

export const DisplayTaskTime: FC<Props> = ({ task, time, className }) => {
  const dispatch = useAppDispatch();
  const [showMsg, setShowMsg] = useState('Calculating ...');
  const timeAgo = getTaskTime(time || '');

  useEffect(() => {
    const oneSecond = 1000;
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * 60 * oneSecond;

    const finishTime = () => {
      const currentDate = new Date();
      const expirationDate = new Date(task?.expireDate || '');
      const timeDifference = expirationDate.getTime() - currentDate.getTime();

      if (task && currentDate.toISOString() > task.expireDate && !task.isExpired) {
        dispatch(updateTask({ id: task?.id, isExpired: true }));
        return '';
      }

      const h = Math.floor(timeDifference / oneHour);
      const m = Math.floor((timeDifference % oneHour) / oneMinute);
      const s = Math.floor((timeDifference % oneMinute) / oneSecond);

      return `${h}h : ${m}m : ${s}s to finish`;
    };

    const id = setInterval(() => setShowMsg(finishTime()), oneSecond);

    return () => {
      clearInterval(id);
    };
  }, [dispatch, task]);

  return (
    <div
      className={`${className} w-full cursor-default rounded-md bg-color-base px-4 py-2 ring-2 ring-color-base`}>
      {time && <div title={time?.slice(0, 19).replace('T', '  ')}>{timeAgo}</div>}

      {task && (
        <div className="text-lg" title={task.expireDate?.slice(0, 19).replace('T', '  ')}>
          {task.isExpired ? 'Failed to complete in time' : showMsg}
        </div>
      )}
    </div>
  );
};
