import type { ReactNode } from "react";

export interface LegalDocumentProps {
  title: string;
  effectiveDate: string;
  /** Opening paragraph shown under the title. */
  lede: ReactNode;
  children: ReactNode;
}
