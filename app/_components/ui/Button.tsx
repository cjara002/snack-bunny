import { cva } from "class-variance-authority";
import type { ButtonProps } from "./interface/ButtonProps";

// Exported so links that look like buttons (<a className={buttonVariants()}>)
// share the exact same styling instead of re-declaring it.
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold whitespace-nowrap transition-[background-color,transform,box-shadow] duration-200 ease-(--ease-bounce) active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      intent: {
        primary: "bg-primary text-secondary shadow-cta hover:bg-primaryPressed",
        secondary: "bg-secondary text-textPrimary shadow-warmSm hover:bg-surfaceTertiary",
        ghost: "bg-transparent text-textPrimary hover:bg-surfaceTertiary",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: { intent: "primary", size: "md" },
  },
);

const Button = ({ intent, size, fullWidth, className, type = "button", ...rest }: ButtonProps) => (
  <button type={type} className={buttonVariants({ intent, size, fullWidth, className })} {...rest} />
);

export default Button;
