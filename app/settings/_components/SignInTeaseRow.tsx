const LockIcon = () => (
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
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const SignInTeaseRow = () => (
  <div className="flex items-center gap-3.5 px-4 py-3.5">
    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#F5E6D8] flex items-center justify-center">
      <LockIcon />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-extrabold text-[#4A3728]">Sign in to sync</div>
      <div className="text-[13px] font-semibold text-[#A08070]">
        Coming soon — your bunny across all your devices
      </div>
    </div>
    <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.08em] px-2 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]">
      Soon
    </span>
  </div>
);

export default SignInTeaseRow;
