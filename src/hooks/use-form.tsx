import { useState } from 'react';
import { GetInputValidation, GetInputValues, InputPropObj } from '../components/ui/input';
import { GetSelectValues, SelectPropObj } from '../components/ui/select';

type Form<TV1, TV2> = { initFormValidity: TV1; initFormValues: TV2 };

export const useForm = <TypeValidity, TypeValue>({
  initFormValidity,
  initFormValues,
}: Form<TypeValidity, TypeValue>) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const [formValidity, setFormValidity] = useState(initFormValidity);

  const getFormValidity: GetInputValidation = ({ name, isValid }) => {
    setFormValidity(prevState => ({
      ...prevState,
      [name]: isValid,
    }));
  };
  const getFormValues: GetInputValues | GetSelectValues = ({
    name,
    value,
  }: InputPropObj | SelectPropObj) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return { formValidity, getFormValidity, formValues, getFormValues };
};
