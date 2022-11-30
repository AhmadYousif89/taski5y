import { SpinnerIcon } from 'assets/icons';

export const Modal = () => {
  return (
    <div className="fixed top-0 left-0 z-50 min-h-screen w-full bg-black bg-opacity-25 text-5xl">
      <div className="center-absolute text-green-400 [&>*]:h-28 [&>*]:w-28">
        <SpinnerIcon />
      </div>
    </div>
  );
};
