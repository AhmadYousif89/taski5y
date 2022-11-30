import { useAppDispatch } from '@app/hooks';
import { toggleSideMenu } from '@features/slices/ui';
import { resetTasks } from '@features/slices/task';
import { signOut } from '@features/services/auth';
import { LogoutIcon } from 'assets/icons';
import { Button } from '@ui/button';

export const Logout = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(signOut());
    dispatch(resetTasks());
    dispatch(toggleSideMenu());
  };

  return <Button label="Logout" icon={<LogoutIcon />} onClick={() => logoutHandler()} />;
};
