import { useAppSelector, useAppDispatch } from '@app/hooks';

import { TaskList } from '@tasks/list-all-tasks';
import { SortField } from '@tasks/task-sort-menu';
import { SearchBar } from '@tasks/task-search-bar';
import { TodoTaskList } from '@tasks/list-all-todo';
import { CompletedTaskList } from '@tasks/list-all-completed';
import { DisplayTaskPanels } from '@tasks/display-task-panels';
import { InProgressTaskList } from '@tasks/list-all-inprogress';

import { Button } from '@ui/button';
import { BackArrowIcon } from 'assets/icons';
import { setTaskActivePanel, taskSelector } from '@features/slices/task';

export const TasksPage = () => {
  const dispatch = useAppDispatch();
  const { totalTasks, totalCompletedTasks, activeTaskPanel } =
    useAppSelector(taskSelector);

  let content = <TaskList />;

  if (totalTasks === 0 && totalCompletedTasks > 0) {
    content = (
      <div className="mt-8 flex flex-col items-center gap-4 text-3xl text-color-base">
        <h2>You don't have any active task</h2>
        <span>
          but you can review {totalCompletedTasks} completed task
          {totalCompletedTasks > 1 ? 's' : ''}
        </span>
        <Button
          onClick={() => dispatch(setTaskActivePanel('Completed'))}
          className="mt-8 h-24 w-24 !rounded-full hover:!ring hover:!ring-color-highlight active:translate-y-1"
          label="Here"
        />
      </div>
    );
  }

  if (activeTaskPanel === 'Todo') content = <TodoTaskList />;

  if (activeTaskPanel === 'InProgress') content = <InProgressTaskList />;

  if (activeTaskPanel === 'Completed') content = <CompletedTaskList />;

  return (
    <>
      <section className="lg:mx-auto lg:w-10/12" aria-label="Task-panel-section">
        <DisplayTaskPanels />
        <section className="flex flex-col">
          <div className="flex items-center" aria-label="search-sort-aria">
            <SortField />
            <SearchBar />
          </div>
          <p className="m-8 text-center text-2xl tracking-wide text-color-highlight">
            Viewing {activeTaskPanel ? activeTaskPanel : 'All'} Tasks
          </p>
          {activeTaskPanel !== '' ? (
            <Button
              label="Back"
              className="self-center"
              icon={<BackArrowIcon />}
              onClick={() => dispatch(setTaskActivePanel(''))}
            />
          ) : null}
        </section>
        <>{content}</>
      </section>
    </>
  );
};
