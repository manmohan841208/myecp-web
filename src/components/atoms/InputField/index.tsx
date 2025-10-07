import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"; // Import the base Input component
import Image from "@/components/atoms/Image";

interface InputFieldProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconLeft,
  iconRight,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          "text-sm font-medium",
          error ? "text-[var(--text-error)]" : "text-[var(--text]"
        )}
      >
        {label}
      </label>

      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-grey-medium)]">
            {iconLeft}
          </div>
        )}
        <Input
          className={cn(
            "pl-4",
            iconLeft && "pl-10",
            iconRight && "pr-10",
            error &&
              "border-[var(--error-border)] focus-visible:border-[var(--error-border)]",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-grey-medium)]">
            <Image src={iconRight as string} alt="img" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-[var(--text-error)]">{error}</p>}
    </div>
  );
};

export { InputField };
