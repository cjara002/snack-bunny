const BellIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="#A08070"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="#C9A090"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ReminderRow = () => (
  <div className="flex items-center gap-3.5 px-4 py-3.5">
    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#F5E6D8] flex items-center justify-center">
      <BellIcon />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-extrabold text-[#4A3728]">Daily reset reminder</div>
      <div className="text-[13px] font-semibold text-[#A08070]">A nudge at midnight, on or off</div>
    </div>
    <div className="flex items-center gap-1 shrink-0">
      <span className="text-[15px] font-bold text-[#A08070]">Off</span>
      <ChevronIcon />
    </div>
  </div>
);

export default ReminderRow;
