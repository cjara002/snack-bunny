import Reveal from "./Reveal";

const FREE_FEATURES = [
  "Tap counter & 6 bunny stages",
  "7 days of history",
  "Save your bunny across devices",
  "Daily share image",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "30 days of history",
  "AI weekly snack reports",
  "Bunny skins & themes",
];

interface CheckProps {
  premium?: boolean;
}

const Check = ({ premium = false }: CheckProps) => (
  <span
    className={`w-4.5 h-4.5 shrink-0 rounded-full flex items-center justify-center text-[11px] font-black text-white ${
      premium ? "bg-[#E07A5F]" : "bg-[#7EC8A0]"
    }`}
  >
    ✓
  </span>
);

const PricingSection = () => (
  <section className="py-14">
    <div className="text-center text-xs font-bold tracking-[0.08em] uppercase text-[#E07A5F] mb-3">
      Plans
    </div>
    <h2 className="text-center font-black text-[clamp(28px,7vw,38px)] leading-[1.05] tracking-tight text-[#4A3728] mb-9 max-w-[16ch] mx-auto">
      Free works. Premium <span className="text-[#E07A5F]">flexes</span>.
    </h2>

    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {/* Free */}
      <Reveal>
        <div className="bg-white rounded-3xl p-[26px_22px] shadow-[0_4px_12px_rgba(74,55,40,0.08)] h-full flex flex-col">
          <h3 className="font-extrabold text-xl text-[#4A3728] mb-1.5">
            Free
          </h3>
          <div className="font-black text-[36px] tracking-tight text-[#4A3728] leading-none mb-4">
            $0
            <small className="font-bold text-sm text-[#A08070] tracking-normal">
              {" "}
              / forever
            </small>
          </div>
          <ul className="flex flex-col gap-2.5 mb-4.5 flex-1">
            {FREE_FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm leading-tight text-[#A08070] font-medium"
              >
                <Check />
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full bg-[#FFF9F5] text-[#4A3728] font-extrabold text-[15px] py-3.5 rounded-4xl border border-[#E8D5C4] hover:bg-[#F5E6D8] active:scale-[0.96] transition-all">
            Start free
          </button>
        </div>
      </Reveal>

      {/* Premium */}
      <Reveal>
        <div className="bg-[#4A3728] rounded-3xl p-[26px_22px] shadow-[0_4px_12px_rgba(74,55,40,0.08)] relative h-full flex flex-col">
          <span className="absolute -top-2.5 right-4.5 bg-[#E07A5F] text-white font-black text-[11px] px-2.75 py-1.25 rounded-full tracking-[0.04em] uppercase">
            Best value
          </span>
          <h3 className="font-extrabold text-xl text-white mb-1.5">Premium</h3>
          <div className="font-black text-[36px] tracking-tight text-white leading-none mb-4">
            $2.99
            <small className="font-bold text-sm text-[rgba(255,232,220,0.7)] tracking-normal">
              {" "}
              / mo
            </small>
          </div>
          <ul className="flex flex-col gap-2.5 mb-4.5 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm leading-tight text-[rgba(255,232,220,0.85)] font-medium"
              >
                <Check premium />
                {f}
              </li>
            ))}
          </ul>
          <button className="w-full bg-[#E07A5F] text-white font-extrabold text-[15px] py-3.5 rounded-4xl shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-[0.96] transition-all">
            Upgrade — $2.99/mo
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

export default PricingSection;
