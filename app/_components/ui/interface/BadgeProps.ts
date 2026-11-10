import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "../Badge";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Background class for an optional leading status dot, e.g. "bg-pillarSleep". */
  dotClassName?: string;
}
