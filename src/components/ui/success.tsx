import { FC, PropsWithChildren } from 'react';
import { CheckMarkIcon } from 'assets/icons';

export const Success: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-center gap-4 text-green-400">
      {children}
      <CheckMarkIcon className="h-9 w-9 text-green-400" />
    </div>
  );
};
