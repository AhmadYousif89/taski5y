import { FormEvent, useState } from 'react';
import { useAppDispatch } from '@app/hooks';

import { TaskInputNames } from './types';
import { TaskStats } from './task-stats';
import { useForm } from 'hooks/use-form';
import { GetInputValues, Input } from '@ui/input';
import { GetSelectValues, Select } from '@ui/select';
import { TaskPriority, TaskStatus } from '@features/types';
import { addNewTask } from '@features/services/tasks';

type FormValidity = Record<TaskInputNames, boolean>;
type FormValues = Record<TaskInputNames, string>;

const initFormValidity: FormValidity = {
  title: false,
  details: false,
  priority: false,
  status: false,
};
const initFormValues: FormValues = { title: '', details: '', priority: '', status: '' };

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const { title, details, status, priority } = formValues;
  const { title: titleIsValid, details: detailsIsValid } = formValidity;
  const formIsValid = [titleIsValid, detailsIsValid].every(Boolean);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newTask = {
      title,
      details,
      status: (status as TaskStatus) || 'Todo',
      priority: (priority as TaskPriority) || 'Normal',
    };
    dispatch(addNewTask(newTask));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <TaskStats />

      <form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
        <fieldset aria-label="task-title-input">
          <Input
            type={'text'}
            name={'title'}
            value={title}
            inputErrMsg={'Required'}
            placeholder={'Task title'}
            placeholderErrMsg={'please enter your task title'}
            isFormSubmitted={isSubmitted}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
            inputValidator={text => text.trim().length > 0}
          />
        </fieldset>

        <fieldset aria-label="task-details-input">
          <Input
            type={'text'}
            name={'details'}
            value={details}
            className={'h-28'}
            inputErrMsg={'Required'}
            placeholder={'Write your task details'}
            placeholderErrMsg={'please enter some details about your task'}
            isFormSubmitted={isSubmitted}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
            inputValidator={text => text.trim().length > 0}
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <fieldset
            aria-label="task-status-input"
            className="text-color-baseshadow-md rounded-md px-6 capitalize ring-1 ring-color-base">
            <Select
              name={'priority'}
              label={'Priority'}
              htmlFor={'priority'}
              isFormSubmitted={isSubmitted}
              optionValues={['High', 'Normal']}
              getValue={getFormValues as GetSelectValues}
            />
          </fieldset>

          <fieldset
            aria-label="task-priority-input"
            className="text-color-baseshadow-md rounded-md px-6 capitalize ring-1 ring-color-base">
            <Select
              name={'status'}
              label={'Status'}
              htmlFor={'status'}
              isFormSubmitted={isSubmitted}
              optionValues={['Todo', 'InProgress']}
              getValue={getFormValues as GetSelectValues}
            />
          </fieldset>
        </div>

        <fieldset>
          <button
            disabled={!formIsValid}
            className={`${
              formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
            } w-full cursor-pointer rounded-md bg-transparent px-6 py-4 text-3xl capitalize text-color-base shadow-md ring-1 ring-color-base transition-all active:translate-y-1`}>
            create task
          </button>
        </fieldset>

        {isSubmitted && (
          <p className="text-center text-2xl text-color-valid">
            New task has been created
          </p>
        )}
      </form>
    </>
  );
};
