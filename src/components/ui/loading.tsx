import { SpinnerIcon } from 'assets/icons';

export const Loading = ({ className = '' }) => {
  return (
    <div className={`${className} flex-center gap-4 text-amber-500`}>
      <SpinnerIcon className="h-8 w-8" />
      <span>Loading</span>
    </div>
  );
};
