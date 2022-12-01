import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';
import { useForm } from 'hooks/use-form';

import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';
import { SwitchFormButton } from './switch-form-button';

import { Card } from '@ui/card';
import { SpinnerIcon } from 'assets/icons';
import { signUp } from '@features/services/auth';
import { GetInputValues, Input } from '@ui/input';
import { authSelector, resetAuth } from '@features/slices/auth';

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
    <section className="translate-y-40">
      <Card className="relative mx-4 max-w-screen-xs sm:mx-auto">
        <form className="mx-auto my-16 flex w-4/5 flex-col gap-6" onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            create new account
          </h2>

          <fieldset aria-label="name-input">
            <Input
              value={name}
              type={'text'}
              name={'name'}
              placeholder={'Enter name'}
              inputErrMsg={'name is required'}
              placeholderErrMsg={'name is not valid'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
              inputValidator={text => text.trim().length > 0}
            />
          </fieldset>

          <fieldset aria-label="email-input">
            <Input
              value={email}
              type={'email'}
              name={'email'}
              placeholder={'example@gmail.com'}
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
              placeholder={'Enter password'}
              inputErrMsg={'required at least 3 characters'}
              placeholderErrMsg={'password is required'}
              getValidity={getFormValidity}
              getValue={getFormValues as GetInputValues}
            />
          </fieldset>

          <fieldset className="flex items-center justify-between">
            <AuthButton title="create" status={status} formIsValid={formIsValid} />

            {status === 'rejected' ? (
              <div className={`text-right text-2xl text-color-invalid`}>
                {userErrorMsg}
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
              onClick={() => navigate(`/login`)}
              msg="i have an account"
              title="sign in"
            />
          </fieldset>
        </form>
      </Card>
    </section>
  );
};
