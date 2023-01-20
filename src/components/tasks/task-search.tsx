import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'hooks';
import { debounce } from 'helpers/debouncer';

export const SearchTasks = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const { filter, sort, type } = useSearchParams();

  const onUpdatedQuery = debounce(e => {
    const query = e.target.value;

    const searchURL =
      sort && type && filter && query
        ? `?sort=${sort}&type=${type}&filter=${filter}&query=${query}`
        : sort && type && query
        ? `?sort=${sort}&type=${type}&query=${query}`
        : filter && query
        ? `?filter=${filter}&query=${query}`
        : sort && type
        ? `?sort=${sort}&type=${type}`
        : query
        ? `?query=${query}`
        : filter
        ? `?filter=${filter}`
        : '';

    navigate(searchURL);
  }, 750);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (searchRef.current && e.ctrlKey) {
        searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <form aria-label="Task-search-bar" onSubmit={e => e.preventDefault()}>
      <fieldset
        className="group relative mx-auto w-10/12 overflow-hidden rounded-md shadow-md ring-1 ring-color-base transition-all focus-within:ring-color-highlight hover:ring-color-highlight xs:w-full "
        aria-label="search-for-tasks">
        <input
          required
          ref={searchRef}
          type="text"
          id="search"
          autoComplete="off"
          onChange={onUpdatedQuery}
          placeholder="Search tasks"
          title="Search by task title or details"
          className="peer w-full bg-color-base px-6 py-4 text-2xl tracking-wide text-color-base placeholder:text-xl placeholder:text-color-base placeholder:opacity-50"
        />
        <label
          title="press ctrl to search"
          htmlFor="search"
          className="flex-center absolute top-1/2 -right-6 h-10 w-16 -translate-y-1/2 -translate-x-1/2 rounded-md text-lg text-color-base text-opacity-50 ring-1 ring-color-base transition-all group-hover:text-opacity-90 group-hover:ring-color-highlight peer-valid:invisible peer-focus:invisible peer-focus:opacity-0">
          ctrl
        </label>
      </fieldset>
    </form>
  );
};
