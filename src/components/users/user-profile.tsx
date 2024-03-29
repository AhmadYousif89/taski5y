import { FormEvent, useEffect, useRef, useState } from 'react';

import { useAuth, useForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { toggleProfile } from 'features/slices/ui';
import { updateUser } from 'features/services/auth';
import { authSelector, setAuthActionType } from 'features/slices/auth';

import { TrustDevice } from 'components/auth';
import { AuthInputNames } from 'components/auth/types';
import { GetInputValues, Button, Input, Loading } from 'components/ui';

import { BackArrowIcon, UploadIcon } from 'assets/icons';

type FormValidity = Record<AuthInputNames, boolean>;
type FormValues = Record<AuthInputNames, string>;

const initFormValidity: FormValidity = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false
};
const initFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const UserProfile = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authSelector);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValues,
    FormValidity
  >({ initFormValidity, initFormValues });

  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid
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
        ? { name: name || user?.name, email: email || user?.email, password } // if we need to update all fields
        : { name: name || user?.name, email: email || user?.email }; // update only the username and email
    dispatch(setAuthActionType('profile_update'));
    dispatch(updateUser(data));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (user?.provider === 'google' && emailRef.current) emailRef.current.disabled = true;
    if (status === 'fulfilled') setIsSubmitted(false);
  }, [user?.provider, status, dispatch]);

  return (
    <section className="mt-8 text-color-base">
      <h2 className="mb-8 text-center text-4xl">Manage your account</h2>
      <form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">User information</h3>

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
            onClick={() => dispatch(toggleProfile(false))}
          />

          <Button
            isDisabled={!formIsValid}
            title="submit your changes"
            type="submit"
            icon={
              isSubmitted && status === 'loading' ? (
                <Loading />
              ) : (
                <>
                  <UploadIcon /> Submit
                </>
              )
            }
          />
        </div>
      </form>
    </section>
  );
};
