import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: JSX.Element;
  shouldDisable?: boolean;
}

export const Button = ({
  onClick,
  label,
  icon,
  className,
  shouldDisable = false,
  type = 'button',
}: IButton) => {
  const style = shouldDisable ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      disabled={shouldDisable}
      className={`${style} ${className} flex min-w-[11rem] items-center justify-center gap-4 rounded-md px-6 py-3 text-2xl text-color-base ring-color-base transition-transform hover:ring-1 hover:ring-color-base active:translate-y-1`}
      onClick={onClick}
      type={type}>
      {icon} {label}
    </button>
  );
};
