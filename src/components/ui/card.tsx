import { FC, PropsWithChildren } from 'react';

import { TaskPriority } from 'features/types';
import { StarIcon } from 'assets/icons';

type CardProps = {
  className?: string;
  priority?: TaskPriority;
  onClick?: (arg?: any) => void;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  className,
  children,
  priority,
  onClick
}) => {
  const styles = className ? className : '';

  return (
    <div
      aria-label="card"
      onClick={onClick}
      className={`${styles} rounded-md bg-color-card px-4 shadow-md`}>
      {priority === 'High' ? (
        <span title="high priority task" className="absolute top-28 right-7 z-10">
          <StarIcon />
        </span>
      ) : null}

      {children}
    </div>
  );
};
