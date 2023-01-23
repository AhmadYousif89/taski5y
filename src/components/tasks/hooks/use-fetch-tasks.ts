import { useCallback, useEffect, useMemo } from 'react';

import { getAllTasks } from 'features/services/tasks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTaskActionType, taskSelector } from 'features/slices/task';

export const useFetchTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(taskSelector);

  const fetchTasks = useCallback(async () => {
    try {
      dispatch(setTaskActionType('fetching'));
      await dispatch(getAllTasks());
      dispatch(setTaskActionType(''));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const memoTasks = useMemo(() => tasks, [tasks]);

  return memoTasks;
};
