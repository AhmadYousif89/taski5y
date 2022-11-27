import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { Card } from '@ui/card';
import { SwitchFormButton } from './switch-form-button';
import { PasswordInput } from './password-input';
import { EmailInput } from './email-input';
import { AuthButton } from './auth-button';
import { useForm } from 'hooks/use-form';
import { SpinnerIcon } from 'assets/icons';
import { signIn } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';
import { getUser } from '@features/services/user';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { status, error } = useAppSelector(authSelector);
  const { getInputValidity, getInputValue, formValues, formValidity } = useForm();

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
    dispatch(signIn(user)).then(() => dispatch(getUser()));
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
    <section>
      <Card className="relative my-36 mx-4 max-w-screen-md sm:mx-auto">
        <form
          className="mx-auto my-16 flex w-10/12 flex-col gap-6"
          onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            login to account
          </h2>

          <fieldset>
            <EmailInput getValidity={getInputValidity} getValue={getInputValue} />
          </fieldset>

          <fieldset>
            <PasswordInput getValidity={getInputValidity} getValue={getInputValue} />
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

            {status === 'fulfilled' ? (
              <p
                className={`flex items-center gap-4 text-center text-2xl text-color-valid`}>
                <SpinnerIcon />
                Redirecting
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
