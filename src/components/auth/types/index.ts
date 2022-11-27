type AuthFormValidation = {
  type: AuthInputNames;
  isValid: boolean;
};
type AuthFormValues = {
  name: AuthInputNames;
  value: string;
};
export type AuthInputNames = 'name' | 'email' | 'password' | 'confirmPassword';
export type GetAuthFormValues = ({ name, value }: AuthFormValues) => void;
export type GetAuthFormValidation = ({ type, isValid }: AuthFormValidation) => void;
export interface AuthFormProps {
  getValue: GetAuthFormValues;
  getValidity: GetAuthFormValidation;
}
