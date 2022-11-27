import { useEffect } from 'react';
import { AuthFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type Props = AuthFormProps & {
  label?: string;
  msg?: string;
  holder?: string;
  isRequired?: boolean;
  validate?: boolean;
  isFormSubmitted?: boolean;
};

export const EmailInput = ({
  getValidity,
  getValue,
  label,
  msg,
  holder,
  validate = true,
  isRequired = true,
  isFormSubmitted,
}: Props) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput((text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));

  useEffect(() => {
    getValidity({ type: 'email', isValid });
    getValue({ name: 'email', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <div className="relative flex w-full items-center">
      {label ? (
        <label className="w-1/2 text-2xl" htmlFor="email">
          {label}
        </label>
      ) : null}
      <input
        required={isRequired}
        id="email"
        type="email"
        name="email"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={
          validate && isError
            ? `${msg ? msg : 'Please enter a valid email'}`
            : `${holder ? holder : 'example@gmail.com'}`
        }
        className={`${
          validate && isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {validate && isError ? <InputError msg="email is invalid" /> : null}
    </div>
  );
};
