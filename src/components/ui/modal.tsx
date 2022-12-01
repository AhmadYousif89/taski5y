import { SpinnerIcon } from 'assets/icons';
import { Card } from './card';

export const Modal = ({ msg }: { msg: string }) => {
  return (
    <Card className="fixed top-1/2 left-1/2 z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-neutral-700 bg-opacity-10">
      <div className="center-absolute flex h-1/4 w-2/3 max-w-7xl items-center justify-center gap-8 rounded-lg bg-color-card text-color-base lg:h-1/3">
        <div className="[&>*]:h-12 [&>*]:w-12 sm:[&>*]:h-16 sm:[&>*]:w-16">
          <SpinnerIcon />
        </div>
        <h3 className="text-3xl sm:text-4xl">{msg}</h3>
      </div>
    </Card>
  );
};
