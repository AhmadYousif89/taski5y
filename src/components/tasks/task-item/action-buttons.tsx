import { TaskButton } from '@tasks/task-button';
import { SpinnerIcon } from 'assets/icons';

type Props = {
  isUpdating: boolean;
  showUpdateBtn: boolean;
  onTaskComplete: () => void;
  onUpdateTask: () => void;
};

export const ActionButtons = ({
  isUpdating,
  showUpdateBtn,
  onTaskComplete,
  onUpdateTask,
}: Props) => {
  return (
    <div aria-label="action-buttons" className="flex items-center gap-4">
      {showUpdateBtn ? (
        <TaskButton onClick={onUpdateTask}>
          {isUpdating ? <SpinnerIcon className="h-7 w-7" /> : 'save'}
        </TaskButton>
      ) : null}
      <TaskButton onClick={onTaskComplete} title={'mark complete'} />
    </div>
  );
};
