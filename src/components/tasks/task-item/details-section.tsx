import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Props = {
  taskDetails: string;
  isUpdating: boolean;
  isEditing: boolean;
  setUpdatedDetails: (arg: string) => void;
  setShowUpdateBtn: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const DetailsSection = ({
  taskDetails,
  isUpdating,
  isEditing,
  setIsEditing,
  setShowUpdateBtn,
  setUpdatedDetails,
}: Props) => {
  const onBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    if (taskDetails === e.target.textContent) {
      setShowUpdateBtn(false);
      setIsEditing(false);
      return;
    }
    setShowUpdateBtn(true);
    setUpdatedDetails(e.target.textContent as string);
  };
  const onInputHandler = () => setIsEditing(true);

  return (
    <section className="relative">
      <div
        className="relative break-words rounded-md p-4 text-2xl ring-1 ring-color-base"
        contentEditable
        suppressContentEditableWarning
        onInput={onInputHandler}
        onBlur={onBlurHandler}>
        {taskDetails}
      </div>
      {isUpdating ? (
        <p className={`text-green absolute left-0 -bottom-10 text-xl`}>updating . . .</p>
      ) : null}
      {isEditing && !isUpdating ? (
        <p className="text-amber absolute left-0 -bottom-10 text-xl tracking-wide">
          edited . . .
        </p>
      ) : null}
    </section>
  );
};
