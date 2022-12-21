import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import googleLogo from '../../assets/google.png';

import { useForm } from 'hooks/use-form';
import { AuthInputNames } from './types';
import { GetInputValues, Input } from '@ui/input';
import { googleLogin, signIn } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { AuthButton } from './auth-button';
import { TrustDevice } from './remember-me-checkbox';
import { SwitchFormButton } from './switch-form-button';

import { Button } from '@ui/button';
import { Divider } from '@ui/divider';

import { AuthErrorMsg } from './auth-error-msg';
import { AuthContainer } from './auth-container';

type FormValidity = Record<Exclude<AuthInputNames, 'confirmPassword' | 'name'>, boolean>;
type FormValues = Record<Exclude<AuthInputNames, 'confirmPassword' | 'name'>, string>;

const initFormValidity: FormValidity = { email: false, password: false };
const initFormValues: FormValues = { email: '', password: '' };

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { status, error } = useAppSelector(authSelector);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const { email, password } = formValues;
  const { email: emailIsValid, password: passwordIsValid } = formValidity;
  const formIsValid = [emailIsValid, passwordIsValid].every(Boolean);

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
          <span className="center-absolute flex-center h-14 w-14 cursor-default rounded-full text-xl font-bold tracking-wider text-color-base ring-2 ring-color-base">
            OR
          </span>
        </Divider>

        <Button
          label="Sign in with google"
          className="self-center ring-1 ring-color-base">
          <img src={googleLogo} className="h-8" />
          <span className="absolute [&>*]:opacity-0">
            <GoogleLogin
              onSuccess={({ credential }) => {
                if (credential) dispatch(googleLogin({ credential }));
              }}
            />
          </span>
        </Button>
      </form>

      <AuthErrorMsg status={status} errorMsg={userErrorMsg} />
    </AuthContainer>
  );
};
