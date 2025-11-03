import React from 'react';
import { Button as UIButton } from '@/components/ui/button';

type UIButtonVariant =
  | 'default'
  | 'secondary'
  | 'primary'
  | 'disable'
  | 'outline'
  | null
  | undefined;

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: UIButtonVariant;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  className?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  variant,
  children,
  onClick,
  className,
  disabled,
  ref,
}) => {
  return (
    <UIButton
      type={type || 'button'}
      variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
      ref={ref}
      onMouseDown={(e: any) => e.preventDefault()}
    >
      {children}
    </UIButton>
  );
};

export default Button;
