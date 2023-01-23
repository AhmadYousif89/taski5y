import { useNavigate } from 'react-router-dom';

import {
  TaskList,
  SortTasks,
  SearchTasks,
  TodoTaskList,
  CompletedTaskList,
  DisplayTaskPanels,
  InProgressTaskList
} from 'components/tasks';
import { path } from 'components/app';
import { Button } from 'components/ui';
import { useSearchParams } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

import { BackArrowIcon } from 'assets/icons';
import { toggleProfile, toggleSideMenu } from 'features/slices/ui';

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filter } = useSearchParams();
  const { totalTasks, totalCompletedTasks } = useAppSelector(taskSelector);

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
          onClick={() => navigate(`?filter=completed`)}
          className="mt-8 h-24 w-24 !rounded-full hover:!ring hover:!ring-color-highlight active:translate-y-1"
          label="Here"
        />
      </div>
    );
  }

  if (filter === 'todo') content = <TodoTaskList />;

  if (filter === 'in-progress') content = <InProgressTaskList />;

  if (filter === 'completed') content = <CompletedTaskList />;

  return (
    <>
      <section className="lg:mx-auto lg:w-10/12" aria-label="tasks-section">
        <DisplayTaskPanels />
        <section className="flex flex-col" aria-label="task-search-sort">
          <div className="flex-center relative my-8">
            <SortTasks />
            <SearchTasks />
            <Button
              onClick={() => {
                dispatch(toggleSideMenu());
                dispatch(toggleProfile(false));
              }}
              title="Add new task"
              className="absolute right-[2%] bg-color-card xs:right-[10%] lg:right-[20%]">
              <span className="px-3 text-3xl">+</span>
            </Button>
          </div>
          <p className="m-8 text-center text-2xl tracking-wide text-color-highlight">
            viewing {filter ? filter : 'All'} tasks
          </p>
          {filter !== null ? (
            <Button
              label="Back"
              className="self-center"
              icon={<BackArrowIcon />}
              onClick={() => navigate(`${path.dashboard}`)}
            />
          ) : null}
        </section>
        <>{content}</>
      </section>
    </>
  );
};
