import { FormEvent, useEffect, useState } from 'react';

import {
  Timer,
  useTimer,
  Input,
  Select,
  Button,
  Loading,
  TextArea,
  GetInputValues,
  GetSelectValues,
  GetInputValidation
} from 'components/ui';

import { useForm } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addNewTask } from 'features/services/tasks';
import { TaskStatus, TaskPriority } from 'features/types';
import { taskSelector, setTaskActionType } from 'features/slices/task';

import { TaskIcon } from 'assets/icons';
import { TaskStats } from './task-stats';
import { TaskInputNames } from './types';
import { timerValuesToISO } from 'helpers';

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
  const { timer, getTimerValues } = useTimer();

  const { title, details, status: statusValue, priority } = formValues;
  const { title: titleIsValid, details: detailsIsValid } = formValidity;
  const formIsValid = [titleIsValid, detailsIsValid].every(Boolean);

  const time = timerValuesToISO(timer);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newTask = {
      title,
      details,
      expireDate: time,
      status: (statusValue as TaskStatus) || 'Todo',
      priority: (priority as TaskPriority) || 'Normal'
    };
    setIsSubmitted(true);
    try {
      dispatch(setTaskActionType('creating'));
      const result = await dispatch(addNewTask(newTask)).unwrap();
      if (result) dispatch(setTaskActionType('create_success'));
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      setIsSubmitted(false);
    }
  }, [dispatch, status]);

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
            getValidity={getFormValidity as GetInputValidation}
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
            getValidity={getFormValidity as GetInputValidation}
            getValue={getFormValues as GetInputValues}
          />
        </fieldset>

        <fieldset aria-label="task-date" className="relative">
          <legend className="absolute top-0 z-10 ml-6 -translate-y-4 cursor-default bg-color-card text-xl text-color-base">
            Time to finish
          </legend>
          <div className="flex items-center justify-around rounded-md py-6 px-2 ring-1 ring-color-base">
            <Timer getValues={getTimerValues} isSubmitted={isSubmitted} />
          </div>
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
          <Button
            type={'submit'}
            title="create new task"
            isDisabled={!formIsValid}
            className={`${
              formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
            } flex-center w-full cursor-pointer gap-4 rounded-md bg-transparent px-6 py-4 capitalize text-color-base shadow-md ring-1 ring-color-base transition-all active:translate-y-1`}>
            <span className="text-2xl">
              {isSubmitted && status === 'loading' ? <Loading /> : 'create task'}
            </span>
            {status !== 'loading' && <TaskIcon />}
          </Button>
        </fieldset>
      </form>
    </>
  );
};
