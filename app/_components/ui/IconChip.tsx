import { memo } from "react";
import { cva } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconChipProps } from "./interface/IconChipProps";

// A tinted square behind an icon. Pillar tones are for their pillar only;
// brand is coral, inverse sits on the dark accent surface.
export const iconChipVariants = cva("grid shrink-0 place-items-center", {
  variants: {
    tone: {
      calories: "bg-pillarCalories/15 text-pillarCalories",
      water: "bg-pillarWater/15 text-pillarWater",
      sleep: "bg-pillarSleep/15 text-pillarSleep",
      mood: "bg-pillarMood/15 text-pillarMood",
      steps: "bg-pillarSteps/15 text-pillarSteps",
      brand: "bg-primary/10 text-primary",
      inverse: "bg-secondary/10 text-primary",
    },
    size: {
      sm: "size-6 rounded-lg text-[10px]",
      md: "size-10 rounded-xl text-base",
      lg: "size-12 rounded-2xl text-xl",
    },
  },
  defaultVariants: { tone: "brand", size: "md" },
});

const IconChip = ({ icon, tone, size, className }: IconChipProps) => (
  <span aria-hidden="true" className={iconChipVariants({ tone, size, className })}>
    <FontAwesomeIcon icon={icon} />
  </span>
);

export default memo(IconChip);
