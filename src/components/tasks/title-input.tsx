import { useEffect } from 'react';
import { TaskFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type InputProps = TaskFormProps & { isFormSubmitted: boolean };

export const TitleInput = ({ getValidity, getValue, isFormSubmitted }: InputProps) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput((text: string) => text.trim().length !== 0);

  useEffect(() => {
    getValidity({ type: 'title', isValid });
    getValue({ name: 'title', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <label className="relative">
      <input
        required
        id="title"
        type="text"
        name="title"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={isError ? 'Please enter some title' : 'Task title'}
        className={`${
          isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full rounded-md bg-transparent px-6 py-4 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:text-color-base placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {isError ? <InputError msg="Required" /> : null}
    </label>
  );
};
