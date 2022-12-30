import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  TaskList,
  SortTasks,
  SearchTasks,
  TodoTaskList,
  CompletedTaskList,
  DisplayTaskPanels,
  InProgressTaskList,
} from 'components/tasks';
import { Button } from 'components/ui';
import { BackArrowIcon } from 'assets/icons';
import { taskSelector, setTaskActivePanel } from 'features/slices/task';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { totalTasks, totalCompletedTasks, activeTaskPanel } = useAppSelector(taskSelector);

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
      <section className="lg:mx-auto lg:w-10/12" aria-label="tasks-section">
        <DisplayTaskPanels />
        <section className="flex flex-col" aria-label="task-search-sort">
          <div className="flex-center relative gap-4">
            <SortTasks />
            <SearchTasks />
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
