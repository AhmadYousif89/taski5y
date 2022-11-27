import { Button } from '@ui/button';
import { HomeIcon } from 'assets/icons/home';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="my-auto flex flex-col gap-20 place-self-center">
      <h1 className="flex gap-4 text-center text-4xl text-color-base">
        <span className="self-end pt-4">Page Not Found</span>
        <span className="scale-150 text-7xl">|</span>
        <span className="self-start pb-4 text-5xl">404</span>
      </h1>
      <Button
        label="Go Home"
        className="flex justify-center"
        onClick={() => navigate('/')}
        icon={<HomeIcon />}
      />
    </div>
  );
};
