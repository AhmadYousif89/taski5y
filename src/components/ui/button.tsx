import { FC, PropsWithChildren } from 'react';

type ButtonProps = {
  label?: string;
  title?: string;
  className?: string;
  type?: 'button' | 'submit';
  icon?: JSX.Element;
  isDisabled?: boolean;
  onClick?: () => void;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  icon,
  title,
  label,
  onClick,
  children,
  className,
  isDisabled = false,
  type = 'button',
}) => {
  const cursorStyle = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={isDisabled}
      className={`${cursorStyle} ${className} flex-center gap-4 rounded-md px-6 py-3 text-2xl text-color-base transition-transform hover:ring-2 hover:ring-color-highlight focus:bg-color-card active:translate-y-1 max-xs:ring-1 max-xs:ring-color-highlight`}>
      {children} {icon} {label}
    </button>
  );
};
