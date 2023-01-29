import { FC } from 'react';
import { User } from 'features/types';
import { UserImage } from './user-image';

const greetUser = (username?: string): string => {
  const date = new Date();
  const hour = date.getHours();
  let greeting = '';

  if (hour >= 0 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return `${greeting} | ${username}`;
};

export const UserInfo: FC<{ user: User | null }> = ({ user }) => {
  const greetMsg = greetUser(user?.name);

  return (
    <section className="my-8 flex flex-col items-center gap-8 text-center text-color-base">
      <UserImage />
      <h2 className="text-3xl capitalize ">{greetMsg}</h2>
      <p className="text-xl">This is your personal task manager</p>
    </section>
  );
};
