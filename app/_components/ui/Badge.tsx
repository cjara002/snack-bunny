import { memo } from "react";
import { cva } from "class-variance-authority";
import type { BadgeProps } from "./interface/BadgeProps";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-extrabold whitespace-nowrap",
  {
    variants: {
      tone: {
        surface: "bg-secondary text-textPrimary",
        brand: "bg-primary/10 text-primary",
        muted: "bg-surfaceTertiary text-textMuted",
      },
      size: {
        xs: "px-2 py-0.5 text-[9px]",
        sm: "px-2.5 py-1 text-[11px]",
        md: "px-3.5 py-1.5 text-xs",
      },
      elevation: {
        none: "",
        sm: "shadow-warmSm",
        md: "shadow-warmMd",
      },
      // Not-yet-met signals fade rather than turn red: never an error state.
      dimmed: {
        true: "opacity-60",
      },
    },
    defaultVariants: { tone: "surface", size: "md", elevation: "none" },
  },
);

const Badge = ({ tone, size, elevation, dimmed, dotClassName, className, children, ...rest }: BadgeProps) => (
  <span className={badgeVariants({ tone, size, elevation, dimmed, className })} {...rest}>
    {dotClassName ? <span aria-hidden="true" className={`size-[0.65em] shrink-0 rounded-full ${dotClassName}`} /> : null}
    {children}
  </span>
);

export default memo(Badge);
