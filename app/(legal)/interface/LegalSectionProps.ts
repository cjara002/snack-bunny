import type { ReactNode } from "react";

export interface LegalSectionProps {
  /** Anchor id, so a section can be linked to directly, e.g. /privacy#apple-health. */
  id: string;
  title: string;
  children: ReactNode;
}
