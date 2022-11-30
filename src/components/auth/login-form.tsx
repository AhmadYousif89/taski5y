import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import { GetInputValues, Input } from '@ui/input';
import { useForm } from 'hooks/use-form';
import { signIn } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { Card } from '@ui/card';
import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';
import { SpinnerIcon } from 'assets/icons';
import { TrustDevice } from './remember-me-checkbox';
import { SwitchFormButton } from './switch-form-button';

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
    dispatch(resetAuth());
  }, []);

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
    <section className="translate-y-40">
      <Card className="relative mx-4 max-w-screen-xs sm:mx-auto">
        <form
          className="mx-auto my-16 flex w-10/12 flex-col gap-6"
          onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            login to account
          </h2>

          <fieldset aria-label="email-input">
            <Input
              type={'email'}
              name={'email'}
              value={email}
              placeholder={'example@gmail.com'}
              placeholderErrMsg={'please enter a valid email'}
              inputErrMsg={'email is not valid'}
              getValue={getFormValues as GetInputValues}
              getValidity={getFormValidity}
            />
          </fieldset>

          <fieldset aria-label="email-password">
            <Input
              type={'password'}
              name={'password'}
              value={password}
              placeholder={'Enter password'}
              inputErrMsg={'required at least 3 characters'}
              placeholderErrMsg={'password is required'}
              getValue={getFormValues as GetInputValues}
              getValidity={getFormValidity}
            />
          </fieldset>

          <fieldset className="self-start" aria-label="remember-me-checkbox">
            <TrustDevice />
          </fieldset>

          <fieldset className="flex items-center justify-between">
            <AuthButton
              title="login"
              status={status === 'loading'}
              formIsValid={formIsValid}
            />

            {status === 'rejected' ? (
              <div className={`text-right text-2xl tracking-wider text-color-invalid`}>
                <p>{userErrorMsg}</p>
              </div>
            ) : null}

            {status === 'loading' ? (
              <p
                className={`flex items-center gap-4 text-center text-2xl text-color-valid`}>
                <SpinnerIcon />
                Loading
              </p>
            ) : null}
          </fieldset>

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
        </form>
      </Card>
    </section>
  );
};
