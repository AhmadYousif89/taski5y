import { useEffect } from 'react';
import { GetTaskFormValues } from './types';
import { useFormInput } from 'hooks/use-form-input';

export const StatusInput = ({
  getValue,
  isFormSubmitted,
}: {
  getValue: GetTaskFormValues;
  isFormSubmitted: boolean;
}) => {
  const { inputValue, onInputChange, resetInput } = useFormInput();

  useEffect(() => {
    getValue({ name: 'status', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [inputValue, isFormSubmitted]);

  return (
    <>
      <legend className="bg-color-card text-xl">Status</legend>
      <label htmlFor="status">
        <select
          name="status"
          id="status-options"
          value={inputValue}
          onChange={onInputChange}
          className={`w-full cursor-pointer resize-none bg-color-card py-4 text-2xl capitalize focus:outline-none`}>
          <option value=""></option>
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
        </select>
      </label>
    </>
  );
};
