import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { useMemo } from 'react';

export const useTask = () => {
  const { tasks } = useAppSelector(taskSelector);
  return useMemo(() => ({ tasks }), [tasks]);
};
