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
    <section className="my-16 flex justify-between" aria-label="task-panels">
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
      ? 'border-sky-500'
      : title === 'in-progress'
      ? 'border-amber-500'
      : title === 'completed'
      ? 'border-green-500'
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
      aria-pressed
      className={`${
        filter === title ? textColor : ''
      } group flex h-full w-full cursor-default flex-col items-center gap-8 rounded-sm text-color-base transition-colors`}>
      <div
        title={tooltip}
        onClick={() => {
          togglePanels();
        }}
        className={`relative ${borderColor} h-28 w-28 cursor-pointer rounded-full border-4 shadow-md xs:h-32 xs:w-32 md:h-44 md:w-44`}>
        <span className="center-absolute text-2xl xs:text-4xl">{count}</span>
      </div>
      <p className="text-xl capitalize xs:text-3xl">{title}</p>
    </button>
  );
};
