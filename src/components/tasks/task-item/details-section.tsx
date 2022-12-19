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
    setUpdatedDetails(e.target.textContent as string);
  };
  const onInputHandler = (e: ChangeEvent<HTMLDivElement>) => {
    setIsEditing(true);
    if (taskDetails === e.target.textContent) {
      setShowUpdateBtn(false);
      setIsEditing(false);
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
        <p className={`text-green absolute left-0 -bottom-12 text-xl uppercase`}>
          updating
        </p>
      ) : null}
      {true ? (
        <p className="text-amber absolute left-0 -bottom-12 text-xl uppercase tracking-wide">
          edited
        </p>
      ) : null}
    </section>
  );
};
