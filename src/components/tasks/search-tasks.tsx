import { debounce } from 'helper/debouncer';
import { useAppDispatch } from '@app/hooks';
import { storeTaskSearchQuery } from '@features/slices/task';

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const onUpdatedQuery = debounce(
    e => dispatch(storeTaskSearchQuery(e.target.value)),
    750,
  );

  return (
    <form aria-label="Task-search-bar" className="mx-auto w-1/2">
      <fieldset>
        <label
          htmlFor="search"
          className="
          block overflow-hidden rounded-md ring-2 ring-color-base
          drop-shadow-lg focus-within:ring-color-highlight focus:outline-none">
          <input
            type="text"
            id="search"
            onChange={onUpdatedQuery}
            placeholder="Search . . ."
            title="Search by task title or details"
            className="
            block w-full bg-color-base px-6 py-4 text-3xl
            tracking-wide text-color-base placeholder:overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap placeholder:text-center
            placeholder:text-2xl placeholder:text-color-base placeholder:opacity-70"
          />
        </label>
      </fieldset>
    </form>
  );
};
