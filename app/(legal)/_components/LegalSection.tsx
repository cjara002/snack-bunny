import type { LegalSectionProps } from "../interface/LegalSectionProps";

const LegalSection = ({ id, title, children }: LegalSectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="mt-10 scroll-mt-28 border-t border-borderSoft/70 pt-8">
    <h2 id={`${id}-heading`} className="text-xl font-black text-textPrimary md:text-2xl">
      {title}
    </h2>
    {children}
  </section>
);

export default LegalSection;
