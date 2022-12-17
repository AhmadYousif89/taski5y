import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
}

export const Button = ({
  onClick,
  label,
  icon,
  className,
  isDisabled = false,
  type = 'button',
}: IButton) => {
  const cursorStyle = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      disabled={isDisabled}
      className={`${cursorStyle} ${className} flex min-w-[11rem] items-center justify-center gap-4 rounded-md px-6 py-3 text-2xl text-color-base transition-transform hover:ring-2 hover:ring-color-highlight active:translate-y-1 max-xs:ring-1 max-xs:ring-color-highlight`}
      onClick={onClick}
      type={type}>
      {icon} {label}
    </button>
  );
};
