import { PropsWithChildren } from 'react';
import { StarIcon } from 'assets/icons';
import { TaskPriority } from '@features/types';

interface CardProps extends PropsWithChildren {
  className?: string;
  priority?: TaskPriority;
  onClick?: (arg?: any) => void;
}

export const Card = ({ className, children, priority, onClick }: CardProps) => {
  const styles = className ? className : '';

  return (
    <div
      aria-label="card"
      onClick={onClick}
      className={`${styles} rounded-lg bg-color-card p-4 shadow-md drop-shadow-md`}>
      {priority === 'High' ? (
        <span
          className="absolute -top-2 -right-4 cursor-default"
          title="High priority task">
          <StarIcon className="rotate-[35deg] scale-150 fill-amber-500 stroke-black" />
        </span>
      ) : (
        ''
      )}

      {children}
    </div>
  );
};
