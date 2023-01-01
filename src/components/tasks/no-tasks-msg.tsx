import { FC } from 'react';

export const NoTasksMsg: FC<{ msg: string }> = ({ msg }) => {
  return <h2 className="mt-8 text-center text-3xl text-color-base">{msg}</h2>;
};
