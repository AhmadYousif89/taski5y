import { MutableRefObject, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { path } from 'components/app';
import { Card } from 'components/ui';
import { ArrowIcon, SortIcon } from 'assets/icons';

import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { useSearchParams, useEventListener } from 'hooks';

export const SortTasks = () => {
  const navigate = useNavigate();
  const { sort, type } = useSearchParams();
  const { tasks } = useAppSelector(taskSelector);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openSortMenuHandler = () => setToggleMenu(true);
  const closeSortMenuHandler = () => setToggleMenu(false);

  const sortRef = useEventListener({
    insideElement: () => openSortMenuHandler(),
    outsideElement: () => closeSortMenuHandler()
  });

  const isSortAsc = sort === 'asc';

  const sortByAlphabetHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=alpha`);

  const sortByDateHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=createdAt`);

  const sortByPriorityHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=priority`);

  const unsortHandler = () => navigate(`${path.dashboard}`);

  const sortingList = (
    <Card className="absolute top-full left-0 translate-y-2 ring-1 ring-color-base">
      <div className="flex flex-col gap-6 py-2 text-center text-color-base">
        <button
          type={'button'}
          onClick={() => sortByAlphabetHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === 'alpha' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {type === 'alpha' ? sort : 'by'}
          </span>
          <span>alphabet</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByDateHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === 'createdAt' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {type === 'createdAt' ? sort : 'by'}
          </span>
          <span>date</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByPriorityHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === 'priority' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {type === 'priority' ? sort : 'by'}
          </span>
          <span>priority</span>
        </button>

        <button type={'button'} onClick={() => unsortHandler()} className="li-item">
          <span>unsort</span>
        </button>
      </div>
    </Card>
  );

  return (
    <>
      {tasks.length > 0 ? (
        <div
          tabIndex={0}
          role={'button'}
          title="sort tasks"
          ref={sortRef as MutableRefObject<HTMLDivElement>}
          onKeyDown={e => {
            if (e.key === 'Enter') openSortMenuHandler();
          }}
          onClick={openSortMenuHandler}
          className="flex-center absolute left-[3%] z-[15] cursor-pointer rounded-md bg-color-card py-5 pl-4 pr-1 text-xl text-color-base ring-2 ring-color-base active:ring-color-highlight xs:left-[10%] lg:left-[20%]">
          <span>Sort</span> <SortIcon />
          {toggleMenu && <>{sortingList}</>}
        </div>
      ) : null}
    </>
  );
};
