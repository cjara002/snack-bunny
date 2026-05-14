interface SyncBannerProps {
  onClick: () => void;
}

const SyncBanner = ({ onClick }: SyncBannerProps) => (
  <button
    onClick={onClick}
    className="w-full text-left flex items-center gap-3 bg-linear-to-br from-baseSecondary to-[#FFEFE3] border border-borderSoft rounded-[18px] p-4 cursor-pointer hover:border-primary/40 transition-colors"
  >
    <div className="shrink-0 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-[0_1px_2px_rgba(74,55,40,0.06)]">
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#A08070" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19a4.5 4.5 0 1 0-1.6-8.7 6 6 0 0 0-11.6 2 4.5 4.5 0 0 0 1 8.7h12.2z" />
      </svg>
    </div>
    <p className="text-[13px] font-semibold text-textMuted leading-[1.35]">
      <strong className="font-extrabold text-textPrimary">Sign in to sync</strong>
      {" "}— save your bunny across all your devices.
    </p>
  </button>
);

export default SyncBanner;
