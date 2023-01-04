import { useCallback, useState } from 'react';
import {
  InputPropObj,
  SelectPropObj,
  GetInputValues,
  GetSelectValues,
  GetInputValidation,
} from 'components/ui';

type Form<TV1, TV2> = { initFormValidity: TV1; initFormValues: TV2 };

export const useForm = <TypeValidity, TypeValue>({
  initFormValidity,
  initFormValues,
}: Form<TypeValidity, TypeValue>) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const [formValidity, setFormValidity] = useState(initFormValidity);

  const getFormValidity: GetInputValidation = useCallback(({ name, isValid }) => {
    setFormValidity(prevState => ({
      ...prevState,
      [name]: isValid,
    }));
  }, []);

  type FormValuesProps = InputPropObj | SelectPropObj;

  const getFormValues: GetInputValues | GetSelectValues = useCallback(
    ({ name, value }: FormValuesProps) => {
      setFormValues(prevState => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  return { formValidity, getFormValidity, formValues, getFormValues };
};
