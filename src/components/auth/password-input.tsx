import { useEffect } from 'react';
import { AuthFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type Props = AuthFormProps & {
  label?: string;
  msg?: string;
  validate?: boolean;
  isRequired?: boolean;
  isFormSubmitted?: boolean;
};

export const PasswordInput = ({
  getValidity,
  getValue,
  label,
  msg,
  validate = true,
  isRequired = true,
  isFormSubmitted,
}: Props) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput((text: string) => /^((?!.*[\s])(?=.*\d).{3,})/.test(text));

  useEffect(() => {
    getValidity({ type: 'password', isValid });
    getValue({ name: 'password', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <div className="relative flex w-full items-center">
      {label ? (
        <label className="w-1/2 text-2xl" htmlFor="password">
          {label}
        </label>
      ) : null}
      <input
        required={isRequired}
        id="password"
        type="password"
        name="password"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={
          validate && isError ? 'Password is required' : `${msg ? msg : 'Enter password'}`
        }
        className={`${
          validate && isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full rounded-md bg-transparent px-6 py-3 text-2xl shadow-md ring-1 placeholder:text-xl placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {validate && isError ? <InputError msg="required 3 characters at least" /> : null}
    </div>
  );
};
