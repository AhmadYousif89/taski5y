import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { Filter, useSearchParams } from 'hooks';
import { taskSelector } from 'features/slices/task';

type TaskPanelProps = {
  id?: string;
  title: Filter;
  count: number;
  tooltip: string;
  className?: string;
  togglePanels: () => void;
};

export const DisplayTaskPanels = () => {
  const navigate = useNavigate();
  const { totalTodoTasks, totalInProgressTasks, totalCompletedTasks } =
    useAppSelector(taskSelector);
  const { sort, type, query } = useSearchParams();

  const URL = (filter: Filter) =>
    filter
      ? `?filter=${filter}&${sort && type ? `sort=${sort}&type=${type}&` : ''}${
          query ? `query=${query}` : ''
        }`
      : '';

  const panels: TaskPanelProps[] = [
    {
      id: 'p1',
      title: 'todo',
      count: totalTodoTasks,
      tooltip: 'show only new tasks',
      togglePanels: () => navigate(URL('todo'))
    },
    {
      id: 'p2',
      title: 'in-progress',
      count: totalInProgressTasks,
      tooltip: 'show only in progress tasks',
      togglePanels: () => navigate(URL('in-progress'))
    },
    {
      id: 'p3',
      title: 'completed',
      count: totalCompletedTasks,
      tooltip: 'show only completed tasks',
      togglePanels: () => navigate(URL('completed'))
    }
  ];

  return (
    <section className="my-16 flex items-center justify-evenly" aria-label="task-panels">
      {panels.map(panel => (
        <TaskPanel
          key={panel.id}
          title={panel.title}
          count={panel.count}
          tooltip={panel.tooltip}
          togglePanels={panel.togglePanels}
        />
      ))}
    </section>
  );
};

const TaskPanel: FC<TaskPanelProps> = ({ title, count, tooltip, togglePanels }) => {
  const { filter } = useSearchParams();

  const borderColor =
    title === 'todo'
      ? 'border-sky'
      : title === 'in-progress'
      ? 'border-amber'
      : title === 'completed'
      ? 'border-green'
      : '';
  const textColor =
    title === 'todo'
      ? 'text-sky-500'
      : title === 'in-progress'
      ? 'text-amber-500'
      : title === 'completed'
      ? 'text-green-500'
      : '';

  return (
    <button
      className={`${
        filter === title ? textColor : ''
      } flex h-full w-full cursor-default flex-col items-center gap-8 rounded-sm bg-transparent text-color-base transition-colors `}>
      <div
        title={tooltip}
        onClick={() => togglePanels()}
        className={`relative ${borderColor} h-28 w-28 cursor-pointer rounded-full border-[5px] bg-transparent shadow-md md:h-32 md:w-32 lg:h-44 lg:w-44`}>
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold md:text-4xl`}>
          {count}
        </span>
      </div>
      <p className={`rounded-md p-3 text-2xl capitalize tracking-wide md:text-4xl`}>{title}</p>
    </button>
  );
};
