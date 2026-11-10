import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import type { LegalDocumentProps } from "../interface/LegalDocumentProps";

// Prose styles live on the article so the documents can be written as plain
// <p>, <ul>, <a> and <strong> without repeating classes on every element.
const PROSE =
  "text-[15px] font-medium leading-relaxed text-textSecondary md:text-base [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primaryPressed [&_h3]:mt-5 [&_h3]:font-extrabold [&_h3]:text-textPrimary [&_li]:pl-1 [&_p]:mt-3 [&_strong]:font-extrabold [&_strong]:text-textPrimary [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";

const LegalDocument = ({ title, effectiveDate, lede, children }: LegalDocumentProps) => (
  <article>
    <header className="text-center md:text-left">
      <Badge tone="brand" size="sm" className="uppercase tracking-widest">
        Legal
      </Badge>
      <h1 className="mt-4 text-[clamp(34px,7vw,48px)] font-black leading-[1.05] tracking-tight text-textPrimary">
        {title}
      </h1>
      <p className="mt-3 text-sm font-bold text-textMuted">Effective date: {effectiveDate}</p>
    </header>

    <Card padding="lg" radius="xl" className={`mt-8 ${PROSE}`}>
      <p className="mt-0! text-base font-semibold text-textPrimary md:text-lg">{lede}</p>
      {children}
    </Card>
  </article>
);

export default LegalDocument;
