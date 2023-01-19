import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type SortOrder = 'asc' | 'desc' | null;
export type SortType = 'alpha' | 'date' | 'priority' | null;
export type Filter = 'todo' | 'in-progress' | 'completed' | null;
type Params = {
  sort: SortOrder;
  type: SortType;
  filter: Filter;
  query: string | null;
};
/**
 * A hook that reads and updates the search parameters in the URL.
 * @returns {Object} An object containing the current values of the 'sort', 'type', 'query' and 'filter' search parameters.
 * @property {SortOrder} sort - The current value of the 'sort' search parameter.
 * @property {SortType} type - The current value of the 'type' search parameter.
 * @property {Filter} filter - The current value of the 'filter' search parameter.
 * @property {string | null} query - The current value of the 'query' search parameter.
 * @example
 * const { sort, type, filter, query } = useSearchParams();
 * console.log(`Sort order: ${sort}, Sort type: ${type}`);
 * // Sort order: desc, Sort type: alpha
 */
export const useSearchParams = (): Params => {
  const location = useLocation();

  const sort = new URLSearchParams(location.search).get('sort') as SortOrder;
  const type = new URLSearchParams(location.search).get('type') as SortType;
  const filter = new URLSearchParams(location.search).get('filter') as Filter;
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (sort) searchParams.set('sort', sort);
    if (type) searchParams.set('type', type);
    if (query) searchParams.set('query', query);
    if (filter) searchParams.set('filter', filter);
    if ((sort && type) || filter || query) {
      history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
    }
  }, [location.pathname, sort, type, filter, query]);

  return { sort, type, filter, query };
};
