import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TaskSortOrder, TaskSortType } from 'features/types';

export const useSearchParams = () => {
  const location = useLocation();

  const sort = new URLSearchParams(location.search).get('sort') as TaskSortOrder;
  const type = new URLSearchParams(location.search).get('type') as TaskSortType;
  const searchParams = new URLSearchParams();

  useEffect(() => {
    searchParams.set('sort', sort);
    searchParams.set('type', type);
    if (sort && type)
      history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
  }, [sort, type]);

  return { sort, type };
};
