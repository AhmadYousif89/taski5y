import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import googleLogo from '../../assets/google.png';
import { useForm } from 'hooks/use-form';
import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';
import { SwitchFormButton } from './switch-form-button';

import { Card } from '@ui/card';
import { Button } from '@ui/button';
import { SpinnerIcon } from 'assets/icons';
import { GetInputValues, Input } from '@ui/input';
import { googleLogin, signUp } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';
import { AuthErrorMsg } from './auth-error-msg';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
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
    if (user) {
      navigate('/tasks');
    }
    return () => {
      dispatch(resetAuth());
    };
  }, [user]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newUser = { name, email, password };
    dispatch(signUp(newUser));
  };

  return (
    <section className="mx-4 translate-y-40" aria-label="Registration-form">
      <Card className="relative mx-auto flex max-w-3xl flex-col items-center">
        <form className="flex w-full flex-col gap-8 py-10 px-6" onSubmit={onFormSubmit}>
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

          <fieldset className="mx-auto xs:w-1/2">
            <SwitchFormButton
              onClick={() => navigate(`/login`)}
              msg="i have an account"
              title="sign in"
            />
          </fieldset>

          <div
            aria-label="divider"
            className="relative my-4 before:absolute before:right-0 before:top-0 before:h-px before:w-[45%] before:bg-neutral-500 after:absolute after:left-0 after:top-0 after:h-px after:w-[45%] after:bg-neutral-500">
            <span className="center-absolute text-xl font-bold tracking-wider text-color-base">
              Or
            </span>
          </div>

          <fieldset className="flex justify-center">
            <Button
              label="Continue with google"
              className="w-full ring-1 ring-color-base xs:w-1/2">
              <img src={googleLogo} className="h-8" />
              <span className="absolute [&>*]:opacity-0">
                <GoogleLogin
                  onSuccess={({ credential }) => {
                    if (credential) dispatch(googleLogin({ credential }));
                  }}
                />
              </span>
            </Button>

            <AuthErrorMsg status={status} errorMsg={userErrorMsg} />
          </fieldset>
        </form>
      </Card>
    </section>
  );
};
