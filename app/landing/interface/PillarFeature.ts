import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { IconChipProps } from "@/app/_components/ui/interface/IconChipProps";

export interface PillarFeature {
  id: string;
  title: string;
  body: string;
  icon: IconDefinition;
  tone: NonNullable<IconChipProps["tone"]>;
}
