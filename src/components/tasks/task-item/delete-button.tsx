import { TrashIcon } from 'assets/icons';

type Props = { onDelete: () => void };

export const DeleteButton = ({ onDelete }: Props) => {
  return (
    <button
      title="delete task"
      className="absolute top-10 right-8 cursor-pointer"
      onClick={onDelete}>
      <TrashIcon className="transition-colors hover:fill-rose-600" />
    </button>
  );
};
