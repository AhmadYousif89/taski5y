import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTaskActionType, taskSelector } from 'features/slices/task';
import { getAllTasks } from 'features/services/tasks';

export const useFetchTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(taskSelector);

  const fetchTasks = useCallback(async () => {
    dispatch(setTaskActionType('fetching'));
    await dispatch(getAllTasks());
    dispatch(setTaskActionType(''));
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* Refetch on focus */
  useEffect(() => {
    const handleFocus = () => fetchTasks();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchTasks]);

  return tasks;
};
