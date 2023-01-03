import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAuth, useAppDispatch, useAppSelector } from 'app/hooks';

import { setProfile } from 'features/slices/ui';
import { updateUser } from 'features/services/auth';
import { authSelector, resetAuthStatus } from 'features/slices/auth';

import { TrustDevice } from 'components/auth';
import { AuthInputNames } from 'components/auth/types';
import { GetInputValues, Button, Input } from 'components/ui';

import { useForm } from 'hooks';
import { wait } from 'helpers/wait';
import { BackArrowIcon, UploadIcon, CheckMarkIcon, SpinnerIcon } from 'assets/icons';

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

export const UserProfile = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authSelector);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid,
  } = formValidity;
  const { name, email, password, confirmPassword } = formValues;

  let formIsValid = false;
  if (nameIsValid) formIsValid = true;
  if (emailIsValid && user?.provider !== 'google') formIsValid = true;
  if (passwordIsValid && confirmPasswordIsValid) formIsValid = true;

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const data =
      user?.provider === 'google'
        ? { name: name || user?.name } // just update the username if the user sign in with google
        : password
        ? { name: name || user?.name, email: email || user?.email, password } // case we need to update the password
        : { name: name || user?.name, email: email || user?.email }; // update only the username and email
    dispatch(updateUser(data));
    setIsSubmitted(true);
    wait(() => {
      dispatch(resetAuthStatus());
      setIsSubmitted(false);
    }, 3);
  };

  useEffect(() => {
    if (user?.provider === 'google' && emailRef.current) emailRef.current.disabled = true;
  }, [user?.provider]);

  return (
    <section className="mt-8 text-color-base">
      <h2 className="mb-8 text-center text-4xl">Manage your account</h2>
      <form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">
            {user?.provider === 'google' ? 'User' : 'Update'} information
          </h3>

          <fieldset className="flex items-center" aria-label="update-name-input">
            <Input
              id={'name'}
              type={'text'}
              name={'name'}
              label={'Name'}
              value={name}
              validate={false}
              isRequired={false}
              inputErrMsg="name is not valid"
              placeholder={user?.name}
              isFormSubmitted={isSubmitted}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
            />
          </fieldset>

          <fieldset className="flex items-center" aria-label="update-email-input">
            <Input
              id={'email'}
              ref={emailRef}
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
            />
          </fieldset>
        </div>

        {user?.provider !== 'google' && (
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
                placeholder={'enter password'}
                showInputErr={password.length > 0}
                inputErrMsg={'required 3 characters with numbers'}
                isFormSubmitted={isSubmitted}
                getValidity={getFormValidity}
                getValue={getFormValues as GetInputValues}
              />
            </fieldset>

            <fieldset className="flex items-center" aria-label="confirm-password-input">
              <Input
                isRequired={password !== confirmPassword}
                type={'password'}
                value={confirmPassword}
                name={'confirmPassword'}
                label={'Confirm password'}
                inputErrMsg={'password mismatch'}
                placeholder={'confirm new password'}
                placeholderErrMsg={"password doesn't match"}
                isFormSubmitted={isSubmitted}
                getValidity={getFormValidity}
                getValue={getFormValues as GetInputValues}
                inputValidator={() => confirmPassword === password}
              />
            </fieldset>
          </div>
        )}

        <fieldset className="mt-4 self-end">
          <TrustDevice />
        </fieldset>

        <div className="relative mt-8 flex items-center justify-between">
          <Button
            label="Back"
            title="back to task form"
            icon={<BackArrowIcon />}
            onClick={() => dispatch(setProfile(false))}
          />
          {isSubmitted && status === 'fulfilled' && (
            <p className="absolute -top-14 -left-3 flex items-center gap-2 text-center text-xl text-color-valid xs:left-1/3 xs:text-2xl">
              <CheckMarkIcon />
              Profile Updated
            </p>
          )}
          <Button
            isDisabled={!formIsValid}
            label="Submit"
            title="submit your changes"
            type="submit"
            icon={
              isSubmitted && status === 'loading' ? (
                <SpinnerIcon className="h-8 w-8" />
              ) : (
                <UploadIcon />
              )
            }
          />
        </div>
      </form>
    </section>
  );
};
