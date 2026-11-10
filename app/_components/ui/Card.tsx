import { cva } from "class-variance-authority";
import type { CardProps } from "./interface/CardProps";

export const cardVariants = cva("bg-secondary", {
  variants: {
    padding: {
      none: "",
      xs: "p-2.5",
      sm: "p-3",
      md: "p-4",
      lg: "p-6 md:p-8",
    },
    radius: {
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
    },
    elevation: {
      sm: "shadow-warmSm",
      md: "shadow-warmMd",
      lg: "shadow-warmLg",
    },
  },
  defaultVariants: { padding: "md", radius: "lg", elevation: "sm" },
});

const Card = ({ padding, radius, elevation, className, ...rest }: CardProps) => (
  <div className={cardVariants({ padding, radius, elevation, className })} {...rest} />
);

export default Card;
