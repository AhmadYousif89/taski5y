import { useState, useEffect, ChangeEvent } from 'react';

import { InputError } from './input-error';
import { AuthInputNames } from 'components/auth/types';
import { TaskInputNames } from 'components/tasks/types';
import { GetInputValues, GetInputValidation } from './input';

type TextareaNames = AuthInputNames | TaskInputNames;

interface TextAreaProps {
  id?: TextareaNames;
  name: TextareaNames;
  value: string;
  label?: string;
  className?: string;
  placeholder?: string;
  inputErrMsg?: string;
  placeholderErrMsg?: string;
  validate?: boolean;
  isRequired?: boolean;
  showInputErr?: boolean;
  isFormSubmitted?: boolean;
  getValue: GetInputValues;
  getValidity?: GetInputValidation;
}

export const TextArea = (props: TextAreaProps) => {
  const {
    id,
    name,
    label,
    value,
    getValue,
    className,
    placeholder,
    inputErrMsg,
    getValidity,
    validate = true,
    placeholderErrMsg,
    isRequired = true,
    showInputErr = true,
    isFormSubmitted = false,
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

  useEffect(() => {
    getValidity && getValidity({ name, isValid });
    getValue({ name, value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isFormSubmitted, inputValue, isValid, getValidity, name, getValue]);

  const showVisualErr =
    validate && showInputErr && isError
      ? 'ring-color-invalid'
      : 'ring-color-base focus:valid:ring-color-valid';
  const inputPlaceHolder = validate && showInputErr && isError ? placeholderErrMsg : placeholder;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full items-center">
        {label ? (
          <label className="w-1/2 text-2xl" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <textarea
          id={id}
          cols={3}
          rows={3}
          name={name}
          value={value}
          onBlur={onInputBlur}
          required={isRequired}
          onChange={onInputChange}
          placeholder={inputPlaceHolder}
          className={`${showVisualErr} ${className} w-full resize-none rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:text-color-base placeholder:opacity-75 focus:outline-none focus:ring-2 focus:ring-color-validating`}
        />
      </div>
      {validate && showInputErr && isError ? <InputError msg={inputErrMsg || ''} /> : null}
    </div>
  );
};
