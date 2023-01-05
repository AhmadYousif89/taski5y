import { TaskPanel, TaskPanelProps } from './task-panel';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { taskSelector, setTaskActivePanel } from 'features/slices/task';

export const DisplayTaskPanels = () => {
  const dispatch = useAppDispatch();
  const { totalTodoTasks, totalInProgressTasks, totalCompletedTasks } =
    useAppSelector(taskSelector);

  const panels: TaskPanelProps[] = [
    {
      id: 'p1',
      color: 'sky',
      title: 'Todo',
      count: totalTodoTasks,
      tooltip: 'show only new tasks',
      togglePanels: () => dispatch(setTaskActivePanel('Todo'))
    },
    {
      id: 'p2',
      color: 'amber',
      title: 'InProgress',
      count: totalInProgressTasks,
      tooltip: 'show only in progress tasks',
      togglePanels: () => dispatch(setTaskActivePanel('InProgress'))
    },
    {
      id: 'p3',
      color: 'green',
      title: 'Completed',
      count: totalCompletedTasks,
      tooltip: 'show only completed tasks',
      togglePanels: () => dispatch(setTaskActivePanel('Completed'))
    }
  ];

  return (
    <section className="my-16 flex items-center justify-evenly" aria-label="task-panels">
      {panels.map(panel => (
        <TaskPanel
          key={panel.id}
          color={panel.color}
          title={panel.title}
          count={panel.count}
          tooltip={panel.tooltip}
          togglePanels={panel.togglePanels}
        />
      ))}
    </section>
  );
};
