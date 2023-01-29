import { useNavigate } from 'react-router-dom';
import { MutableRefObject, useState } from 'react';

import { Card } from 'components/ui';
import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { useSearchParams, useEventListener, SortOrder, SortType } from 'hooks';

import { ArrowIcon, SortIcon } from 'assets/icons';

export const SortTasks = () => {
  const { tasks } = useAppSelector(taskSelector);
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const { completedTasks } = useAppSelector(taskSelector);
  const { sort: sortOrder, type: sortType, filter, query } = useSearchParams();

  const openSortMenu = () => setToggleMenu(true);
  const closeSortMenu = () => setToggleMenu(false);

  const sortRef = useEventListener({
    insideElement: () => openSortMenu(),
    outsideElement: () => closeSortMenu()
  });

  const sortTypes: SortType[] = ['alpha', 'date', 'priority'];
  const [asc, desc]: SortOrder[] = ['asc', 'desc'];
  const isSortAsc = sortOrder === asc;

  // prettier-ignore
  const sortBy = (type: SortType) =>
    type ?
       `${location.pathname}?sort=${isSortAsc ? desc : asc}&type=${type}&${filter ? `filter=${filter}&` : ''}${query ? `query=${query}&` : ''}` :
       `${location.pathname}?${filter ? `filter=${filter}&` : ''}${query ? `query=${query}&` : ''}`;

  // prettier-ignore
  const sortOptions = sortTypes.map(type => {
    const sortHandler =
        type === 'date' ?
        () => navigate(sortBy('date')) :
        type === 'alpha' ?
        () => navigate(sortBy('alpha')) :
        () => navigate(sortBy('priority'));

    return (
      <button
        key={type}
        type={'button'}
        onClick={sortHandler}
        className="li-item flex items-center justify-between gap-8">
        <span className="flex items-center">
          {
            type === sortType ? 
            <ArrowIcon className={`${isSortAsc ? 'animate-arrow-up' : 'animate-arrow-down'}`} /> :
            'by'
          }
        </span>
        <span className="w-full text-start">{type}</span>
      </button>
    );
  });

  const sortingList = (
    <Card className="absolute top-full left-0 translate-y-2 py-4 ring-1 ring-color-base">
      <ul className="flex flex-col gap-4 text-center text-color-base">
        {sortOptions}
        <button type={'button'} onClick={() => navigate(sortBy(null))} className="li-item">
          <span>reset</span>
        </button>
      </ul>
    </Card>
  );

  return (
    <>
      {tasks.length > 0 || (filter === 'completed' && completedTasks.length > 0) ? (
        <div
          tabIndex={0}
          role={'button'}
          title="sort tasks"
          ref={sortRef as MutableRefObject<HTMLDivElement>}
          onKeyDown={e => {
            if (e.key === 'Enter') openSortMenu();
          }}
          className="flex-center absolute left-[2%] z-[15] cursor-pointer gap-2 rounded-md bg-color-card py-4 pl-3 text-xl text-color-base ring-1 ring-color-base hover:ring-color-highlight active:ring-color-highlight xs:left-[10%] lg:left-[18%]">
          <span>Sort</span>
          {sortOrder === asc ? (
            <ArrowIcon className={'animate-arrow-up'} />
          ) : sortOrder === desc ? (
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
