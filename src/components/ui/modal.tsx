import { SpinnerIcon } from 'assets/icons';

export const Modal = () => {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 flex h-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 flex-col bg-color-card bg-opacity-70">
      <h3 className="center-absolute pb-64 text-5xl text-color-base">
        Loading Tasks ...
      </h3>
      <div className="center-absolute text-color-base [&>*]:h-24 [&>*]:w-24">
        <SpinnerIcon />
      </div>
    </div>
  );
};
