import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { resetPassword } from '@features/services/auth';
import { authSelector, resetAuth, resetAuthStatus } from '@features/slices/auth';

import { Card } from '@ui/card';
import { AuthInputNames } from './types';
import { SpinnerIcon } from 'assets/icons';
import { AuthButton } from './auth-button';
import { GetInputValues, Input } from '@ui/input';
import { SwitchFormButton } from './switch-form-button';
import { useForm } from 'hooks/use-form';
import { addTimer } from 'helpers/timeout';

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
      addTimer(() => {
        navigate('/login');
        dispatch(resetAuth());
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatus());
    };
  }, []);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    dispatch(resetPassword({ email, password }));
  };

  return (
    <section className="mx-4 translate-y-40">
      <Card className="relative mx-auto flex max-w-4xl flex-col items-center">
        <form className="flex w-full flex-col gap-8 py-10 px-6" onSubmit={onFormSubmit}>
          <h2 className="mb-4 text-3xl capitalize tracking-widest text-color-base">
            reset your password
          </h2>

          <fieldset>
            <Input
              value={email}
              type={'email'}
              name={'email'}
              placeholder={'enter email'}
              placeholderErrMsg={'please enter your registered email'}
              inputErrMsg={'email is not valid'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
            />
          </fieldset>
          <fieldset>
            <Input
              value={password}
              type={'password'}
              name={'password'}
              placeholder={'enter new password'}
              inputErrMsg={'must be 3 or more character with min 1 number'}
              placeholderErrMsg={'password not valid'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
            />
          </fieldset>
          <fieldset>
            <Input
              type={'password'}
              value={confirmPassword}
              name={'confirmPassword'}
              inputErrMsg={'password mismatch'}
              placeholder={'confirm new password'}
              placeholderErrMsg={"password doesn't match"}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={() => password === confirmPassword}
            />
          </fieldset>

          <fieldset className="flex items-center justify-between text-xl">
            <AuthButton
              className="w-1/2"
              title="reset"
              status={status === 'loading'}
              formIsValid={formIsValid}
            />

            {status === 'rejected' ? (
              <div className={`text-color-invalid`}>
                <p>{error.message}</p>
              </div>
            ) : null}

            {status === 'fulfilled' ? (
              <div className="flex flex-col items-end gap-2 text-center text-color-valid">
                <p>{message}</p>
                <p className="flex items-center gap-4">
                  <SpinnerIcon className="h-8 w-8" />
                  redirecting to login
                </p>
              </div>
            ) : null}

            {status === 'loading' ? (
              <p className={`flex items-center gap-4 text-center text-color-valid`}>
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
