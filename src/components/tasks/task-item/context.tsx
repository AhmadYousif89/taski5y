import {
  FC,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  createContext,
  PropsWithChildren
} from 'react';
import { useAppSelector } from 'app/hooks';
import { taskSelector } from 'features/slices/task';

type InitState = {
  isEditing: boolean;
  isUpdating: boolean;
  showUpdateBtn: boolean;
  updatedDetails: string;
};

const initState: InitState = {
  isEditing: false,
  isUpdating: false,
  showUpdateBtn: false,
  updatedDetails: ''
};
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
const initContext: UseTaskContextType = {
  state: initState,
  updateTaskDetails: text => {},
  setTaskIsUpdating: isUpdating => {},
  setTaskIsEditing: isEditing => {},
  setTaskUpdateBtn: toggleBtn => {}
};

export const TaskContext = createContext<UseTaskContextType>(initContext);

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TaskContext.Provider value={useTaskContext(initState)}>{children}</TaskContext.Provider>;
};

type ReducerAction =
  | { type: 'IS_EDITING'; payload: boolean }
  | { type: 'IS_UPDATING'; payload: boolean }
  | { type: 'SHOW_UPDATE_BTN'; payload: boolean }
  | { type: 'UPDATE_DETAILS'; payload: string };

const taskReducer = (state: InitState, action: ReducerAction) => {
  switch (action.type) {
    case 'IS_EDITING':
      return { ...state, isEditing: action.payload };
    case 'IS_UPDATING':
      return { ...state, isUpdating: action.payload };
    case 'SHOW_UPDATE_BTN':
      return { ...state, showUpdateBtn: action.payload };
    case 'UPDATE_DETAILS':
      return { ...state, updatedDetails: action.payload };
    default: {
      throw new Error('Invalid action type');
    }
  }
};

type UseTaskContextType = ReturnType<typeof useTaskContext>;
const useTaskContext = (initState: InitState) => {
  const [state, dispatch] = useReducer(taskReducer, initState);

  const updateTaskDetails = useCallback((text: string) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: text });
  }, []);

  const setTaskIsUpdating = useCallback((isUpdating: boolean) => {
    dispatch({ type: 'IS_UPDATING', payload: isUpdating });
  }, []);

  const setTaskIsEditing = useCallback((isEditing: boolean) => {
    dispatch({ type: 'IS_EDITING', payload: isEditing });
  }, []);

  const setTaskUpdateBtn = useCallback((toggleBtn: boolean) => {
    dispatch({ type: 'SHOW_UPDATE_BTN', payload: toggleBtn });
  }, []);

  return { state, updateTaskDetails, setTaskIsUpdating, setTaskIsEditing, setTaskUpdateBtn };
};

export const useTaskItem = () => {
  const { status } = useAppSelector(taskSelector);
  const { state, setTaskIsEditing, updateTaskDetails } = useContext(TaskContext);
  const { setTaskIsUpdating, setTaskUpdateBtn } = useContext(TaskContext);

  useEffect(() => {
    if (status === 'fulfilled') {
      setTaskIsUpdating(false);
      setTaskUpdateBtn(false);
    }
  }, [setTaskIsUpdating, setTaskUpdateBtn, status]);

  return { state, setTaskIsEditing, updateTaskDetails, setTaskIsUpdating, setTaskUpdateBtn };
};
