import { memo } from "react";
import { cva } from "class-variance-authority";
import type { SectionIntroProps } from "../interface/SectionIntroProps";

export const sectionIntroVariants = cva("max-w-2xl", {
  variants: {
    align: {
      center: "mx-auto text-center",
      start: "text-center md:text-left",
    },
  },
  defaultVariants: { align: "center" },
});

export const sectionTitleVariants = cva(
  "mt-3 text-balance text-[clamp(30px,6vw,44px)] font-black leading-[1.08] tracking-tight",
  {
    variants: {
      tone: {
        default: "text-textPrimary",
        inverse: "text-baseSecondary",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

const sectionLedeVariants = cva("mt-4 text-lg font-semibold leading-relaxed", {
  variants: {
    tone: {
      default: "text-textMuted",
      inverse: "text-baseSecondary/70",
    },
  },
  defaultVariants: { tone: "default" },
});

const SectionIntro = ({ id, eyebrow, title, lede, align, tone, className }: SectionIntroProps) => (
  <div className={sectionIntroVariants({ align, className })}>
    <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
    <h2 id={id} className={sectionTitleVariants({ tone })}>
      {title}
    </h2>
    {lede ? <p className={sectionLedeVariants({ tone })}>{lede}</p> : null}
  </div>
);

export default memo(SectionIntro);
