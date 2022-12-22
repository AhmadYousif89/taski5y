import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';

import { Card } from '../ui/card';
import { ArrowIcon, SortIcon } from 'assets/icons';
import { taskSelector } from '@features/slices/task';
import { useClickOutside } from 'hooks/use-click-outside';
import { TaskSortOrder, TaskSortType } from '@features/types';

export const SortField = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks } = useAppSelector(taskSelector);

  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openSortMenuHandler = () => {
    setToggleMenu(true);
  };
  const closeSortMenuHandler = () => {
    setToggleMenu(false);
  };
  useClickOutside(sortMenuRef, closeSortMenuHandler);

  const params = new URLSearchParams(location.search);
  const sortOrder = params.get('sort') as TaskSortOrder;
  const sortType = params.get('type') as TaskSortType;
  const isSortAsc = sortOrder === 'asc';

  const sortByAlphabetHandler = () => {
    navigate(`/tasks?sort=${isSortAsc ? 'desc' : 'asc'}&type=alpha`);
  };
  const sortByDateHandler = () => {
    navigate(`/tasks?sort=${isSortAsc ? 'desc' : 'asc'}&type=createdAt`);
  };
  const sortByPriorityHandler = () => {
    navigate(`/tasks?sort=${isSortAsc ? 'desc' : 'asc'}&type=priority`);
  };
  const unsortHandler = () => {
    navigate(`/tasks?`);
  };

  const isTouchDevice = 'ontouchstart' in document.documentElement;

  const sortList = (
    <Card className="absolute top-full left-0 z-10 translate-y-2">
      <ul className="flex flex-col gap-6 text-center capitalize text-color-base">
        <li
          onClick={() => {
            if (!isTouchDevice) sortByAlphabetHandler();
          }}
          onTouchStart={() => {
            if (isTouchDevice) sortByAlphabetHandler();
          }}
          className="grid grid-cols-[5rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span className="flex items-center">
            {sortType === 'alpha' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'alpha' ? sortOrder : 'by'}
          </span>
          <span>alphabet</span>
        </li>
        <li
          onClick={() => {
            if (!isTouchDevice) sortByDateHandler();
          }}
          onTouchStart={() => {
            if (isTouchDevice) sortByDateHandler();
          }}
          className="grid grid-cols-[5rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight ">
          <span className="flex items-center">
            {sortType === 'createdAt' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'createdAt' ? sortOrder : 'by'}
          </span>
          <span>date</span>
        </li>
        <li
          onClick={() => {
            if (!isTouchDevice) sortByPriorityHandler();
          }}
          onTouchStart={() => {
            if (isTouchDevice) sortByPriorityHandler();
          }}
          className="grid grid-cols-[5rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight ">
          <span className="flex items-center">
            {sortType === 'priority' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'priority' ? sortOrder : 'by'}
          </span>
          <span>priority</span>
        </li>
        <li
          onClick={() => {
            if (!isTouchDevice) unsortHandler();
          }}
          onTouchStart={() => {
            if (isTouchDevice) unsortHandler();
          }}
          className="rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span>unsort</span>
        </li>
      </ul>
    </Card>
  );

  return (
    <>
      {tasks.length > 0 ? (
        <div
          ref={sortMenuRef}
          title="sort tasks"
          onClick={openSortMenuHandler}
          className="flex-center absolute left-5 cursor-pointer rounded-md bg-color-card py-5 pl-4 pr-1 text-xl text-color-base ring-2 ring-color-base transition-all active:ring-color-highlight xs:left-[10%] lg:left-[20%]">
          Sort <SortIcon />
          {toggleMenu && <>{sortList}</>}
        </div>
      ) : null}
    </>
  );
};
