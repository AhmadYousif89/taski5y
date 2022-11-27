import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { resetPassword } from '@features/services/auth';
import { authSelector } from '@features/slices/auth';

import { Card } from '@ui/card';
import { useForm } from 'hooks/use-form';
import { SpinnerIcon } from 'assets/icons';
import { AuthButton } from './auth-button';
import { EmailInput } from './email-input';
import { PasswordInput } from './password-input';
import { SwitchFormButton } from './switch-form-button';
import { ConfirmPasswordInput } from './confirm-password-input';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(authSelector);
  const { getInputValidity, getInputValue, formValues, formValidity } = useForm();

  const { email, password, confirmPassword } = formValues;
  const { email: emailIsValid, password: passwordIsValid } = formValidity;

  const confirmPasswordIsValid = password === confirmPassword;
  const formIsValid = [emailIsValid, passwordIsValid, confirmPasswordIsValid].every(
    Boolean,
  );

  useEffect(() => {
    if (status === 'fulfilled') {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [status]);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    dispatch(resetPassword({ email, password }));
  };

  return (
    <section>
      <Card className="relative my-36 mx-4 max-w-screen-md sm:mx-auto">
        <form
          className="mx-auto my-16 flex w-10/12 flex-col gap-6"
          onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            reset your password
          </h2>

          <fieldset>
            <EmailInput
              msg={'Please enter your registration email'}
              getValidity={getInputValidity}
              getValue={getInputValue}
            />
          </fieldset>
          <fieldset>
            <PasswordInput
              msg={'Your new password'}
              getValue={getInputValue}
              getValidity={getInputValidity}
            />
          </fieldset>
          <fieldset>
            <ConfirmPasswordInput
              getValue={getInputValue}
              getValidity={getInputValidity}
              validate={confirmPasswordIsValid}
            />
          </fieldset>

          <fieldset className="flex items-center justify-between">
            <AuthButton
              title="reset"
              status={status === 'loading'}
              formIsValid={formIsValid}
            />

            {status === 'rejected' ? (
              <div className={`text-right text-2xl text-color-invalid`}>
                <p>{error.message}</p>
              </div>
            ) : null}

            {status === 'fulfilled' ? (
              <p
                className={`flex items-center gap-4 text-center text-2xl text-color-valid`}>
                <SpinnerIcon />
                Redirecting to login
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
