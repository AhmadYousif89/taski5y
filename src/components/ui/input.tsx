import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import { InputError } from '@ui/input-error';
import { AuthInputNames } from '@auth/types';
import { TaskInputNames } from '@tasks/types';

type InputNames = AuthInputNames | TaskInputNames;
type InputValidator = (arg: string) => boolean;
type InputValidation = { name: InputNames; isValid: boolean };
export type InputPropObj = { name: InputNames; value: string };
export type GetInputValidation = ({ name, isValid }: InputValidation) => void;
export type GetInputValues = ({ name, value }: InputPropObj) => void;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: InputNames;
  name: InputNames;
  label?: string;
  inputErrMsg?: string;
  placeholderErrMsg?: string;
  validate?: boolean;
  isRequired?: boolean;
  showInputErr?: boolean;
  isFormSubmitted?: boolean;
  inputValidator?: InputValidator;
  getValue: GetInputValues;
  getValidity?: GetInputValidation;
}

export const Input = (props: InputProps) => {
  const {
    id,
    type,
    name,
    label,
    className,
    getValue,
    placeholder,
    inputErrMsg,
    getValidity,
    inputValidator,
    validate = true,
    placeholderErrMsg,
    isRequired = true,
    showInputErr = true,
    isFormSubmitted = false,
  } = props;

  const [inputValue, setInputValue] = useState<InputNames | string>('');
  const [isTouched, setIsTouched] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setInputValue(e.target.value);
  };

  const onInputBlur = () => setIsTouched(true);

  const resetInput = () => {
    setInputValue('');
    setIsTouched(false);
  };

  let isValid = false;
  const PASSWORD_REGEX = /^((?!.*[\s])(?=.*\d).{3,})/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  switch (name) {
    case 'email':
      isValid = EMAIL_REGEX.test(inputValue);
      break;
    case 'password':
      isValid = PASSWORD_REGEX.test(inputValue);
      break;
    default:
      isValid = inputValidator ? inputValidator(inputValue) : true;
  }

  const isError = !isValid && isTouched;

  useEffect(() => {
    getValidity && getValidity({ name, isValid });
    getValue({ name, value: inputValue.trim() });
    if (isFormSubmitted) resetInput();
  }, [isFormSubmitted, inputValue, isValid]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center">
        {label ? (
          <label className="w-1/2 text-2xl" htmlFor="email">
            {label}
          </label>
        ) : null}
        <input
          id={id}
          name={name}
          type={type}
          value={inputValue}
          onBlur={onInputBlur}
          required={isRequired}
          onChange={onInputChange}
          placeholder={
            validate && showInputErr && isError ? placeholderErrMsg : placeholder
          }
          className={`${
            validate && showInputErr && isError ? 'ring-color-invalid' : 'ring-color-base'
          } ${className} w-full rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
        />
      </div>
      {validate && showInputErr && isError ? (
        <InputError msg={inputErrMsg || ''} />
      ) : null}
    </div>
  );
};
