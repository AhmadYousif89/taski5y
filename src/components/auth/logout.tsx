import { useAppDispatch } from 'app/hooks';
import { LogoutIcon } from 'assets/icons';
import { Button } from 'components/ui';

import { signOut } from 'features/services/auth';
import { resetTasks } from 'features/slices/task';
import { toggleSideMenu } from 'features/slices/ui';
import { setAuthActionType } from 'features/slices/auth';

export const Logout = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(signOut());
    dispatch(resetTasks());
    dispatch(toggleSideMenu());
    dispatch(setAuthActionType('logout'));
  };

  return (
    <div className="mt-8 self-end">
      <Button label="Logout" icon={<LogoutIcon />} onClick={() => logoutHandler()} />
    </div>
  );
};
