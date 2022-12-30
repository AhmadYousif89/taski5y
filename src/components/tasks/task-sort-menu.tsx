import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { path } from 'components/app';
import { Card } from 'components/ui';
import { ArrowIcon, SortIcon } from 'assets/icons';

import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';
import { TaskSortOrder, TaskSortType } from 'features/types';

import { useClickOutside } from 'hooks/use-click-outside';

export const SortTasks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks } = useAppSelector(taskSelector);

  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openSortMenuHandler = () => setToggleMenu(true);
  const closeSortMenuHandler = () => setToggleMenu(false);

  useClickOutside(sortMenuRef, closeSortMenuHandler);

  const params = new URLSearchParams(location.search);
  const sortOrder = params.get('sort') as TaskSortOrder;
  const sortType = params.get('type') as TaskSortType;
  const isSortAsc = sortOrder === 'asc';

  const sortByAlphabetHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=alpha`);

  const sortByDateHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=createdAt`);

  const sortByPriorityHandler = () =>
    navigate(`${path.dashboard}?sort=${isSortAsc ? 'desc' : 'asc'}&type=priority`);

  const unsortHandler = () => navigate(`${path.dashboard}?`);

  const sortList = (
    <Card className="absolute top-full left-0 translate-y-2 ring-1 ring-color-base">
      <div className="flex flex-col gap-6 py-2 text-center capitalize text-color-base">
        <button
          type={'button'}
          onClick={() => sortByAlphabetHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {sortType === 'alpha' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {sortType === 'alpha' ? sortOrder : 'by'}
          </span>
          <span>alphabet</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByDateHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {sortType === 'createdAt' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {sortType === 'createdAt' ? sortOrder : 'by'}
          </span>
          <span>date</span>
        </button>
        <button
          type={'button'}
          onClick={() => sortByPriorityHandler()}
          className="li-item grid grid-cols-[5rem,auto] items-center gap-2">
          <span className="flex items-center">
            {sortType === 'priority' ? (
              <ArrowIcon
                className={`${isSortAsc ? 'rotate-0' : 'rotate-180'} transition-all duration-300`}
              />
            ) : null}
            {sortType === 'priority' ? sortOrder : 'by'}
          </span>
          <span>priority</span>
        </button>

        <button type={'button'} onClick={() => unsortHandler()} className="li-item !py-2">
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
          ref={sortMenuRef}
          onKeyDown={e => {
            if (e.key === 'Enter') openSortMenuHandler();
          }}
          onClick={openSortMenuHandler}
          className="flex-center absolute left-[3%] z-[15] cursor-pointer rounded-md bg-color-card py-5 pl-4 pr-1 text-xl text-color-base ring-2 ring-color-base active:ring-color-highlight xs:left-[10%] lg:left-[20%]">
          <span>Sort</span> <SortIcon />
          {toggleMenu && <>{sortList}</>}
        </div>
      ) : null}
    </>
  );
};
