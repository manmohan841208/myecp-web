
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className,
  type = "submit", 
}) => {
  return (
    <UIButton variant={variant} onClick={onClick} className={className} type={type}>
      {children}
    </UIButton>
  );
};

export default Button;
