import { FC, MutableRefObject, useState } from 'react';

import { Task } from 'features/types';
import { InfoIcon } from 'assets/icons';
import { useEventListener } from 'hooks';
import { DisplayTaskTime } from './display-time';

export const TaskInfo: FC<{ task: Task }> = ({ task }) => {
  const [showInfo, setShowInfo] = useState(false);

  const infoIconRef = useEventListener({
    eventType: 'mouseover',
    insideElement: () => setShowInfo(true),
    outsideElement: () => setShowInfo(false)
  });

  const wasUpdated = task.createdAt !== task.updatedAt;

  return (
    <div ref={infoIconRef as MutableRefObject<HTMLDivElement>} className="relative">
      <InfoIcon className="h-12 w-12 hover:stroke-sky-400" />
      {showInfo && (
        <div className="absolute -top-5 right-full z-20 flex w-max flex-col gap-4 rounded-lg bg-color-base p-8 text-xl text-color-base shadow-md transition-all duration-300">
          <span className="mb-2 text-center text-2xl">Task Info</span>
          <span className="flex items-center gap-4">
            Created: <DisplayTaskTime time={task.createdAt} />
          </span>
          <span className="flex items-center gap-4">
            {wasUpdated && (
              <>
                Updated: <DisplayTaskTime time={task.updatedAt} />
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
