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
  type,
}: IButton) => {
  return (
    <button
      disabled={shouldDisable}
      className={`${
        shouldDisable ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className} rounded-md px-6 py-3 ring-color-base transition-transform hover:ring-1 hover:ring-color-base active:translate-y-1`}
      onClick={onClick}
      type={type}>
      <span className="flex items-center gap-4 text-2xl text-color-base">
        {icon} {label}
      </span>
    </button>
  );
};
