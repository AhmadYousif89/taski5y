import { FormEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TaskIcon, CheckMarkIcon, SpinnerIcon } from 'assets/icons';
import { GetInputValues, Select, GetSelectValues, Input } from 'components/ui';

import { addNewTask } from 'features/services/tasks';
import { TaskStatus, TaskPriority } from 'features/types';
import { taskSelector, resetTaskStatus } from 'features/slices/task';

import { useForm } from 'hooks';
import { wait } from 'helpers/wait';
import { TaskStats } from './task-stats';
import { TaskInputNames } from './types';
import { TextArea } from 'components/ui/textarea';

type FormValidity = Record<TaskInputNames, boolean>;
type FormValues = Record<TaskInputNames, string>;

const initFormValidity: FormValidity = {
  title: false,
  details: false,
  priority: false,
  status: false
};
const initFormValues: FormValues = { title: '', details: '', priority: '', status: '' };

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(taskSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { formValidity, formValues, getFormValidity, getFormValues } = useForm<
    FormValues,
    FormValidity
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
      priority: (priority as TaskPriority) || 'Normal'
    };
    setIsSubmitted(true);
    dispatch(addNewTask(newTask));
    wait(() => {
      setIsSubmitted(false);
      dispatch(resetTaskStatus());
    });
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
          <TextArea
            id={'details'}
            name={'details'}
            value={details}
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
              options={['High', 'Normal']}
              isFormSubmitted={isSubmitted}
              getValue={getFormValues as GetSelectValues}
            />
          </fieldset>

          <fieldset
            aria-label="task-priority-input"
            className="text-color-baseshadow-md rounded-md px-6 capitalize ring-1 ring-color-base">
            <Select
              name={'status'}
              label={'Status'}
              options={['Todo', 'InProgress']}
              isFormSubmitted={isSubmitted}
              getValue={getFormValues as GetSelectValues}
            />
          </fieldset>
        </div>

        <fieldset>
          <button
            title="create new task"
            disabled={!formIsValid}
            className={`${
              formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
            } flex-center w-full cursor-pointer gap-4 rounded-md bg-transparent px-6 py-4 text-3xl capitalize text-color-base shadow-md ring-1 ring-color-base transition-all active:translate-y-1`}>
            <span>create task</span>
            <TaskIcon />
          </button>
        </fieldset>

        {isSubmitted && status === 'fulfilled' ? (
          <p className="flex-center absolute -bottom-16 left-1/2 w-full -translate-x-1/2 gap-2 text-center text-2xl text-color-valid">
            <CheckMarkIcon />
            <span>New task created</span>
          </p>
        ) : null}

        {isSubmitted && status === 'loading' ? (
          <p className="flex-center absolute -bottom-16 left-1/2 w-full -translate-x-1/2 gap-2 text-center text-2xl text-color-valid">
            <SpinnerIcon className="h-10 w-10" />
            <span>creating new task</span>
          </p>
        ) : null}
      </form>
    </>
  );
};
