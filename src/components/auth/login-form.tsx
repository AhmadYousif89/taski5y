import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import googleLogo from '../../assets/google.png';
import { GetInputValues, Input } from '@ui/input';
import { useForm } from 'hooks/use-form';
import { googleLogin, signIn } from '@features/services/auth';
import { authSelector, resetAuth, setAuthActionType } from '@features/slices/auth';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { Card } from '@ui/card';
import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';
import { SpinnerIcon } from 'assets/icons';
import { TrustDevice } from './remember-me-checkbox';
import { SwitchFormButton } from './switch-form-button';
import { Button } from '@ui/button';
import { AuthErrorMsg } from './auth-error-msg';

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
    <section className="relative mx-4 translate-y-40" aria-label="Login-form">
      <Card className="mx-auto flex max-w-3xl flex-col items-center">
        <form className="flex w-full flex-col gap-8 py-10 px-6" onSubmit={onFormSubmit}>
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

          <fieldset className="" aria-label="remember-me-checkbox"></fieldset>

          <fieldset className="flex justify-between gap-4">
            <AuthButton title="login" status={status} formIsValid={formIsValid} />
            <TrustDevice />
          </fieldset>

          <div className="gap-4 space-y-8 xs:flex xs:space-y-0">
            <fieldset className="xs:w-1/2">
              <SwitchFormButton
                onClick={() => navigate(`/`)}
                msg="need an account?"
                title="sign up"
              />
            </fieldset>
            <fieldset className="xs:w-1/2">
              <SwitchFormButton
                onClick={() => navigate(`/password-reset`)}
                msg="forget your password?"
                title="Reset"
              />
            </fieldset>
          </div>

          <div
            aria-label="divider"
            className="relative my-4 before:absolute before:right-0 before:top-0 before:h-px before:w-[45%] before:bg-neutral-500 after:absolute after:left-0 after:top-0 after:h-px after:w-[45%] after:bg-neutral-500">
            <span className="center-absolute text-xl font-bold tracking-wider text-color-base">
              Or
            </span>
          </div>

          <fieldset className="flex justify-center">
            <Button
              label="Sign in with google"
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
          </fieldset>

          <AuthErrorMsg status={status} errorMsg={userErrorMsg} />
        </form>
      </Card>
    </section>
  );
};
