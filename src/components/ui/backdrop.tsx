import { useAppDispatch } from '@app/hooks';
import { toggleSideMenu } from '@features/slices/ui';

export const Backdrop = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(toggleSideMenu())}
      className={`
      fixed top-0 left-0 z-20 hidden min-h-screen w-full origin-top bg-color-base bg-opacity-75 transition-all duration-500 md:block`}></div>
  );
};
