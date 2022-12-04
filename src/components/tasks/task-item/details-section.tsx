import { ChangeEvent } from 'react';

type Props = {
  taskDetails: string;
  isUpdating: boolean;
  isEditing: boolean;
  onInput: () => void;
  onBlur: (e: ChangeEvent<HTMLDivElement>) => void;
};

export const DetailsSection = ({
  taskDetails,
  isUpdating,
  isEditing,
  onBlur,
  onInput,
}: Props) => {
  return (
    <section className="relative">
      <div
        className="relative break-words rounded-md p-4 text-2xl ring-1 ring-color-base"
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        onBlur={onBlur}>
        {taskDetails}
      </div>
      {isUpdating ? (
        <p className={`text-green absolute left-0 -bottom-10 text-xl`}>updating . . .</p>
      ) : null}
      {isEditing ? (
        <p className="text-amber absolute left-0 -bottom-10 text-xl tracking-wide">
          edited . . .
        </p>
      ) : null}
    </section>
  );
};
