import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';
import { AuthInputNames } from '@auth/types';
import { Button } from '@ui/button';
import { useForm } from 'hooks/use-form';
import { addTimer } from 'helpers/timeout';
import { GetInputValues, Input } from '@ui/input';
import { authSelector } from '@features/slices/auth';
import { updateUser } from '@features/services/auth';
import { TrustDevice } from '@auth/remember-me-checkbox';
import { BackArrowIcon, UploadIcon, CheckMarkIcon, SpinnerIcon } from 'assets/icons';

type Props = { showUserProfile: Dispatch<SetStateAction<boolean>> };
type FormValidity = Record<AuthInputNames, boolean>;
type FormValues = Record<AuthInputNames, string>;

const initFormValidity: FormValidity = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
};
const initFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const UserProfile = ({ showUserProfile }: Props) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
  } = formValidity;
  const { name, email, password, confirmPassword } = formValues;

  let formIsValid: boolean = false;
  if (nameIsValid) formIsValid = true;
  if (emailIsValid) formIsValid = true;
  if (passwordIsValid && confirmPassword === password) formIsValid = true;

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const data = password
      ? { name: name || user?.name, email: email || user?.email, password }
      : { name: name || user?.name, email: email || user?.email };
    dispatch(updateUser(data));
    setIsSubmitted(true);
    addTimer(() => setIsSubmitted(false), 5);
  };

  return (
    <section className="mt-8 text-color-base">
      <h2 className="mb-8 text-center text-4xl">Manage your account</h2>
      <form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">Update information</h3>

          <fieldset className="flex items-center" aria-label="update-name-input">
            <Input
              id={'name'}
              type={'text'}
              name={'name'}
              label={'Name'}
              value={name}
              isRequired={false}
              placeholder={user?.name}
              showInputErr={name.length > 0}
              inputErrMsg={'name is not valid'}
              isFormSubmitted={isSubmitted}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => text.trim().length > 0}
            />
          </fieldset>

          <fieldset className="flex items-center" aria-label="update-email-input">
            <Input
              id={'email'}
              type={'email'}
              name={'email'}
              label={'Email'}
              value={email}
              isRequired={false}
              placeholder={user?.email}
              showInputErr={email.length > 0}
              inputErrMsg={'email is not valid'}
              isFormSubmitted={isSubmitted}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)}
            />
          </fieldset>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">Change password</h3>

          <fieldset className="flex items-center" aria-label="update-password-input">
            <Input
              id={'password'}
              type={'password'}
              name={'password'}
              label={'New password'}
              value={password}
              isRequired={false}
              placeholder={'Enter password'}
              showInputErr={password.length > 0}
              inputErrMsg={'required at least 3 characters'}
              isFormSubmitted={isSubmitted}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => /^((?!.*[\s])(?=.*\d).{3,})/.test(text)}
            />
          </fieldset>

          <fieldset className="flex items-center" aria-label="confirm-password-input">
            <Input
              isRequired={password !== confirmPassword}
              type={'password'}
              value={confirmPassword}
              name={'confirmPassword'}
              label={'Confirm password'}
              inputErrMsg={'mismatch password'}
              placeholder={'Confirm new password'}
              placeholderErrMsg={"your password doesn't match"}
              isFormSubmitted={isSubmitted}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={() => confirmPassword === password}
            />
          </fieldset>
        </div>

        <fieldset className="mt-4 self-end">
          <TrustDevice />
        </fieldset>

        <div className="relative flex items-center justify-between">
          <Button
            type="button"
            label="Back"
            icon={<BackArrowIcon />}
            onClick={() => showUserProfile(false)}
          />
          {status === 'fulfilled' && isSubmitted && (
            <p className="absolute -top-14 -left-3 flex items-center gap-2 text-center text-xl text-color-valid xs:left-1/3 xs:text-2xl">
              <CheckMarkIcon />
              Profile updated
            </p>
          )}
          <Button
            shouldDisable={!formIsValid}
            label="Submit"
            type="submit"
            icon={
              status === 'loading' ? <SpinnerIcon className="h-8 w-8" /> : <UploadIcon />
            }
          />
        </div>
      </form>
    </section>
  );
};
