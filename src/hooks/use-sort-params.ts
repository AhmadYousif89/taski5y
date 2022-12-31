import { TaskSortOrder, TaskSortType } from 'features/types';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const searchParams: { order: TaskSortOrder; type: TaskSortType } = { order: '', type: '' };

export const useSortParams = () => {
  const location = useLocation();
  const [params, setParams] = useState(searchParams);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const order = params.get('sort') as TaskSortOrder;
    const type = params.get('type') as TaskSortType;
    if (order && type) setParams({ order, type });
  }, [location.search]);

  const reset = useCallback(() => setParams(searchParams), []);

  return {
    resetParams: reset,
    order: params.order,
    type: params.type,
  };
};
