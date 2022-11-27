import { useEffect } from 'react';
import { AuthFormProps } from './types';
import { useFormInput } from 'hooks/use-form-input';
import { InputError } from '@ui/input-error';

type Props = AuthFormProps & {
  label?: string;
  holder?: string;
  isRequired?: boolean;
  validate?: boolean;
  isFormSubmitted?: boolean;
};

export const NameInput = ({
  getValidity,
  getValue,
  label,
  holder,
  isRequired = true,
  validate = true,
  isFormSubmitted,
}: Props) => {
  const { inputValue, isValid, isError, onInputBlur, onInputChange, resetInput } =
    useFormInput((text: string) => text.trim().length !== 0);

  useEffect(() => {
    getValidity({ type: 'name', isValid });
    getValue({ name: 'name', value: inputValue });
    if (isFormSubmitted) resetInput();
  }, [isValid, inputValue, isFormSubmitted]);

  return (
    <div className="relative flex w-full items-center">
      {label ? (
        <label className="w-1/2 text-2xl" htmlFor="name">
          {label}
        </label>
      ) : null}
      <input
        required={isRequired}
        id="name"
        type="text"
        name="name"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        placeholder={
          validate && isError
            ? 'Please enter your name'
            : `${holder ? holder : 'Your name'}`
        }
        className={`${
          validate && isError ? 'ring-color-invalid' : 'ring-color-base'
        } w-full rounded-md bg-transparent px-6 py-3 text-2xl text-color-base shadow-md ring-1 placeholder:text-xl placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-color-validating focus:valid:ring-color-valid`}
      />
      {validate && isError ? <InputError msg="name can't be empty" /> : null}
    </div>
  );
};
