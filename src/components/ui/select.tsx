import { ChangeEvent, FC, useEffect, useState } from 'react';

import { TaskStatus, TaskPriority } from 'features/types';
import { TaskInputNames } from 'components/tasks/types';

type SelectValues = TaskStatus | TaskPriority;
type SelectNames = Exclude<TaskInputNames, 'title' | 'details'>;
export type SelectPropObj = { name: SelectNames; value: SelectValues };
export type GetSelectValues = ({ name, value }: SelectPropObj) => void;

type SelectProps = {
  label: string;
  id?: SelectNames;
  name: SelectNames;
  isFormSubmitted?: boolean;
  getValue: GetSelectValues;
  options: SelectValues[];
};

export const Select: FC<SelectProps> = props => {
  const { id, name, label, getValue, options, isFormSubmitted = false } = props;
  const [selectedValue, setSelectedValue] = useState<string>('');

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedValue(e.target.value);
  const resetSelect = () => setSelectedValue('');

  useEffect(() => {
    getValue({ name, value: selectedValue as SelectValues });
    if (isFormSubmitted) resetSelect();
  }, [isFormSubmitted, selectedValue, name, getValue]);

  const optList = options.map((opt, i) => (
    <option key={i} value={opt}>
      {opt}
    </option>
  ));

  return (
    <>
      <legend className="mb-1 cursor-default bg-color-card text-xl text-color-base">{label}</legend>
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={onSelectChange}
        className="w-full cursor-pointer bg-color-card py-4 text-xl capitalize tracking-wider text-color-base focus:outline-none">
        <option disabled value="">
          Select
        </option>
        {optList}
      </select>
    </>
  );
};
