import { useState, useEffect, ChangeEvent } from 'react';

import { InputError } from './input-error';
import { AuthInputNames } from 'components/auth/types';
import { TaskInputNames } from 'components/tasks/types';
import { GetInputValues, GetInputValidation } from './input';

type TextareaNames = AuthInputNames | TaskInputNames;

interface TextAreaProps {
  name: TextareaNames;
  value: string;
  inputErrMsg?: string;
  className?: string;
  placeholder?: string;
  placeholderErrMsg?: string;
  isFormSubmitted?: boolean;
  getValue: GetInputValues;
  getValidity?: GetInputValidation;
}

export const TextArea = (props: TextAreaProps) => {
  const {
    name,
    value,
    getValue,
    className,
    inputErrMsg,
    placeholder,
    placeholderErrMsg,
    getValidity,
    isFormSubmitted = false
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);
  const [isTouched, setIsTouched] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsTouched(true);
    setInputValue(e.target.value);
  };

  const onInputBlur = () => setIsTouched(true);

  const resetInput = () => {
    setInputValue('');
    setIsTouched(false);
  };

  const isValid = inputValue.trim().length > 0;

  const isError = !isValid && isTouched;

  const showVisualErr = isError
    ? 'ring-color-invalid'
    : 'ring-color-base focus:valid:ring-color-valid';

  useEffect(() => {
    getValidity && getValidity({ name, isValid });
    getValue({ name, value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isFormSubmitted, inputValue, isValid, getValidity, name, getValue]);

  return (
    <div className="flex w-full flex-col items-center">
      <textarea
        cols={3}
        rows={3}
        required
        name={name}
        value={value}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={isError ? placeholderErrMsg : placeholder}
        className={`${showVisualErr} ${className} w-full resize-none rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md outline-none ring-1 placeholder:text-xl placeholder:text-color-base placeholder:opacity-75 focus:ring-2 focus:ring-color-validating`}
      />
      {isError ? <InputError msg={inputErrMsg || ''} /> : null}
    </div>
  );
};
