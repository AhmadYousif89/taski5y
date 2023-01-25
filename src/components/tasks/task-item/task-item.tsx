import { FC, useEffect, useState } from 'react';

import { Task } from 'features/types';
import { TaskProvider } from './context';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateTask } from 'features/services/tasks';

import { TaskInfo } from './task-info';
import { DisplayTaskTime } from './display-time';
import { TaskDeleteButton } from './delete-button';
import { SwitchTaskStatus } from './switch-status';
import { DetailsSection } from './details-section';
import { TaskUpdateButtons } from './update-buttons';
import { ActionModal, Backdrop, Button, Card, Loading, Timer, useTimer } from 'components/ui';
import { transformDateToISO, transformISOToDate } from 'helpers';
import { setTaskActionType, taskSelector } from 'features/slices/task';

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

  const time = transformDateToISO(timer);
  const formattedTime = transformISOToDate(time);

  const updateTaskTime = async () => {
    if (task.isExpired || time == null) {
      setErrMsg('Time is too short');
      return;
    }
    try {
      setErrMsg('');
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

  return (
    <TaskProvider>
      {modal && (
        <>
          <ActionModal
            showWarning={false}
            title="set task timer"
            confirmAction={updateTaskTime}
            closeModal={onCloseModal}
            msg={actionType === 'updating' ? <Loading /> : errMsg}
            icon={
              <Timer getValues={getTimerValues} isSubmitted={actionType === 'update_success'} />
            }
          />
          <Backdrop onClick={() => setModal(false)} />
        </>
      )}
      <Card
        priority={task.priority}
        className={`relative ${styles} ${transition} h-fit transition-transform duration-500`}>
        <li className="flex -translate-y-0 flex-col gap-6 py-6 px-2 text-color-base md:text-3xl">
          <header className="relative flex items-center justify-between">
            <h2 className="text-3xl tracking-wide">{task.title}</h2>
            <TaskInfo task={task} />
          </header>

          <DetailsSection isExpired={task.isExpired} taskDetails={task.details} />

          <footer className="mt-12 flex justify-between gap-4">
            <div className="relative flex w-full flex-col justify-between">
              {!task.isExpired && <SwitchTaskStatus taskId={task.id} taskStatus={task.status} />}
              {task.expireDate ? (
                <div
                  onClick={() => {
                    if (!task.isExpired) setModal(true);
                  }}
                  className={`absolute bottom-0 w-max`}>
                  <DisplayTaskTime task={task} />
                </div>
              ) : (
                <Button onClick={() => setModal(true)} className="self-start">
                  Set timer
                </Button>
              )}
            </div>
            <div className="flex flex-col justify-between gap-4">
              {!task.isExpired && <TaskUpdateButtons taskId={task.id} />}
              <TaskDeleteButton taskId={task.id} />
            </div>
          </footer>
        </li>
      </Card>
    </TaskProvider>
  );
};
