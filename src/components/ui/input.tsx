import {
  Ref,
  useState,
  useEffect,
  forwardRef,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';
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

const CustomInput = (props: InputProps, ref: Ref<HTMLInputElement>) => {
  const {
    id,
    type,
    name,
    label,
    getValue,
    className,
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
    case 'name':
      isValid = inputValue.trim().length > 0;
      break;
    case 'title':
      isValid = inputValue.trim().length > 0;
      break;
    case 'details':
      isValid = inputValue.trim().length > 0;
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

  const showVisualErr =
    validate && showInputErr && isError
      ? 'ring-color-invalid'
      : 'ring-color-base focus:valid:ring-color-valid';
  const inputPlaceHolder =
    validate && showInputErr && isError ? placeholderErrMsg : placeholder;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full items-center">
        {label ? (
          <label className="w-1/2 text-2xl" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          value={inputValue}
          onBlur={onInputBlur}
          required={isRequired}
          onChange={onInputChange}
          placeholder={inputPlaceHolder}
          className={`${showVisualErr} ${className} w-full rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:text-color-base placeholder:opacity-75 focus:outline-none focus:ring-2 focus:ring-color-validating`}
        />
      </div>
      {validate && showInputErr && isError ? (
        <InputError msg={inputErrMsg || ''} />
      ) : null}
    </div>
  );
};

export const Input = forwardRef(CustomInput);
