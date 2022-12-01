import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';

import { TaskList } from '@tasks/task-list';
import { SortField } from '@tasks/sort-tasks';
import { SearchBar } from '@tasks/search-tasks';
import { CompletedTaskList } from '@tasks/completed-task-list';

import { TaskPanel } from '@tasks/task-panel';
import { TaskPanelButton } from '@tasks/task-panel-button';

import { TaskStatus } from '@features/types';
import { storeTaskActivePanel, taskSelector } from '@features/slices/task';
import { TodoTaskList } from '@tasks/todo-task-list';
import { InProgressTaskList } from '@tasks/inprogress-task-list';

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const {
    totalTasks,
    totalTodoTasks,
    totalInProgressTasks,
    totalCompletedTasks,
    activeTaskPanel,
  } = useAppSelector(taskSelector);
  const [showTodoTasks, setShowTodoTasks] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showInProgressTasks, setShowInProgressTasks] = useState(false);
  const [isActive, setIsActive] = useState<TaskStatus | boolean>(false);

  let mainContent;
  mainContent = <TaskList />;

  if (totalTasks === 0 && totalCompletedTasks > 0) {
    mainContent = (
      <div className="mt-16 flex flex-col items-center gap-4 text-3xl text-color-base">
        <h2 className="text-center text-4xl">You don't have any active task</h2>
        <span className="text-center">
          but you can review {totalCompletedTasks} completed task
          {totalCompletedTasks > 1 ? 's' : ''}
        </span>
        <button
          onClick={() => setShowCompletedTasks(true)}
          className="mt-8 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full ring ring-color-highlight transition-all duration-200 hover:ring-color-base">
          Here
        </button>
      </div>
    );
  }

  if (showTodoTasks) {
    mainContent = (
      <div className="mt-4">
        <TaskPanelButton
          toggleTaskPanels={setShowTodoTasks}
          toggleIsActive={setIsActive}
        />
        <TodoTaskList />
      </div>
    );
  }
  if (showInProgressTasks) {
    mainContent = (
      <div className="mt-4">
        <TaskPanelButton
          toggleTaskPanels={setShowInProgressTasks}
          toggleIsActive={setIsActive}
        />
        <InProgressTaskList />
      </div>
    );
  }
  if (showCompletedTasks) {
    mainContent = (
      <div className="mt-4">
        <TaskPanelButton
          toggleTaskPanels={setShowCompletedTasks}
          toggleIsActive={setIsActive}
        />
        <CompletedTaskList />
      </div>
    );
  }

  const panels = [
    {
      id: 'p1',
      title: 'todo',
      color: 'sky',
      count: totalTodoTasks,
      msg: 'show only new tasks',
      showFilteredTasks: setShowTodoTasks,
      togglePanels: () => {
        setIsActive('Todo');
        dispatch(storeTaskActivePanel('Todo'));
        setShowCompletedTasks(false);
        setShowInProgressTasks(false);
      },
    },
    {
      id: 'p2',
      title: 'in progress',
      color: 'amber',
      count: totalInProgressTasks,
      msg: 'show only in progress tasks',
      showFilteredTasks: setShowInProgressTasks,
      togglePanels: () => {
        setIsActive('InProgress');
        dispatch(storeTaskActivePanel('InProgress'));
        setShowTodoTasks(false);
        setShowCompletedTasks(false);
      },
    },
    {
      id: 'p3',
      title: 'completed',
      color: 'green',
      count: totalCompletedTasks,
      msg: 'show only completed tasks',
      showFilteredTasks: setShowCompletedTasks,
      togglePanels: () => {
        setIsActive('Completed');
        dispatch(storeTaskActivePanel('Completed'));
        setShowTodoTasks(false);
        setShowInProgressTasks(false);
      },
    },
  ];

  return (
    <>
      <section className="lg:mx-auto lg:w-10/12" aria-label="Task-panel-section">
        <div className="my-16 flex items-center justify-evenly" aria-label="Task-panels">
          {panels.map(panel => (
            <TaskPanel
              key={panel.id}
              isActive={isActive === panel.title}
              color={panel.color}
              title={panel.title}
              count={panel.count}
              tooltip={panel.msg}
              togglePanels={panel.togglePanels}
              showFilteredTasks={panel.showFilteredTasks}
            />
          ))}
        </div>
        <section className="flex flex-col" aria-label="search-sort-aria">
          <div className="flex items-center">
            <SortField />
            <SearchBar />
          </div>
          <p className="mb-4 mt-8 text-center text-2xl tracking-wide text-color-highlight">
            Viewing {activeTaskPanel ? activeTaskPanel : 'All'} Tasks
          </p>
        </section>
        <>{mainContent}</>
      </section>
    </>
  );
};
