interface ProgressDotsProps {
  current: number;
  total: number;
}

const ProgressDots = ({ current, total }: ProgressDotsProps) => (
  <div
    className="flex gap-2 justify-center"
    role="progressbar"
    aria-valuenow={current}
    aria-valuemax={total}
    aria-label={`Step ${current} of ${total}`}
  >
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          i + 1 === current
            ? "bg-[#E07A5F] animate-dot-pulse"
            : "bg-[rgba(74,55,40,0.15)]"
        }`}
      />
    ))}
  </div>
);

export default ProgressDots;
