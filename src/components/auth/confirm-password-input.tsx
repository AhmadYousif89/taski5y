import { useEffect } from 'react';
import { AuthFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type Props = AuthFormProps & {
  label?: string;
  validate?: boolean;
  isRequired?: boolean;
  showError?: boolean;
  isFormSubmitted?: boolean;
};

export const ConfirmPasswordInput = ({
  getValidity,
  getValue,
  label,
  validate,
  showError = true,
  isRequired = true,
  isFormSubmitted,
}: Props) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput(() => !!validate);

  useEffect(() => {
    getValidity({ type: 'confirmPassword', isValid });
    getValue({ name: 'confirmPassword', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <div className="relative flex w-full items-center">
      {label ? (
        <label className="w-1/2 text-2xl" htmlFor="confirm-password">
          {label}
        </label>
      ) : null}
      <input
        required={isRequired}
        type="password"
        id="confirm-password"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={isError ? "Your password doesn't match" : 'Confirm new password'}
        className={`${
          !validate && isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full rounded-md bg-transparent px-6 py-3 text-2xl shadow-md ring-1 placeholder:text-xl placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {showError && isError ? <InputError msg="mismatch password" /> : null}
    </div>
  );
};
