import { FC, useEffect, useState } from 'react';

import { Task } from 'features/types';
import { getTaskTime } from '../helpers';
import { useAppDispatch } from 'app/hooks';
import { formatISOString } from 'helpers';
import { ClockIcon } from 'assets/icons';
import { updateTask } from 'features/services/tasks';

type Props = {
  task: Task;
  type: 'create' | 'update' | 'timer';
  className?: string;
};

export const DisplayTaskTime: FC<Props> = ({ task, type, className }) => {
  const dispatch = useAppDispatch();
  const [showMsg, setShowMsg] = useState('Calculating ...');

  const createTime = getTaskTime(task.createdAt);
  const updateTime = getTaskTime(task.updatedAt);
  const formattedTime = formatISOString(task?.expireDate);

  useEffect(() => {
    const currentDate = new Date();
    if (!task.isExpired && task.expireDate && currentDate.toISOString() > task.expireDate) {
      dispatch(updateTask({ id: task.id, isExpired: true }));
    }
    const id = setInterval(() => setShowMsg(formattedTime), 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch, formattedTime, task]);

  const expireTimeTitle = task.isExpired
    ? 'task expired'
    : `expire date : ${task.expireDate?.slice(0, 19).replace('T', '  ')}`;

  return (
    <div className="w-full">
      {type === 'timer' && !task.isExpired && (
        <p className="mb-2 cursor-pointer text-lg">Time to finish | Reset ?</p>
      )}
      <div className={`${className} rounded-md bg-color-base p-1 px-4 ring-2 ring-color-base`}>
        {type !== 'timer' ? (
          <div className="cursor-default">
            {type === 'create' ? createTime : type === 'update' ? updateTime : ''}
          </div>
        ) : null}
        {type === 'timer' && (
          <pre
            className={`${
              task.isExpired ? 'cursor-default' : 'cursor-pointer'
            } flex items-center gap-4 text-xl`}
            title={expireTimeTitle}>
            {task.isExpired ? 'Failed to finish in time' : showMsg}
            {!task.isExpired && <ClockIcon />}
          </pre>
        )}
      </div>
    </div>
  );
};
