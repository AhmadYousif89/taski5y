import { useAppDispatch } from 'app/hooks';
import { debounce } from 'helpers/debouncer';
import { setTaskSearchQuery } from 'features/slices/task';

export const SearchTasks = () => {
  const dispatch = useAppDispatch();

  const onUpdatedQuery = debounce(e => dispatch(setTaskSearchQuery(e.target.value)), 750);

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
