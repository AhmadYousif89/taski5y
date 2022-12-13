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
      className={`${style} ${className} flex min-w-[11rem] items-center justify-center gap-4 rounded-md px-6 py-3 text-2xl text-color-base transition-transform hover:ring-2 hover:ring-color-highlight active:translate-y-1 max-xs:ring-1 max-xs:ring-color-highlight`}
      onClick={onClick}
      type={type}>
      {icon} {label}
    </button>
  );
};
