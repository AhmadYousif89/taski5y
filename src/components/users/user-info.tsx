import { User } from '@features/types';
import { UserImage } from './user-image';

export const UserInfo = ({ user }: { user: User | null }) => {
  return (
    <section className="my-8 flex flex-col items-center gap-8 text-color-base">
      <UserImage />
      <h2 className="text-3xl capitalize">
        welcome, <span>{user?.name}</span>
      </h2>
      <p className="text-xl">This is your personal task manager</p>
    </section>
  );
};
