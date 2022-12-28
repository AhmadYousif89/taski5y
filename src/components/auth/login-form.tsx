import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { path } from 'components/app';
import { useForm } from 'hooks/use-form';
import { GetInputValues, Divider, Button, Input } from 'components/ui';
import { useAuth, useAppDispatch, useAppSelector } from 'app/hooks';

import { AuthInputNames } from './types';
import { API_URL } from 'features/config';
import { signIn } from 'features/services/auth';
import { authSelector, resetAuth } from 'features/slices/auth';

import googleLogo from 'assets/google.png';
import { AuthButton } from './auth-button';
import { AuthErrorMsg } from './auth-error-msg';
import { AuthContainer } from './auth-container';
import { TrustDevice } from './remember-me-checkbox';
import { SwitchFormButton } from './switch-form-button';

type FormValidity = Record<Exclude<AuthInputNames, 'confirmPassword' | 'name'>, boolean>;
type FormValues = Record<Exclude<AuthInputNames, 'confirmPassword' | 'name'>, string>;

const initFormValidity: FormValidity = { email: false, password: false };
const initFormValues: FormValues = { email: '', password: '' };

export const LoginForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { status, error } = useAppSelector(authSelector);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const { email, password } = formValues;
  const { email: emailIsValid, password: passwordIsValid } = formValidity;
  const formIsValid = [emailIsValid, passwordIsValid].every(Boolean);

  useEffect(() => {
    if (user) navigate(path.dashboard);
    const unload = () => setIsLoading(false);
    window.addEventListener('unload', unload);

    return () => {
      dispatch(resetAuth());
      window.removeEventListener('unload', unload);
    };
  }, [user]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const user = { email, password };
    dispatch(signIn(user));
  };

  const userErrorMsg = Array.isArray(error.message) ? (
    <ul className="flex flex-col gap-2">
      {error.message.map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  ) : (
    error.message
  );

  return (
    <AuthContainer>
      <form
        onSubmit={onFormSubmit}
        aria-label="login-form"
        className="flex w-full flex-col gap-8 py-10 px-6">
        <h2 className="mb-4 text-center text-3xl capitalize tracking-widest text-color-base">
          login to account
        </h2>

        <fieldset aria-label="email-input">
          <Input
            value={email}
            type={'email'}
            name={'email'}
            placeholder={'enter email'}
            placeholderErrMsg={'please enter a valid email'}
            inputErrMsg={'email is not valid'}
            getValue={getFormValues as GetInputValues}
            getValidity={getFormValidity}
          />
        </fieldset>

        <fieldset aria-label="email-password">
          <Input
            value={password}
            type={'password'}
            name={'password'}
            placeholder={'enter password'}
            inputErrMsg={'must be 3 or more character with min 1 number'}
            placeholderErrMsg={'password not valid'}
            getValue={getFormValues as GetInputValues}
            getValidity={getFormValidity}
          />
        </fieldset>

        <fieldset className="flex justify-between gap-2">
          <AuthButton title="login" status={status} formIsValid={formIsValid} />
          <TrustDevice />
        </fieldset>

        <fieldset className="w-full">
          <SwitchFormButton
            onClick={() => navigate(`/password-reset`)}
            msg="forget your password?"
            title="Reset"
          />
        </fieldset>

        <Divider>
          <span
            className={`center-absolute flex-center h-12 w-12 cursor-default rounded-full font-bold tracking-wider text-color-base before:h-full before:w-full before:rounded-full before:border-2 before:border-r-amber-500 before:border-t-sky-500 before:border-b-sky-500 before:border-l-amber-500 ${
              isLoading
                ? 'before:absolute before:animate-spin'
                : 'border-2 border-neutral-500 before:hidden'
            }`}>
            OR
          </span>
        </Divider>

        <Button
          onClick={() => {
            setIsLoading(true);
            window.open(
              import.meta.env.PROD
                ? `${import.meta.env.VITE_API_URL}/auth/google`
                : `${API_URL}/auth/google`,
              '_self',
            );
          }}
          label="Sign in with google"
          icon={<img src={googleLogo} className="h-7" />}
          className="self-center text-xl ring-1 ring-color-base"
        />
      </form>

      <AuthErrorMsg status={status} errorMsg={userErrorMsg} />
    </AuthContainer>
  );
};
