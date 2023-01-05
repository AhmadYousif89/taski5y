import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TaskSortOrder, TaskSortType } from 'features/types';

/**
 * A hook that reads and updates the search parameters in the URL.
 * @returns {Object} An object containing the current values of the 'sort' and 'type' search parameters.
 * @property {TaskSortOrder} sort - The current value of the 'sort' search parameter.
 * @property {TaskSortType} type - The current value of the 'type' search parameter.
 * @example
 * const { sort, type } = useSearchParams();
 * console.log(`Sort order: ${sort}, Sort type: ${type}`);
 * // Sort order: desc, Sort type: alpha
 */
export const useSearchParams = (): { sort: TaskSortOrder; type: TaskSortType } => {
  const location = useLocation();

  const sort = new URLSearchParams(location.search).get('sort') as TaskSortOrder;
  const type = new URLSearchParams(location.search).get('type') as TaskSortType;

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('sort', sort);
    searchParams.set('type', type);
    if (sort && type) {
      history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
    }
  }, [location.pathname, sort, type]);

  return { sort, type };
};
