import { User } from '@features/types';

export const UserInfo = ({ user }: { user: User | null }) => {
  return (
    <section className="my-8 flex flex-col items-center gap-8 text-color-base">
      <figure
        onClick={() => ({})}
        className="relative h-36 w-36 cursor-pointer rounded-full bg-user-image">
        <img src={''} alt="" />
        <figcaption className="center-absolute text-6xl capitalize text-color-base">
          {user?.name?.[0]}
        </figcaption>
      </figure>
      <h2 className="text-3xl capitalize">
        welcome, <span>{user?.name}</span>
      </h2>
      <p className="text-xl">This is your personal task manager</p>
    </section>
  );
};
