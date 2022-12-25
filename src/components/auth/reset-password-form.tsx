import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import { useForm } from 'hooks/use-form';
import { resetPassword } from 'features/services/auth';
import { authSelector, resetAuth } from 'features/slices/auth';
import { useAuth, useAppDispatch, useAppSelector } from 'app/hooks';

import { path } from 'components/app';
import { GetInputValues, Input } from 'components/ui';

import { AuthInputNames } from './types';
import { AuthButton } from './auth-button';
import { addTimer } from 'helpers/timeout';
import { AuthErrorMsg } from './auth-error-msg';
import { AuthContainer } from './auth-container';

type FormValidity = Record<Exclude<AuthInputNames, 'name'>, boolean>;
type FormValues = Record<Exclude<AuthInputNames, 'name'>, string>;

const initFormValidity: FormValidity = {
  email: false,
  password: false,
  confirmPassword: false,
};
const initFormValues: FormValues = { email: '', password: '', confirmPassword: '' };

export const ResetPassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, message, error } = useAppSelector(authSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    if (user) navigate(path.dashboard);
    if (status === 'fulfilled') {
      setIsSubmitted(true);
      addTimer(() => {
        navigate(path.login);
        setIsSubmitted(false);
      });
    }
  }, [status, user]);

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, []);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    dispatch(resetPassword({ email, password }));
  };

  return (
    <AuthContainer>
      <form
        onSubmit={onFormSubmit}
        aria-label="reset-password-form"
        className="flex w-full flex-col gap-8 py-10 px-6">
        <h2 className="mb-4 text-center text-3xl capitalize tracking-widest text-color-base">
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
            isFormSubmitted={isSubmitted}
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
            isFormSubmitted={isSubmitted}
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
            isFormSubmitted={isSubmitted}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
            inputValidator={() => password === confirmPassword}
          />
        </fieldset>

        <fieldset>
          <AuthButton
            title="reset"
            status={status}
            className="mx-auto w-1/2"
            formIsValid={formIsValid}
          />
        </fieldset>

        <AuthErrorMsg
          status={status}
          extraMsg={message}
          errorMsg={error.message}
          successMsg="redirecting to login"
        />
      </form>
    </AuthContainer>
  );
};
