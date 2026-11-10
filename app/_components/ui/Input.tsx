import { cva } from "class-variance-authority";
import type { InputProps } from "./interface/InputProps";

export const inputVariants = cva(
  "w-full min-w-0 rounded-full border-2 border-borderSoft bg-secondary font-bold text-textPrimary outline-none transition-colors duration-200 placeholder:font-semibold placeholder:text-textFaint focus:border-primary aria-invalid:border-errorPrimary disabled:opacity-60",
  {
    variants: {
      size: {
        md: "h-12 px-5 text-base",
        lg: "h-14 px-6 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const Input = ({ size, className, ...rest }: InputProps) => (
  <input className={inputVariants({ size, className })} {...rest} />
);

export default Input;
