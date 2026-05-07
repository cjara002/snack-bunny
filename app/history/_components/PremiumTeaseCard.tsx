const SparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={12}
    height={12}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={14}
    height={14}
    fill="none"
    stroke="#7EC8A0"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PERKS = ["30-day view", "AI weekly report", "Bunny skins"];

const PremiumTeaseCard = () => (
  <div className="relative rounded-[22px] p-5.5 overflow-hidden bg-[#4A3728] mb-2">
    {/* Decorative bunny */}
    <span
      className="absolute select-none pointer-events-none text-[96px] leading-none"
      style={{ right: 8, top: 4, opacity: 0.09, transform: "rotate(15deg)" }}
      aria-hidden="true"
    >
      🐰
    </span>

    {/* Premium pill */}
    <div
      className="inline-flex items-center gap-1 mb-3 px-2.5 py-1.25 rounded-full text-[10px] font-black uppercase tracking-[0.12em] text-[#FFD9B0]"
      style={{ background: "rgba(224,122,95,0.25)" }}
    >
      <SparkleIcon />
      Premium
    </div>

    <h3 className="text-[22px] font-black text-white leading-tight mb-2">
      Want AI snack coaching?
    </h3>

    <p className="text-[13px] font-semibold text-[#C9A090] mb-4 leading-[1.4] max-w-[36ch]">
      Get a personalized weekly report with patterns, gentle nudges, and 30 days of history.
    </p>

    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
      {PERKS.map((perk) => (
        <div key={perk} className="flex items-center gap-1 text-[12px] font-bold text-[#FFE8DC]">
          <CheckIcon />
          {perk}
        </div>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <button
        disabled
        className="px-5 py-2.5 rounded-full bg-[#E07A5F] text-white text-[14px] font-black shadow-[0_6px_16px_rgba(224,122,95,0.45)] opacity-90 cursor-default"
      >
        Coming soon
      </button>
      <span className="text-[12px] font-bold text-[#C9A090]">$2.99/mo when it ships</span>
    </div>
  </div>
);

export default PremiumTeaseCard;
