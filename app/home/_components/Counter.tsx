interface CounterProps {
  count: number;
  tapKey: number;
  bunnyName: string;
}

const getLabel = (count: number) => {
  if (count === 0) return "snack-free so far!";
  if (count === 1) return "snack today";
  return "snacks today";
};

const Counter = ({ count, tapKey, bunnyName }: CounterProps) => (
  <div className="flex flex-col items-center mt-5 gap-1" aria-live="polite" aria-atomic="true">
    <span className="text-sm font-bold text-[#C9A090] tracking-wide uppercase">
      {bunnyName}
    </span>
    <span
      key={`count-${tapKey}`}
      className={`text-5xl font-extrabold text-[#4A3728] tabular-nums ${
        tapKey > 0 ? "animate-counter-pulse" : ""
      }`}
    >
      {count}
    </span>
    <span className="text-lg font-semibold text-[#A08070]">{getLabel(count)}</span>
  </div>
);

export default Counter;
