import { ChangeEvent, FC } from 'react';
import { useTaskItem } from './context';

export const DetailsSection: FC<{ taskDetails: string }> = ({ taskDetails }) => {
  const {
    state: { isUpdating, isEditing },
    setTaskIsEditing,
    setTaskUpdateBtn,
    updateTaskDetails
  } = useTaskItem();

  const onBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    updateTaskDetails(e.target.textContent as string);
  };
  const onInputHandler = (e: ChangeEvent<HTMLDivElement>) => {
    setTaskIsEditing(true);
    if (taskDetails === e.target.textContent) {
      setTaskUpdateBtn(false);
      setTaskIsEditing(false);
    }
  };

  return (
    <section className="relative">
      <span className="absolute top-4 left-4 z-10 cursor-default text-3xl text-color-highlight opacity-60">
        #
      </span>
      <div
        className="relative break-words rounded-md px-12 py-4 text-2xl ring-1 ring-color-base"
        contentEditable
        suppressContentEditableWarning
        onInput={onInputHandler}
        onBlur={onBlurHandler}>
        {taskDetails}
      </div>
      {isUpdating ? (
        <p className={`text-green absolute left-0 -bottom-12 text-xl uppercase`}>updating</p>
      ) : null}
      {isEditing && !isUpdating ? (
        <p className="text-amber absolute left-0 -bottom-12 text-xl uppercase tracking-wide">
          edited
        </p>
      ) : null}
    </section>
  );
};
