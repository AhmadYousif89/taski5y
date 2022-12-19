import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';

import { TaskInputNames } from './types';
import { TaskStats } from './task-stats';
import { useForm } from 'hooks/use-form';
import { GetInputValues, Input } from '@ui/input';
import { GetSelectValues, Select } from '@ui/select';
import { CheckMarkIcon, SpinnerIcon, TaskIcon } from 'assets/icons';
import { addNewTask } from '@features/services/tasks';
import { TaskPriority, TaskStatus } from '@features/types';
import { resetTaskStatus, taskSelector } from '@features/slices/task';

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
  const { status } = useAppSelector(taskSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValidity,
    FormValues
  >({ initFormValidity, initFormValues });

  const { title, details, status: statusValue, priority } = formValues;
  const { title: titleIsValid, details: detailsIsValid } = formValidity;
  const formIsValid = [titleIsValid, detailsIsValid].every(Boolean);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newTask = {
      title,
      details,
      status: (statusValue as TaskStatus) || 'Todo',
      priority: (priority as TaskPriority) || 'Normal',
    };
    setIsSubmitted(true);
    dispatch(addNewTask(newTask));
    setTimeout(() => {
      setIsSubmitted(false);
      dispatch(resetTaskStatus());
    }, 3000);
  };

  return (
    <>
      <TaskStats />

      <form className="relative flex flex-col gap-10" onSubmit={onFormSubmit}>
        <fieldset aria-label="task-title-input">
          <Input
            id={'title'}
            type={'text'}
            name={'title'}
            value={title}
            inputErrMsg={'Required'}
            placeholder={'Task title'}
            placeholderErrMsg={'please enter your task title'}
            isFormSubmitted={isSubmitted}
            getValidity={getFormValidity}
            getValue={getFormValues as GetInputValues}
          />
        </fieldset>

        <fieldset aria-label="task-details-input">
          <Input
            id={'details'}
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
            } flex-center w-full cursor-pointer gap-4 rounded-md bg-transparent px-6 py-4 text-3xl capitalize text-color-base shadow-md ring-1 ring-color-base transition-all active:translate-y-1`}>
            <span>create task</span>
            <TaskIcon />
          </button>
        </fieldset>

        {isSubmitted && status === 'fulfilled' ? (
          <p className="flex-center absolute -bottom-20 -left-24 w-full gap-2 text-center text-2xl text-color-valid xs:left-1/2 xs:-translate-x-1/2">
            <CheckMarkIcon />
            <span>New task created</span>
          </p>
        ) : null}

        {isSubmitted && status === 'loading' ? (
          <p className="flex-center absolute -bottom-20 -left-24 w-full gap-2 text-center text-2xl text-color-valid xs:left-1/2 xs:-translate-x-1/2">
            <SpinnerIcon className="h-10 w-10" />
            <span>creating new task</span>
          </p>
        ) : null}
      </form>
    </>
  );
};
