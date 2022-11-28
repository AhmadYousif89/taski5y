import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'hooks/use-form';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { SwitchFormButton } from './switch-form-button';
import { PasswordInput } from './password-input';
import { EmailInput } from './email-input';
import { AuthButton } from './auth-button';
import { NameInput } from './name-input';

import { Card } from '@ui/card';
import { SpinnerIcon } from 'assets/icons';
import { signUp } from '@features/services/auth';
import { authSelector, resetAuth } from '@features/slices/auth';
import { TrustDevice } from './trust-device';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, authUser } = useAuth();
  const { status, error } = useAppSelector(authSelector);
  const { getInputValidity, getInputValue, formValues, formValidity } = useForm();

  const { name, email, password } = formValues;
  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
  } = formValidity;
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
    if (authUser || user) {
      navigate('/tasks');
    }
    return () => {
      dispatch(resetAuth());
    };
  }, [authUser, user]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newUser = { name, email, password };
    dispatch(signUp(newUser));
  };

  return (
    <section>
      <Card className="relative my-36 mx-4 max-w-screen-md sm:mx-auto">
        <form className="mx-auto my-16 flex w-4/5 flex-col gap-6" onSubmit={onFormSubmit}>
          <h2 className="text-3xl capitalize tracking-widest text-color-base">
            create new account
          </h2>

          <fieldset>
            <NameInput getValidity={getInputValidity} getValue={getInputValue} />
          </fieldset>

          <fieldset>
            <EmailInput getValidity={getInputValidity} getValue={getInputValue} />
          </fieldset>

          <fieldset>
            <PasswordInput getValidity={getInputValidity} getValue={getInputValue} />
          </fieldset>

          <fieldset className="self-start">
            <TrustDevice />
          </fieldset>

          <fieldset className="flex items-center justify-between">
            <AuthButton
              title="create"
              status={status === 'loading'}
              formIsValid={formIsValid}
            />

            {status === 'rejected' ? (
              <div className={`text-right text-2xl text-color-invalid`}>
                {userErrorMsg}
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
