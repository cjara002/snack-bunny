import { memo } from "react";
import { cva } from "class-variance-authority";
import type { ProgressBarProps } from "./interface/ProgressBarProps";

// A styled native <progress>, so the fill width needs no inline style and
// screen readers get the value for free.
export const progressBarVariants = cva(
  "block w-full appearance-none overflow-hidden rounded-full border-0 bg-surfaceRaised [&::-webkit-progress-bar]:bg-surfaceRaised [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full",
  {
    variants: {
      tone: {
        calories: "[&::-webkit-progress-value]:bg-pillarCalories [&::-moz-progress-bar]:bg-pillarCalories",
        water: "[&::-webkit-progress-value]:bg-pillarWater [&::-moz-progress-bar]:bg-pillarWater",
        sleep: "[&::-webkit-progress-value]:bg-pillarSleep [&::-moz-progress-bar]:bg-pillarSleep",
        mood: "[&::-webkit-progress-value]:bg-pillarMood [&::-moz-progress-bar]:bg-pillarMood",
        steps: "[&::-webkit-progress-value]:bg-pillarSteps [&::-moz-progress-bar]:bg-pillarSteps",
        protein: "[&::-webkit-progress-value]:bg-macroProtein [&::-moz-progress-bar]:bg-macroProtein",
        carbs: "[&::-webkit-progress-value]:bg-macroCarbs [&::-moz-progress-bar]:bg-macroCarbs",
        fat: "[&::-webkit-progress-value]:bg-macroFat [&::-moz-progress-bar]:bg-macroFat",
      },
      size: {
        sm: "h-1.5",
        md: "h-[7px]",
      },
    },
    defaultVariants: { tone: "calories", size: "sm" },
  },
);

const ProgressBar = ({ value, max, label, tone, size, className }: ProgressBarProps) => (
  <progress
    value={Math.min(value, max)}
    max={max}
    aria-label={label}
    className={progressBarVariants({ tone, size, className })}
  />
);

export default memo(ProgressBar);
