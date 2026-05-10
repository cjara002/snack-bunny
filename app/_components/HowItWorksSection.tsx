import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const STEPS = [
  { n: 1, label: "Meet your bunny" },
  { n: 2, label: "Tap when you snack" },
  { n: 3, label: "Watch it react" },
];

const HowItWorksSection = () => (
  <section className="pb-10">
    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(74,55,40,0.07)] px-6 py-5">
      <p className="text-[11px] font-black text-[#A08070] uppercase tracking-widest mb-4 text-center md:text-left">
        How it works
      </p>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-3 md:hidden">
        {STEPS.map(({ n, label }) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#FFF0EB] text-[#E07A5F] font-black text-sm flex items-center justify-center shrink-0">
              {n}
            </span>
            <span className="font-bold text-[#4A3728] text-base">{label}</span>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal inline */}
      <div className="hidden md:flex items-center gap-4">
        {STEPS.map(({ n, label }, i) => (
          <div key={n} className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FFF0EB] text-[#E07A5F] font-black text-sm flex items-center justify-center shrink-0">
                {n}
              </span>
              <span className="font-bold text-[#4A3728] text-base whitespace-nowrap">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <FontAwesomeIcon icon={faChevronRight} className="text-[#C9A090] w-3 h-3 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
