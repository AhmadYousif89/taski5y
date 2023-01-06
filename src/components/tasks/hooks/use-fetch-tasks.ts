import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTaskActionType, taskSelector } from 'features/slices/task';
import { getAllTasks } from 'features/services/tasks';
import { wait } from 'helpers';

export const useFetchTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(taskSelector);

  const fetchTasks = useCallback(() => {
    dispatch(setTaskActionType('fetching'));
    dispatch(getAllTasks());
    wait(() => dispatch(setTaskActionType('')), 1);
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return tasks;
};
