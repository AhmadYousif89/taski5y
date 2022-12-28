import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import googleLogo from 'assets/google.png';

import { useAppDispatch, useAppSelector, useAuth } from 'app/hooks';
import { useForm } from 'hooks/use-form';
import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';

import { API_URL } from 'features/config';
import { SignUpType } from 'features/types';
import { signUp } from 'features/services/auth';
import { authSelector } from 'features/slices/auth';

import { path } from 'components/app';
import { GetInputValues, Divider, Button, Input } from 'components/ui';

import { AuthErrorMsg } from './auth-error-msg';
import { AuthContainer } from './auth-container';

type FormValidity = Record<Exclude<AuthInputNames, 'confirmPassword'>, boolean>;
type FormValues = Record<Exclude<AuthInputNames, 'confirmPassword'>, string>;

const initFormValidity: FormValidity = {
  name: false,
  email: false,
  password: false,
};
const initFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { status, error } = useAppSelector(authSelector);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
  } = formValidity;
  const { name, email, password } = formValues;

  const formIsValid = [nameIsValid, emailIsValid, passwordIsValid].every(Boolean);

  const userErrorMsg = Array.isArray(error.message) ? (
    <ul className="flex flex-col gap-2">
      {error.message.map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  ) : (
    error.message
  );

  useEffect(() => {
    if (user && !user.registered) navigate(path.redirect);
    if (user && user.registered) navigate(path.dashboard);
    if (location.href !== (path.root || path.register)) {
      setIsLoading(false);
    }
  }, [user, location.pathname, path]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newUser: SignUpType = { name, email, password };
    dispatch(signUp(newUser));
  };

  return (
    <AuthContainer>
      <form
        onSubmit={onFormSubmit}
        aria-label="register-form"
        className="flex w-full flex-col gap-8 py-10 px-6">
        <h2 className="mb-4 text-center text-3xl capitalize tracking-widest text-color-base">
          create new account
        </h2>

        <fieldset aria-label="name-input">
          <Input
            id={'name'}
            value={name}
            type={'text'}
            name={'name'}
            placeholder={'enter name'}
            inputErrMsg={'name is required'}
            placeholderErrMsg={'name is not valid'}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
          />
        </fieldset>

        <fieldset aria-label="email-input">
          <Input
            id={'email'}
            value={email}
            type={'email'}
            name={'email'}
            placeholder={'enter email'}
            placeholderErrMsg={'please enter a valid email'}
            inputErrMsg={'email is not valid'}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
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
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
          />
        </fieldset>

        <fieldset className="xs:mx-auto xs:w-1/2">
          <AuthButton title="create" status={status} formIsValid={formIsValid} />
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
          label="Continue with google"
          icon={<img src={googleLogo} className="h-7" />}
          className="self-center text-xl ring-1 ring-color-base"
        />
      </form>

      <AuthErrorMsg status={status} errorMsg={userErrorMsg} />
    </AuthContainer>
  );
};
