import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';
import { ConfirmPasswordInput } from '@auth/confirm-password-input';
import { EmailInput } from '@auth/email-input';
import { NameInput } from '@auth/name-input';
import { PasswordInput } from '@auth/password-input';
import { updateUser } from '@features/services/user';
import { userSelector } from '@features/slices/user';
import { Button } from '@ui/button';
import { BackArrowIcon, SpinnerIcon } from 'assets/icons';
import { CheckMarkIcon } from 'assets/icons/check-mark';
import { UploadIcon } from 'assets/icons/upload';
import { useForm } from 'hooks/use-form';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

export const UserProfile = ({
  showUserProfile,
}: {
  showUserProfile: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(userSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getInputValidity, getInputValue, formValues, formValidity } = useForm();

  const { name, email, password, confirmPassword } = formValues;
  const {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
  } = formValidity;

  const confirmPasswordIsValid = password === confirmPassword;
  const formIsValid =
    [nameIsValid, emailIsValid, passwordIsValid].some(Boolean) && confirmPasswordIsValid;

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const data = { name, email, password };
    dispatch(updateUser(data));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <section className="mt-8 text-color-base">
      <h2 className="mb-8 text-center text-4xl">Manage your account</h2>
      <form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">Update information</h3>
          <fieldset className="flex items-center">
            <NameInput
              label="Name"
              isRequired={false}
              isFormSubmitted={isSubmitted}
              holder={user?.name}
              getValue={getInputValue}
              validate={name.length > 0}
              getValidity={getInputValidity}
            />
          </fieldset>
          <fieldset className="flex items-center">
            <EmailInput
              label="Email"
              holder={user?.email}
              isRequired={false}
              msg="Email is not valid"
              isFormSubmitted={isSubmitted}
              getValue={getInputValue}
              validate={email.length > 0}
              getValidity={getInputValidity}
            />
          </fieldset>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-3xl">Change password</h3>
          <fieldset className="flex items-center">
            <PasswordInput
              label="New password"
              isRequired={false}
              isFormSubmitted={isSubmitted}
              msg="Enter your new password"
              getValue={getInputValue}
              validate={password.length > 0}
              getValidity={getInputValidity}
            />
          </fieldset>
          <fieldset className="flex items-center">
            <ConfirmPasswordInput
              label="Confirm password"
              showError={false}
              isRequired={passwordIsValid}
              isFormSubmitted={isSubmitted}
              getValue={getInputValue}
              getValidity={getInputValidity}
              validate={confirmPasswordIsValid}
            />
          </fieldset>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            label="Back"
            icon={<BackArrowIcon />}
            onClick={() => showUserProfile(false)}
          />
          {status === 'fulfilled' && isSubmitted && (
            <p className="flex items-center gap-2 text-center text-2xl text-color-valid">
              Profile updated
              <CheckMarkIcon />
            </p>
          )}
          <Button
            shouldDisable={!formIsValid}
            label="Submit"
            icon={status === 'loading' ? <SpinnerIcon /> : <UploadIcon />}
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};
