import type { VariantProps } from "class-variance-authority";
import type { progressBarVariants } from "../ProgressBar";

export interface ProgressBarProps extends VariantProps<typeof progressBarVariants> {
  value: number;
  max: number;
  /** Accessible name, e.g. "Water, 5 of 8 cups". */
  label: string;
  className?: string;
}
