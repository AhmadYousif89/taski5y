import { useNavigate } from 'react-router-dom';
import { MutableRefObject, useState } from 'react';

import { Card } from 'components/ui';
import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { useSearchParams, useEventListener, SortOrder, SortType } from 'hooks';

import { ArrowIcon, SortIcon } from 'assets/icons';

export const SortTasks = () => {
  const navigate = useNavigate();
  const { sort, type, filter, query } = useSearchParams();
  const { tasks } = useAppSelector(taskSelector);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openSortMenu = () => setToggleMenu(true);
  const closeSortMenu = () => setToggleMenu(false);

  const sortRef = useEventListener({
    insideElement: () => openSortMenu(),
    outsideElement: () => closeSortMenu()
  });

  const [asc, desc]: SortOrder[] = ['asc', 'desc'];
  const [alpha, date, priority]: SortType[] = ['alpha', 'date', 'priority'];
  const isSortAsc = sort === asc;

  const sortBy = (type: SortType) =>
    type
      ? `${location.pathname}?sort=${isSortAsc ? desc : asc}&type=${type}&${
          filter ? `filter=${filter}&` : ''
        }${query ? `query=${query}&` : ''}`
      : `${location.pathname}?${filter ? `filter=${filter}&` : ''}${
          query ? `query=${query}&` : ''
        }`;

  const sortByDateHandler = () => navigate(sortBy('date'));

  const sortByAlphabetHandler = () => navigate(sortBy('alpha'));

  const sortByPriorityHandler = () => navigate(sortBy('priority'));

  const unsortHandler = () => navigate(sortBy(null));

  const sortingList = (
    <Card className="absolute top-full left-0 translate-y-2 ring-1 ring-color-base">
      <div className="flex flex-col gap-6 py-2 text-center text-color-base">
        <button
          type={'button'}
          onClick={() => sortByAlphabetHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === alpha ? (
              <ArrowIcon className={`${isSortAsc ? 'animate-arrow-up' : 'animate-arrow-down'}`} />
            ) : null}
            {type === alpha ? sort : 'by'}
          </span>
          <span>alphabet</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByDateHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === date ? (
              <ArrowIcon className={`${isSortAsc ? 'animate-arrow-up' : 'animate-arrow-down'}`} />
            ) : null}
            {type === date ? sort : 'by'}
          </span>
          <span>date</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByPriorityHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {type === priority ? (
              <ArrowIcon className={`${isSortAsc ? 'animate-arrow-up' : 'animate-arrow-down'}`} />
            ) : null}
            {type === priority ? sort : 'by'}
          </span>
          <span>priority</span>
        </button>

        <button type={'button'} onClick={() => unsortHandler()} className="li-item">
          <span>reset</span>
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
            if (e.key === 'Enter') openSortMenu();
          }}
          className="flex-center absolute left-[2%] z-[15] cursor-pointer gap-1 rounded-md bg-color-card py-4 pl-3 pr-1 text-xl text-color-base ring-1 ring-color-base active:ring-color-highlight xs:left-[10%] lg:left-[20%]">
          <span>Sort</span>
          {sort === asc ? (
            <ArrowIcon className={'animate-arrow-up'} />
          ) : sort === desc ? (
            <ArrowIcon className={'animate-arrow-down'} />
          ) : (
            <SortIcon />
          )}
          {toggleMenu && <>{sortingList}</>}
        </div>
      ) : null}
    </>
  );
};
