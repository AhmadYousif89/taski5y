import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

export const TaskStats = () => {
  const { totalTasks } = useAppSelector(taskSelector);

  return (
    <div className="mt-8 mb-12 flex flex-col gap-4 text-center text-color-base">
      <h3 className="text-4xl capitalize">
        you have {totalTasks} active task
        {+totalTasks > 1 ? 's' : ''}
      </h3>
      {totalTasks === 0 ? (
        <span className="text-2xl">Start creating new tasks using the form below</span>
      ) : (
        ''
      )}
    </div>
  );
};
