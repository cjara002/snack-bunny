import IconChip from "@/app/_components/ui/IconChip";
import SectionIntro from "./SectionIntro";
import { PRINCIPLES } from "../constants/content";
import type { Principle } from "../interface/Principle";

const renderPrinciple = ({ id, title, body, icon }: Principle) => (
  <li key={id} className="flex gap-4">
    <IconChip icon={icon} tone="inverse" size="lg" />
    <div>
      <h3 className="text-lg font-black text-baseSecondary">{title}</h3>
      <p className="mt-1.5 font-semibold leading-relaxed text-baseSecondary/70">{body}</p>
    </div>
  </li>
);

// The dark accent band breaks the cream rhythm, as the app's paywall does.
const PrinciplesSection = () => (
  <section aria-labelledby="principles-heading" className="py-8 md:py-12">
    <div className="rounded-[40px] bg-accent px-6 py-14 md:px-14 md:py-20">
      <SectionIntro
        id="principles-heading"
        tone="inverse"
        eyebrow="Built to be kind"
        title="A companion, not a scale."
        lede="SnackBunny is about how you treat yourself, not how you look. A few rules it never breaks:"
      />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-x-12">{PRINCIPLES.map(renderPrinciple)}</ul>
      <p className="mt-12 text-center text-sm font-bold text-baseSecondary/50">
        SnackBunny is not a medical or weight-loss tool.
      </p>
    </div>
  </section>
);

export default PrinciplesSection;
