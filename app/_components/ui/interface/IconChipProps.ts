import type { VariantProps } from "class-variance-authority";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { iconChipVariants } from "../IconChip";

export interface IconChipProps extends VariantProps<typeof iconChipVariants> {
  icon: IconDefinition;
  className?: string;
}
