import React from "react";
import { Button as UIButton } from "@/components/ui/button";

type UIButtonVariant =
  | "default"
  | "secondary"
  | "primary"
  | "disable"
  | "outline"
  | null
  | undefined;


interface ButtonProps {
  variant?: UIButtonVariant;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className,
}) => {
  return (
    <UIButton variant={variant} onClick={onClick} className={className}>
      {children}
    </UIButton>
  );
};

export default Button;
