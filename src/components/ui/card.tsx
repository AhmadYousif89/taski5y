import { FC, PropsWithChildren } from 'react';
import { StarIcon } from 'assets/icons';
import { TaskPriority } from '@features/types';

interface CardProps extends PropsWithChildren {
  className?: string;
  priority?: TaskPriority;
  onClick?: (arg?: any) => void;
}

export const Card: FC<CardProps> = ({ className, children, priority, onClick }) => {
  const styles = className ? className : '';

  return (
    <div
      aria-label="card"
      onClick={onClick}
      className={`${styles} rounded-md bg-color-card p-4 shadow-md`}>
      {priority === 'High' ? (
        <span title="high priority task" className="absolute top-24 right-6">
          <StarIcon />
        </span>
      ) : null}

      {children}
    </div>
  );
};
