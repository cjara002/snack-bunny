import Card from "@/app/_components/ui/Card";
import IconChip from "@/app/_components/ui/IconChip";
import SectionIntro from "./SectionIntro";
import { PILLAR_FEATURES } from "../constants/content";
import type { PillarFeature } from "../interface/PillarFeature";

const renderFeature = ({ id, title, body, icon, tone }: PillarFeature) => (
  <li key={id}>
    {/* A compact row on phones, a tile from sm up */}
    <Card padding="md" radius="xl" className="flex h-full gap-4 sm:block sm:p-7">
      <IconChip icon={icon} tone={tone} size="lg" />
      <div>
        <h3 className="text-lg font-black text-textPrimary sm:mt-5 sm:text-xl">{title}</h3>
        <p className="mt-1 text-[15px] font-semibold leading-relaxed text-textMuted sm:mt-2 sm:text-base">{body}</p>
      </div>
    </Card>
  </li>
);

const PillarsSection = () => (
  <section id="features" aria-labelledby="features-heading" className="scroll-mt-24 py-16 md:py-24">
    <SectionIntro
      id="features-heading"
      eyebrow="One gentle check-in"
      title="Everything that keeps you going, in one place."
      lede="Quick logs, no spreadsheets. Each one gives your bunny a little more to go on."
    />
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">{PILLAR_FEATURES.map(renderFeature)}</ul>
  </section>
);

export default PillarsSection;
