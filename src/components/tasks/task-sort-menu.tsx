import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Card } from '../ui/card';
import { useAppSelector } from '@app/hooks';
import { SortIcon, ArrowIcon } from 'assets/icons';
import { useClickOutside } from 'hooks/use-click-outside';
import { taskSelector } from '@features/slices/task';
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

  const sortList = (
    <Card className="absolute top-full left-5 translate-y-1">
      <ul className="flex flex-col gap-6 text-center capitalize text-color-base">
        <li
          onClick={sortByAlphabetHandler}
          className="grid grid-cols-[6rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span className="flex items-center">
            {sortType === 'alpha' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'alpha' ? sortOrder : 'sort by'}
          </span>
          <span>alphabet</span>
        </li>
        <li
          onClick={sortByDateHandler}
          className="grid grid-cols-[6rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight ">
          <span className="flex items-center">
            {sortType === 'createdAt' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'createdAt' ? sortOrder : 'sort by'}
          </span>
          <span>date</span>
        </li>
        <li
          onClick={sortByPriorityHandler}
          className="grid grid-cols-[6rem,auto] items-center gap-2 rounded-sm p-2 ring-color-base hover:ring-2 hover:ring-color-highlight ">
          <span className="flex items-center">
            {sortType === 'priority' ? (
              <ArrowIcon
                className={`${
                  isSortAsc ? 'rotate-0' : 'rotate-180'
                } transition-all duration-300`}
              />
            ) : null}
            {sortType === 'priority' ? sortOrder : 'sort by'}
          </span>
          <span>priority</span>
        </li>
        <li
          onClick={unsortHandler}
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
          className="absolute z-10 flex h-14 w-14 translate-x-10 cursor-pointer items-center justify-center gap-4 rounded-full text-2xl text-color-base transition-all hover:ring-2 hover:ring-color-highlight active:ring-color-highlight">
          <SortIcon />
          {toggleMenu && <>{sortList}</>}
        </div>
      ) : null}
    </>
  );
};
