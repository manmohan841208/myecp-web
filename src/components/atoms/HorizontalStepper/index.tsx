import React from "react";
import Button from "@/components/atoms/Button";

interface HorizontalStepperProps {
  steps: number;
  activeStep: number;
  onStepClick?: (step: number) => void;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  steps,
  activeStep,
  onStepClick,
}) => {
  const stepButtons = Array.from({ length: steps }, (_, index) => {
    const stepNumber = index + 1;
    const isActive = stepNumber === activeStep;

    return (
      <Button
        key={stepNumber}
        className={`flex h-[25px] w-[25px] items-center justify-center rounded-full ${
          isActive ? "bg-[var(--color-blue)] text-white" : "bg-white"
        }`}
        variant={isActive ? "primary" : "outline"}
        onClick={() => onStepClick?.(stepNumber)}
      >
        {stepNumber}
      </Button>
    );
  });

  return (
    <div className="w-full pt-2 pr-6 pl-6">
      <div className="flex h-10 w-full items-center justify-evenly">
        <div className="flex h-[1px] w-4/5 items-center justify-between bg-[var(--color-blue)]">
          {stepButtons}
        </div>
      </div>
    </div>
  );
};

export default HorizontalStepper;