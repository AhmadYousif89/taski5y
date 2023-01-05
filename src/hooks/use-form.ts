import { useCallback, useState } from 'react';
import {
  InputPropObj,
  SelectPropObj,
  GetInputValues,
  GetSelectValues,
  GetInputValidation
} from 'components/ui';

type FormInput<T1, T2> = { initFormValues: T1; initFormValidity: T2 };

/**
 * A custom hook that manages form values and validity.
 * @template TypeValue - The type of the form values object.
 * @template TypeValidity - The type of the form validity object.
 * @param {FormInput<TypeValue, TypeValidity>} object containing the initial form values and validity.
 * @property {TypeValidity} initFormValidity - The initial form validity object.
 * @property {TypeValue} initFormValues - The initial form values object.
 * @returns {Object} An object containing the form values, a function to update the form values, the form validity, and a function to update the form validity.
 * @property {TypeValue} formValues - Object representing the current form values foreach input.
 * @property {Function} getFormValues - A function to update the form values.
 * @property {TypeValidity} formValidity - Object representing the current form validity foreach input.
 * @property {Function} getFormValidity - A function to update the form validity.
 * @example
 * type FormValues = { email: string }
 * type FormValidity = { email: boolean }
 * const initFormValues: FormValues = { email: '' }
 * const initFormValidity: FormValidity = { email: false }
 * const { formValues, getFormValues, formValidity, getFormValidity } = useForm<FormValues, FormValidity>({
 *  initFormValues,
 *  initFormValidity,
 * });
 * const emailValue = 'a@a.a'
 * getFormValues({ name: 'email', value: emailValue });
 * getFormValidity({ name: 'email', isValid: emailValue });
 * console.log(`Form values: ${formValues.email}, Form validity: ${formValidity.email}`);
 * // Form values: a@a.a, Form validity: true
 */
export const useForm = <TypeValue, TypeValidity>({
  initFormValues,
  initFormValidity
}: FormInput<TypeValue, TypeValidity>) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const [formValidity, setFormValidity] = useState(initFormValidity);

  const getFormValidity: GetInputValidation = useCallback(({ name, isValid }) => {
    setFormValidity(prevState => ({
      ...prevState,
      [name]: isValid
    }));
  }, []);

  type FormValuesProps = InputPropObj | SelectPropObj;
  type GetFormValues = GetInputValues | GetSelectValues;

  const getFormValues: GetFormValues = useCallback(({ name, value }: FormValuesProps) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  return { formValues, formValidity, getFormValues, getFormValidity };
};
