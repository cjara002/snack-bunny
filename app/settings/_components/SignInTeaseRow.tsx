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

interface SignInTeaseRowProps {
  onClick?: () => void;
}

const SignInTeaseRow = ({ onClick }: SignInTeaseRowProps) => (
  <div
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    className={`flex items-center gap-3.5 px-4 py-3.5 transition-colors ${onClick ? 'cursor-pointer hover:bg-baseSecondary' : ''}`}
  >
    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#F5E6D8] flex items-center justify-center">
      <LockIcon />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-extrabold text-textPrimary">Sign in to sync</div>
      <div className="text-[13px] font-semibold text-textMuted">
        {onClick ? 'Save your bunny across all your devices' : 'Coming soon — your bunny across all your devices'}
      </div>
    </div>
    {onClick ? (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#A08070" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M9 18l6-6-6-6" />
      </svg>
    ) : (
      <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.08em] px-2 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]">
        Soon
      </span>
    )}
  </div>
);

export default SignInTeaseRow;
