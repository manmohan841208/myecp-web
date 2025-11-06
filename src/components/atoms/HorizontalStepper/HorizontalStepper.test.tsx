import React from "react";
import { render, screen } from "@testing-library/react";
import HorizontalStepper from "./index";

describe("HorizontalStepper Component", () => {
  const defaultProps = {
    steps: 4,
    activeStep: 1,
    onStepClick: jest.fn(),
  };

  it("renders the correct number of step buttons", () => {
    render(<HorizontalStepper {...defaultProps} />);
    const stepButtons = screen.getAllByRole("button");
    expect(stepButtons).toHaveLength(defaultProps.steps);
    stepButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(`${index + 1}`);
    });
  });

  it("renders the active step with correct styles", () => {
    render(<HorizontalStepper {...defaultProps} />);
    const activeButton = screen.getByText(`${defaultProps.activeStep}`);
    expect(activeButton).toHaveClass("bg-[var(--color-blue)]");
    expect(activeButton).toHaveClass("text-white");
  });

  it("renders inactive steps with correct styles", () => {
    render(<HorizontalStepper {...defaultProps} />);
    const inactiveButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.textContent !== `${defaultProps.activeStep}`);
    inactiveButtons.forEach((btn) => {
      expect(btn).toHaveClass("bg-white");
    });
  });

  it("calls onStepClick when a step is clicked", () => {
    render(<HorizontalStepper {...defaultProps} />);
    const secondStep = screen.getByText("2");
    secondStep.click();
    expect(defaultProps.onStepClick).toHaveBeenCalledWith(2);
  });
});