import { AuthInputNames } from '@auth/types';
import { TaskInputNames } from '@tasks/types';
import { useState } from 'react';

type FormValidity = Record<AuthInputNames | TaskInputNames, boolean>;

type FormValues = Record<AuthInputNames | TaskInputNames, string>;

const initFormValues: FormValues = {
  name: '',
  email: '',
  password: '',
  title: '',
  details: '',
  priority: '',
  status: '',
  confirmPassword: '',
};
const initFormValidity: FormValidity = {
  name: false,
  email: false,
  password: false,
  title: false,
  details: false,
  priority: false,
  status: false,
  confirmPassword: false,
};

export const useForm = () => {
  const [formValidity, setFormValidity] = useState(initFormValidity);
  const [formValues, setFormValues] = useState<FormValues>(initFormValues);

  const getInputValidity = <T extends Record<string, string | boolean>>(input: T) => {
    setFormValidity(prevState => ({
      ...prevState,
      [input.type as string]: input.isValid,
    }));
  };

  const getInputValue = <T extends Record<string, string>>(input: T): void => {
    setFormValues(prevState => ({
      ...prevState,
      [input.name]: input.value,
    }));
  };

  return {
    getInputValue,
    getInputValidity,
    formValues,
    formValidity,
  };
};
