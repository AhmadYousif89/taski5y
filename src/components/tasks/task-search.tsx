import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'hooks';
import { debounce } from 'helpers/debouncer';

export const SearchTasks = () => {
  const navigate = useNavigate();
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

  return (
    <form aria-label="Task-search-bar" onSubmit={e => e.preventDefault()}>
      <fieldset
        className="mx-auto w-2/3 overflow-hidden rounded-md ring-2 ring-color-base drop-shadow-md focus-within:ring-color-highlight xs:w-full"
        aria-label="search-for-tasks">
        <input
          type="text"
          id="search"
          autoComplete="off"
          onChange={onUpdatedQuery}
          placeholder="Search for task ..."
          title="Search by task title or details"
          className="w-full bg-color-base px-6 py-4 text-3xl tracking-wide text-color-base placeholder:text-center placeholder:text-xl placeholder:text-color-base placeholder:opacity-50"
        />
      </fieldset>
    </form>
  );
};
