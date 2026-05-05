import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFaceSmile,
  faArrowsRotate,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Reveal from "./Reveal";

interface ValueProp {
  icon: IconDefinition;
  title: string;
  body: string;
}

const VALUE_PROPS: ValueProp[] = [
  {
    icon: faCalculator,
    title: "No counting",
    body: "Calories, macros, points — none of it. Just mindfulness.",
  },
  {
    icon: faFaceSmile,
    title: "A face, not a chart",
    body: "Your bunny's chonk says more than a number ever could.",
  },
  {
    icon: faArrowsRotate,
    title: "Resets daily",
    body: "Midnight wipes the slate. Yesterday isn't a streak you broke.",
  },
  {
    icon: faHeart,
    title: "Never shamed",
    body: "The bunny doesn't lecture. You're an adult.",
  },
];

const WhyItWorksSection = () => (
  <section className="py-14">
    <div className="text-center text-xs font-bold tracking-[0.08em] uppercase text-[#E07A5F] mb-3">
      Why it works
    </div>
    <h2 className="text-center font-black text-[clamp(28px,7vw,38px)] leading-[1.05] tracking-tight text-[#4A3728] mb-9 max-w-[16ch] mx-auto">
      Awareness, not <span className="text-[#E07A5F]">guilt</span>
    </h2>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {VALUE_PROPS.map(({ icon, title, body }) => (
        <Reveal key={title}>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-left h-full">
            <FontAwesomeIcon
              icon={icon}
              className="text-[#E07A5F] mb-3 w-5 h-5"
            />
            <h4 className="font-extrabold text-[15px] leading-tight text-[#4A3728] mb-1.5">
              {title}
            </h4>
            <p className="text-[13px] leading-[1.4] text-[#A08070] font-medium">
              {body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default WhyItWorksSection;
