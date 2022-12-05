import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { resetPassword } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';

import { Card } from '@ui/card';
import { AuthInputNames } from './types';
import { SpinnerIcon } from 'assets/icons';
import { AuthButton } from './auth-button';
import { SwitchFormButton } from './switch-form-button';
import { GetInputValidation, GetInputValues, Input } from '@ui/input';
import { useForm } from 'hooks/use-form';

type FormValidity = Record<Exclude<AuthInputNames, 'name'>, boolean>;
type FormValues = Record<Exclude<AuthInputNames, 'name'>, string>;

const initFormValidity: FormValidity = {
  email: false,
  password: false,
  confirmPassword: false,
};
const initFormValues: FormValues = { email: '', password: '', confirmPassword: '' };

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, message, error } = useAppSelector(authSelector);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const { email, password, confirmPassword } = formValues;
  const {
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid,
  } = formValidity;

  const formIsValid = [emailIsValid, passwordIsValid, confirmPasswordIsValid].every(
    Boolean,
  );

  useEffect(() => {
    if (status === 'fulfilled') {
      setTimeout(() => {
        navigate('/login');
        dispatch(resetAuth());
      }, 2000);
    }
  }, [status]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    dispatch(resetPassword({ email, password }));
  };

  return (
    <section className="translate-y-40">
      <Card className="relative mx-4 max-w-screen-xs sm:mx-auto">
        <form
          className="mx-auto my-16 flex w-10/12 flex-col gap-6"
          onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            reset your password
          </h2>

          <fieldset>
            <Input
              value={email}
              type={'email'}
              name={'email'}
              placeholder={'example@gmail.com'}
              placeholderErrMsg={'please enter your registration email'}
              inputErrMsg={'email is not valid'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)}
            />
          </fieldset>
          <fieldset>
            <Input
              value={password}
              type={'password'}
              name={'password'}
              placeholder={'Enter new password'}
              inputErrMsg={'required at least 3 characters'}
              placeholderErrMsg={'password is required'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => /^((?!.*[\s])(?=.*\d).{3,})/.test(text)}
            />
          </fieldset>
          <fieldset>
            <Input
              type={'password'}
              value={confirmPassword}
              name={'confirmPassword'}
              inputErrMsg={'mismatch password'}
              placeholder={'Confirm new password'}
              placeholderErrMsg={"your password doesn't match"}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={() => password === confirmPassword}
            />
          </fieldset>

          <fieldset className="flex items-center justify-between">
            <AuthButton
              title="reset"
              status={status === 'loading'}
              formIsValid={formIsValid}
            />

            {status === 'rejected' ? (
              <div className={`text-right text-2xl text-color-invalid`}>
                <p>{error.message}</p>
              </div>
            ) : null}

            {status === 'fulfilled' ? (
              <div className="flex flex-col items-end gap-2 text-center text-2xl text-color-valid">
                <p>{message}</p>
                <p className="flex items-center gap-4">
                  <SpinnerIcon className="h-8 w-8" />
                  redirecting to login
                </p>
              </div>
            ) : null}

            {status === 'loading' ? (
              <p
                className={`flex items-center gap-4 text-center text-2xl text-color-valid`}>
                <SpinnerIcon className="h-10 w-10" />
                Loading ...
              </p>
            ) : null}
          </fieldset>

          <fieldset className="xs:w-1/2">
            <SwitchFormButton
              onClick={() => navigate(`/login`)}
              msg="back to"
              title="Login"
            />
          </fieldset>
        </form>
      </Card>
    </section>
  );
};
