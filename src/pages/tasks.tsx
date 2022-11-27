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

export const TasksPage = () => {
  const {
    tasks,
    totalTodoTasks: numOfNewTasks,
    totalInProgressTasks: numOfInProgressTasks,
    totalCompletedTasks: numOfCompletedTasks,
  } = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<TaskStatus | boolean>(false);
  const [showTodoTasks, setShowTodoTasks] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showInProgressTasks, setShowInProgressTasks] = useState(false);

  let mainContent;

  mainContent = <TaskList />;

  if (tasks.length === 0 && numOfCompletedTasks > 0) {
    mainContent = (
      <div className="mt-16 flex flex-col items-center gap-4 text-3xl text-color-base">
        <h2 className="text-center text-4xl">You don't have any active task</h2>
        <span className="text-center">
          but you can review {numOfCompletedTasks} completed task
          {numOfCompletedTasks > 1 ? 's' : ''}
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
      <div className="mt-12">
        <TaskPanelButton
          toggleTaskPanels={setShowTodoTasks}
          toggleIsActive={setIsActive}
        />
        {tasks.filter(t => t.status === 'Todo').length > 0 ? (
          <TaskList filterBy={'Todo'} />
        ) : (
          <h2 className="mt-24 text-center text-4xl text-color-base">
            You have 0 todo task
          </h2>
        )}
      </div>
    );
  }
  if (showInProgressTasks) {
    mainContent = (
      <div className="mt-12">
        <TaskPanelButton
          toggleTaskPanels={setShowInProgressTasks}
          toggleIsActive={setIsActive}
        />
        {tasks.filter(t => t.status === 'InProgress').length > 0 ? (
          <TaskList filterBy={'InProgress'} />
        ) : (
          <h2 className="mt-24 text-center text-4xl text-color-base">
            You have 0 in progress task
          </h2>
        )}
      </div>
    );
  }
  if (showCompletedTasks) {
    mainContent = (
      <div className="mt-12">
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
      count: numOfNewTasks,
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
      count: numOfInProgressTasks,
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
      count: numOfCompletedTasks,
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
      <section className="lg:mx-auto lg:w-10/12" aria-label="Task-aria">
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
        <section
          className="relative flex items-center justify-center"
          aria-label="search-sort-aria">
          <SortField />
          <SearchBar />
        </section>
        <>{mainContent}</>
      </section>
    </>
  );
};
