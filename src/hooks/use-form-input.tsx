import { ChangeEvent, useState } from 'react';
import { TaskStatus, TaskPriority } from '@features/types';

type InputEvent = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type InputValue = TaskPriority | TaskStatus | string;

export const useFormInput = (validator?: (arg: string) => boolean) => {
  const [inputValue, setInputValue] = useState<InputValue>('');
  const [isTouched, setIsTouched] = useState(false);

  const onInputChange = (e: ChangeEvent<InputEvent>) => {
    setIsTouched(true);
    setInputValue(e.target.value);
  };

  const onInputBlur = () => setIsTouched(true);

  const resetInput = () => {
    setInputValue('');
    setIsTouched(false);
  };

  const isValid = validator ? validator(inputValue) : true;
  const isError = !isValid && isTouched;

  return {
    inputValue,
    isValid,
    isError,
    isTouched,
    resetInput,
    onInputBlur,
    onInputChange,
  };
};
