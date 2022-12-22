import { ChangeEvent, FC, SelectHTMLAttributes, useEffect, useState } from 'react';
import { TaskStatus, TaskPriority } from '@features/types';
import { TaskInputNames } from '@tasks/types';

type SelectValues = TaskStatus | TaskPriority;
type SelectNames = Exclude<TaskInputNames, 'title' | 'details'>;
export type SelectPropObj = { name: SelectNames; value: SelectValues };
export type GetSelectValues = ({ name, value }: SelectPropObj) => void;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id?: SelectNames;
  name: SelectNames;
  htmlFor: SelectNames;
  optionValues: SelectValues[];
  isFormSubmitted?: boolean;
  getValue: GetSelectValues;
}

export const Select: FC<SelectProps> = props => {
  const {
    id,
    name,
    label,
    htmlFor,
    getValue,
    optionValues,
    isFormSubmitted = false,
  } = props;
  const [selectedValue, setSelectedValue] = useState('');

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedValue(e.target.value);
  const resetSelect = () => setSelectedValue('');

  useEffect(() => {
    getValue({ name, value: selectedValue.trim() as SelectValues });
    if (isFormSubmitted) resetSelect();
  }, [isFormSubmitted, selectedValue]);

  const optList = optionValues.map((opt, i) => (
    <option key={i} value={opt}>
      {opt}
    </option>
  ));

  return (
    <>
      <legend className="bg-color-card text-xl text-color-base">{label}</legend>
      <label htmlFor={htmlFor}>
        <select
          id={id}
          name={name}
          value={selectedValue}
          onChange={onSelectChange}
          className="w-full cursor-pointer bg-color-card py-4 text-2xl capitalize text-color-base focus:outline-none">
          <option value=""></option>
          {optList}
        </select>
      </label>
    </>
  );
};
