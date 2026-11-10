import type { VariantProps } from "class-variance-authority";
import type { sectionIntroVariants, sectionTitleVariants } from "../_components/SectionIntro";

export interface SectionIntroProps
  extends VariantProps<typeof sectionIntroVariants>,
    VariantProps<typeof sectionTitleVariants> {
  /** id for the heading, so the section can point aria-labelledby at it. */
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
}
