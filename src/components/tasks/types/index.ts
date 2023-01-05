type TaskFormValues = {
  name: TaskInputNames;
  value: string;
};
export type TaskFormValidation = {
  type: TaskInputNames;
  isValid: boolean;
};
export type TaskInputNames = 'title' | 'details' | 'status' | 'priority';
export type GetTaskFormValues = ({ name, value }: TaskFormValues) => void;
export type GetTaskFormValidation = ({ type, isValid }: TaskFormValidation) => void;
export type TaskFormProps = {
  getValidity: GetTaskFormValidation;
  getValue: GetTaskFormValues;
};
