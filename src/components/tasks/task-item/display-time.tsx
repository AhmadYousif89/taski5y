import { FC, useEffect, useState } from 'react';

import { Task } from 'features/types';
import { getTaskTime } from '../helpers';
import { useAppDispatch } from 'app/hooks';
import { formatISOString } from 'helpers';
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
  const formattedTime = formatISOString(task?.expireDate);

  useEffect(() => {
    const currentDate = new Date();
    if (task) {
      if (!task.isExpired && task.expireDate && currentDate.toISOString() > task.expireDate) {
        dispatch(updateTask({ id: task?.id, isExpired: true }));
      }
    }
    const id = setInterval(() => setShowMsg(formattedTime), 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch, formattedTime, task]);

  return (
    <div
      className={`${className} ${
        task?.isExpired ? 'cursor-default' : 'cursor-pointer'
      } w-full rounded-md bg-color-base px-4 py-2 ring-2 ring-color-base`}>
      {time && <div title={time?.slice(0, 19).replace('T', '  ')}>{timeAgo}</div>}

      {task && (
        <div
          className="text-lg"
          title={
            task.isExpired
              ? 'task expired'
              : `expire date : ${task.expireDate?.slice(0, 19).replace('T', '  ')}`
          }>
          {task.isExpired ? 'Failed to complete in time' : showMsg}
        </div>
      )}
    </div>
  );
};
