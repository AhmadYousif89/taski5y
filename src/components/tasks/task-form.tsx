import { FormEvent, useState } from 'react';
import { useAppDispatch } from '@app/hooks';

import { useForm } from 'hooks/use-form';
import { TitleInput } from './title-input';
import { StatusInput } from './status-input';
import { DetailsInput } from './details-input';
import { PriorityInput } from './priority-input';
import { addNewTask } from '@features/services/tasks';
import { TaskPriority, TaskStatus } from '@features/types';
import { TaskStats } from './task-stats';

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { getInputValidity, getInputValue, formValues, formValidity } = useForm();

  const { title, details, status, priority } = formValues;
  const { title: titleIsValid, details: detailsIsValid } = formValidity;
  const formIsValid = [titleIsValid, detailsIsValid].every(Boolean);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    const newTask = {
      title: title.trim(),
      details: details.trim(),
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
        <fieldset>
          <TitleInput
            getValue={getInputValue}
            getValidity={getInputValidity}
            isFormSubmitted={isSubmitted}
          />
        </fieldset>

        <fieldset>
          <DetailsInput
            getValue={getInputValue}
            getValidity={getInputValidity}
            isFormSubmitted={isSubmitted}
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <fieldset
            className="
          rounded-md px-6 capitalize text-color-base
          shadow-md ring-1 ring-color-base">
            <StatusInput isFormSubmitted={isSubmitted} getValue={getInputValue} />
          </fieldset>

          <fieldset
            className="
          rounded-md px-6 capitalize text-color-base
          shadow-md ring-1 ring-color-base">
            <PriorityInput isFormSubmitted={isSubmitted} getValue={getInputValue} />
          </fieldset>
        </div>

        <fieldset>
          <button
            className={`w-full cursor-pointer rounded-md bg-transparent px-6 py-4 text-3xl capitalize text-color-base shadow-md ring-1 ring-color-base transition-all active:translate-y-1`}>
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
