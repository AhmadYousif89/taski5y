import { useEffect } from 'react';
import { GetTaskFormValues } from './types';
import { useFormInput } from 'hooks/use-form-input';

export const PriorityInput = ({
  getValue,
  isFormSubmitted,
}: {
  getValue: GetTaskFormValues;
  isFormSubmitted: boolean;
}) => {
  const { inputValue, onInputChange, resetInput } = useFormInput();

  useEffect(() => {
    getValue({ name: 'priority', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [inputValue, isFormSubmitted]);

  return (
    <>
      <legend className="bg-color-card text-xl">Priority</legend>
      <label htmlFor="priority">
        <select
          name="priority"
          id="priority-options"
          value={inputValue}
          onChange={onInputChange}
          className="w-full cursor-pointer resize-none bg-color-card py-4 text-2xl capitalize focus:outline-none">
          <option value=""></option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>
    </>
  );
};
