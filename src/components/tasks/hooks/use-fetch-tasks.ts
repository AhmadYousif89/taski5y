import { useCallback, useEffect } from 'react';

import { useTask } from 'hooks';
import { useAppDispatch } from 'app/hooks';
import { getAllTasks } from 'features/services/tasks';
import { setTaskActionType } from 'features/slices/task';

export const useFetchTasks = () => {
  const { tasks } = useTask();
  const dispatch = useAppDispatch();

  const fetchTasks = useCallback(async () => {
    dispatch(setTaskActionType('fetching'));
    await dispatch(getAllTasks());
    dispatch(setTaskActionType(''));
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return tasks;
};
