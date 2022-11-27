import { useAppDispatch } from '@app/hooks';
import { toggleSideMenu } from '@features/slices/ui';
import { resetTasks } from '@features/slices/task';
import { resetUser } from '@features/slices/user';
import { signOut } from '@features/services/auth';
import { LogoutIcon } from 'assets/icons';
import { Button } from '@ui/button';

export const Logout = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(signOut());
    dispatch(resetUser());
    dispatch(resetTasks());
    dispatch(toggleSideMenu());
  };

  return <Button label="Logout" icon={<LogoutIcon />} onClick={() => logoutHandler()} />;
};
