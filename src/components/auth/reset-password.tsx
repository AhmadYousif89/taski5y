import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

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
import { AuthErrorMsg } from './auth-error-msg';

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
    if (status === 'fulfilled') {
      setIsSubmitted(true);
      addTimer(() => {
        navigate('/login');
        dispatch(resetAuth());
        setIsSubmitted(false);
      });
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
              formIsValid={formIsValid}
              className="mx-auto w-1/2"
            />
          </fieldset>

          <fieldset className="xs:mx-auto xs:w-1/2">
            <SwitchFormButton
              onClick={() => navigate(`/login`)}
              msg="back to"
              title="Login"
            />
          </fieldset>

          <AuthErrorMsg
            status={status}
            extraMsg={message}
            errorMsg={error.message}
            successMsg="redirecting to login"
          />
        </form>
      </Card>
    </section>
  );
};
