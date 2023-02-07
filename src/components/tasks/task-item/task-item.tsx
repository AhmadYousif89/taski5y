import { FC, useEffect, useState } from 'react';

import { Task } from 'features/types';
import { TaskProvider } from './context';
import { updateTask } from 'features/services/tasks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setTaskActionType, taskSelector } from 'features/slices/task';
import { ActionModal, Backdrop, Button, Card, Loading, Timer, useTimer } from 'components/ui';

import { TaskInfo } from './task-info';
import { ClockIcon } from 'assets/icons';
import { DisplayTaskTime } from './display-time';
import { TaskDeleteButton } from './delete-button';
import { SwitchTaskStatus } from './switch-status';
import { DetailsSection } from './details-section';
import { TaskUpdateButtons } from './update-buttons';
import { timerValueToISO, formatISOString } from 'helpers';

export const TaskItem: FC<{ task: Task }> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { actionType } = useAppSelector(taskSelector);
  const [animate, setAnimate] = useState(false);
  const [modal, setModal] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { timer, getTimerValues } = useTimer();

  const styles = task.status === 'InProgress' ? 'ring-1 ring-color-validating' : '';
  const transition = animate
    ? 'translate-y-0 opacity-100 visible'
    : 'translate-y-10 opacity-0 invisible';

  const time = timerValueToISO(timer);
  const formattedTime = formatISOString(time);

  const updateTaskTime = async () => {
    if (time == null) {
      setErrMsg('Time is too short');
      return;
    }
    if (task.isExpired) {
      setErrMsg('Task is expired');
      return;
    }
    try {
      dispatch(setTaskActionType('updating'));
      await dispatch(updateTask({ id: task.id, expireDate: time }));
      dispatch(setTaskActionType('update_success'));
      setErrMsg(`Timer will expire in ${formattedTime}`);
    } catch (err) {
      dispatch(setTaskActionType(''));
    }
  };

  const onCloseModal = () => {
    setModal(false);
    setErrMsg('');
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const modalTitle = (
    <div className=" flex gap-4">
      <span>set task timer</span>
      <ClockIcon />
    </div>
  );

  const displayModal = modal ? (
    <>
      <ActionModal
        title={modalTitle}
        showWarning={false}
        closeModal={onCloseModal}
        confirmAction={updateTaskTime}
        message={actionType === 'updating' ? <Loading className="text-2xl" /> : errMsg}
        figure={
          <Timer
            inModal={true}
            getValues={getTimerValues}
            isSubmitted={actionType === 'update_success'}
          />
        }
      />
      <Backdrop onClick={onCloseModal} />
    </>
  ) : null;

  const displaySwitch = !task.isExpired ? (
    <SwitchTaskStatus taskId={task.id} taskStatus={task.status} />
  ) : null;

  const displayTimer = task.expireDate ? (
    <div
      onClick={() => !task.isExpired && setModal(true)}
      className={`flex flex-col justify-between gap-1 self-start`}>
      <DisplayTaskTime type="timer" task={task} />
    </div>
  ) : (
    <Button onClick={() => setModal(true)} className="self-start">
      Set timer <ClockIcon />
    </Button>
  );

  return (
    <TaskProvider>
      {displayModal}
      <Card
        priority={task.priority}
        className={`relative ${styles} ${transition} transition-transform duration-500`}>
        <li className="flex h-full -translate-y-0 flex-col gap-6 py-6 px-2 text-color-base md:text-3xl">
          <header className="relative flex items-center justify-between">
            <h2 className="h2">{task.title}</h2>
            <TaskInfo task={task} />
          </header>

          <DetailsSection isExpired={task.isExpired} taskDetails={task.details} />

          <footer className="flex h-full items-end gap-4">
            <div className="relative flex w-full flex-col justify-between gap-4">
              {displaySwitch}
              {displayTimer}
            </div>
            <div className="flex flex-col justify-between gap-4">
              {!task.isExpired ? <TaskUpdateButtons taskId={task.id} /> : null}
              <TaskDeleteButton taskId={task.id} />
            </div>
          </footer>
        </li>
      </Card>
    </TaskProvider>
  );
};
