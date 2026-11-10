import type { InputHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "../Input";

// The native numeric `size` attribute is replaced by the size variant.
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}
