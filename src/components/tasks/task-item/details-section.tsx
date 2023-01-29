import { FC, ChangeEvent, useEffect, useId } from 'react';
import { useTaskItem } from './context';

type Props = { taskDetails: string; isExpired: boolean };
export const DetailsSection: FC<Props> = ({ taskDetails, isExpired }) => {
  const inputId = useId();
  const {
    state: { updatedDetails, isError, isUpdating, isEditing },
    setTaskHasError,
    setTaskIsEditing,
    setTaskUpdateBtn,
    setTaskUpdatedDetails
  } = useTaskItem();

  const isEqualString = (oldText: string, newText: string) => (oldText === newText ? true : false);

  const onUpdate = (text: string) => {
    setTaskHasError(false);
    setTaskIsEditing(true);
    setTaskUpdateBtn(true);
    setTaskUpdatedDetails(text);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
    if (isEqualString(taskDetails, e.target.value)) {
      setTaskUpdateBtn(false);
      setTaskIsEditing(false);
    }
  };

  useEffect(() => {
    setTaskUpdatedDetails(taskDetails);
  }, [setTaskUpdatedDetails, taskDetails]);

  const textColor = isError ? 'text-red-500' : isEditing ? 'text-amber-500' : 'text-green-500';
  const showMessage = isError ? 'this can not be empty' : isEditing ? 'editing' : 'updating';

  return (
    <section className="relative mb-6">
      <label
        htmlFor={`${inputId}task-details`}
        className="relative flex cursor-default items-center gap-4">
        <span className="absolute left-0 px-2 text-2xl text-color-highlight opacity-80">#</span>
        <input
          type={'text'}
          id={`${inputId}task-details`}
          disabled={isExpired}
          value={updatedDetails}
          onChange={onChangeHandler}
          placeholder="What's in your mind ?"
          className="w-full rounded-md bg-transparent px-8 py-4 text-xl outline-none ring-1 ring-color-base focus:ring-color-highlight"
        />
      </label>
      {isError || isUpdating || isEditing ? (
        <p className={`absolute top-16 left-0 text-lg uppercase tracking-wide ${textColor}`}>
          {showMessage}
        </p>
      ) : null}
    </section>
  );
};
