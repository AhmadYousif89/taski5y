import { useEffect } from 'react';
import { TaskFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type InputProps = TaskFormProps & { isFormSubmitted: boolean };

export const DetailsInput = ({ getValidity, getValue, isFormSubmitted }: InputProps) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput((text: string) => text.trim().length !== 0);

  useEffect(() => {
    getValidity({ type: 'details', isValid });
    getValue({ name: 'details', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <label className="relative">
      <textarea
        required
        rows={2}
        cols={5}
        name="description"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={
          isError ? 'Please enter some details about the task' : 'Write your task details'
        }
        className={`${
          isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full resize-none rounded-md bg-transparent px-6 py-4 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:text-color-base placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {isError ? <InputError msg="Required" className="mb-6" /> : null}
    </label>
  );
};
