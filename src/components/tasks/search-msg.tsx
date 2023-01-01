import { FC } from 'react';
import { Task } from 'features/types';

export const SearchMsg: FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <h3 className="mx-auto w-11/12 max-w-lg rounded-md py-4 text-center text-2xl text-color-base shadow-md ring-1 ring-amber-500">
      Result: found {tasks.length} task{tasks.length > 1 ? 's' : ''}
    </h3>
  );
};
