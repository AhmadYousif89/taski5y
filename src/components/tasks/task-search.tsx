import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'hooks';
import { debounce } from 'helpers/debouncer';
import { SearchIcon } from 'assets/icons';

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
      if (searchRef.current && e.ctrlKey && e.key === '/') {
        searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <form
      className="center-absolute w-2/3 md:max-w-3xl"
      aria-label="Task-search-bar"
      onSubmit={e => e.preventDefault()}>
      <fieldset
        className="group relative mx-auto flex w-10/12 items-center overflow-hidden rounded-md shadow-md ring-1 ring-color-base transition-all focus-within:ring-color-highlight hover:ring-color-highlight"
        aria-label="search-for-tasks">
        <span className="mx-2">
          <SearchIcon />
        </span>
        <input
          required
          ref={searchRef}
          type="text"
          id="search"
          autoComplete="off"
          onChange={onUpdatedQuery}
          placeholder="Type here"
          title="Search by task title or details"
          className="peer w-full bg-color-base  py-4 text-2xl tracking-wide text-color-base outline-none placeholder:text-xl placeholder:text-color-base placeholder:opacity-70"
        />
        <label
          title="press ctrl + / to search"
          htmlFor="search"
          className="flex-center absolute top-1/2 -right-10 h-10 w-fit -translate-y-1/2 -translate-x-1/2 rounded-md bg-color-card bg-opacity-50 px-2 text-lg tracking-tighter text-color-base text-opacity-70 ring-1 ring-color-base transition-all group-hover:text-opacity-90 group-hover:ring-color-highlight peer-valid:invisible peer-focus:invisible peer-focus:opacity-0">
          ctrl + /
        </label>
      </fieldset>
    </form>
  );
};
