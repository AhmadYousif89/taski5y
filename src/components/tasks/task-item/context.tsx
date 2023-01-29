import {
  FC,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  PropsWithChildren
} from 'react';
import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

type InitState = {
  isError: boolean;
  isEditing: boolean;
  isUpdating: boolean;
  showUpdateBtn: boolean;
  updatedDetails: string;
};

const initState: InitState = {
  isError: false,
  isEditing: false,
  isUpdating: false,
  showUpdateBtn: false,
  updatedDetails: ''
};
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
const initContext: UseTaskContextType = {
  state: initState,
  resetState: () => {},
  setTaskHasError: isError => {},
  setTaskIsUpdating: isUpdating => {},
  setTaskIsEditing: isEditing => {},
  setTaskUpdateBtn: toggleBtn => {},
  setTaskUpdatedDetails: updatedText => {}
};

export const TaskContext = createContext<UseTaskContextType>(initContext);

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TaskContext.Provider value={useTaskContext(initState)}>{children}</TaskContext.Provider>;
};

type UseTaskContextType = ReturnType<typeof useTaskContext>;
const useTaskContext = (intiState: InitState) => {
  const [isError, setIsError] = useState(intiState.isError);
  const [isEditing, setIsEditing] = useState(intiState.isEditing);
  const [isUpdating, setIsUpdating] = useState(intiState.isUpdating);
  const [showUpdateBtn, setshowUpdateBtn] = useState(intiState.showUpdateBtn);
  const [updatedDetails, setUpdatedDetails] = useState(initState.updatedDetails);

  const setTaskHasError = useCallback((isError: boolean) => setIsError(isError), []);

  const setTaskIsEditing = useCallback((isEditing: boolean) => setIsEditing(isEditing), []);

  const setTaskIsUpdating = useCallback((isUpdating: boolean) => setIsUpdating(isUpdating), []);

  const setTaskUpdateBtn = useCallback((toggleBtn: boolean) => setshowUpdateBtn(toggleBtn), []);

  const setTaskUpdatedDetails = useCallback(
    (updatedText: string) => setUpdatedDetails(updatedText),
    []
  );

  const resetState = useCallback(() => {
    setTaskHasError(false);
    setTaskUpdateBtn(false);
    setTaskIsEditing(false);
    setTaskIsUpdating(false);
  }, [setTaskHasError, setTaskIsEditing, setTaskIsUpdating, setTaskUpdateBtn]);

  const state = { isUpdating, isError, isEditing, showUpdateBtn, updatedDetails };

  return {
    state,
    resetState,
    setTaskHasError,
    setTaskUpdateBtn,
    setTaskIsEditing,
    setTaskIsUpdating,
    setTaskUpdatedDetails
  };
};

export const useTaskItem = () => {
  const { status } = useAppSelector(taskSelector);
  const {
    state,
    resetState,
    setTaskHasError,
    setTaskUpdateBtn,
    setTaskIsEditing,
    setTaskIsUpdating,
    setTaskUpdatedDetails
  } = useContext(TaskContext);

  useEffect(() => {
    if (status === 'fulfilled') resetState();
  }, [resetState, status]);

  return {
    state,
    setTaskHasError,
    setTaskUpdateBtn,
    setTaskIsEditing,
    setTaskIsUpdating,
    setTaskUpdatedDetails
  };
};
