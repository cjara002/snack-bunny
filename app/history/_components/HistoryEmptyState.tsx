import Link from "next/link";
import SyncBanner from "./SyncBanner";

const FEATURES = [
  {
    emoji: "📊",
    title: "Daily snack patterns",
    subtitle: "A bar for each day, color-coded by chonk",
    tileBg: "bg-[#E8F7EF]",
  },
  {
    emoji: "🐰",
    title: "Your bunny's evolution",
    subtitle: "Watch them shapeshift across the week",
    tileBg: "bg-[#FEF9E7]",
  },
  {
    emoji: "🥇",
    title: "Your best day",
    subtitle: "Celebrate the lean ones, no shame on the rest",
    tileBg: "bg-[#FEF0EB]",
  },
];

const HistoryEmptyState = () => (
  <div className="flex flex-col gap-3 animate-fade-slide-in">
    <div>
      <h1 className="text-[26px] font-black text-[#4A3728] tracking-tight leading-tight">
        This week
      </h1>
      <p className="text-[13px] font-bold text-[#A08070] mt-1">Welcome to SnackBunny</p>
    </div>

    {/* Hero card */}
    <div className="bg-linear-[160deg] from-[#FFF9F5] to-[#FFE8DC] rounded-3xl border border-[rgba(74,55,40,0.08)] p-6 flex flex-col items-center gap-4 text-center">
      {/* Eyebrow pill */}
      <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-[0_1px_3px_rgba(74,55,40,0.08)]">
        <span className="w-2 h-2 rounded-full bg-[#7EC8A0]" />
        <span className="text-[11px] font-black text-[#7EC8A0] uppercase tracking-[0.1em]">
          Day one
        </span>
      </div>

      {/* Bunny with floating shadow */}
      <div className="relative flex items-end justify-center w-[140px] h-[148px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/bunny-stage-0.svg"
          alt=""
          width={140}
          height={140}
          className="w-[140px] select-none animate-bunny-float absolute top-0 left-0"
          draggable={false}
        />
        <div className="absolute bottom-0 left-1/2 w-20 h-3 rounded-full bg-[#4A3728]/10 blur-md animate-bunny-shadow" />
      </div>

      <h2 className="text-2xl font-black text-[#4A3728] tracking-[-0.02em] leading-tight text-balance max-w-[22ch]">
        Your week is just getting started
      </h2>
      <p className="text-sm font-semibold text-[#A08070] leading-snug max-w-[28ch]">
        Tap your bunny on Today every time you snack. Your week takes shape here as you go.
      </p>

      <Link
        href="/home"
        className="bg-[#E07A5F] text-white text-[15px] font-black rounded-full px-6 py-3.5 shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#C96248] active:scale-95 transition-all"
      >
        Go to Today →
      </Link>
    </div>

    {/* Feature list card */}
    <div className="bg-white rounded-[20px] shadow-[0_2px_8px_rgba(74,55,40,0.07)] p-5 flex flex-col gap-4">
      <p className="text-[11px] font-black text-[#A08070] uppercase tracking-[0.1em]">
        What you&apos;ll see here
      </p>
      <div className="flex flex-col gap-3">
        {FEATURES.map(({ emoji, title, subtitle, tileBg }) => (
          <div key={title} className="flex items-center gap-3">
            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xl ${tileBg}`}>
              {emoji}
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-[#4A3728] leading-tight">{title}</p>
              <p className="text-[12px] font-semibold text-[#A08070] leading-tight mt-0.5">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <SyncBanner />
  </div>
);

export default HistoryEmptyState;
