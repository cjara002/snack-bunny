interface BunnyTapZoneProps {
  stageIndex: number;
  tapKey: number;
  onTap: () => void;
  showHelperText: boolean;
}

const BunnyTapZone = ({ stageIndex, tapKey, onTap, showHelperText }: BunnyTapZoneProps) => (
  <div className="flex flex-col items-center mt-6 gap-4">
    <div
      role="button"
      aria-label="Log a snack"
      tabIndex={0}
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTap();
        }
      }}
      className="cursor-pointer select-none w-full max-w-70 md:max-w-90 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] rounded-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={tapKey}
        src={`/assets/bunny-stage-${stageIndex}.svg`}
        alt={`SnackBunny — stage ${stageIndex}`}
        width={360}
        height={360}
        className={`w-full ${tapKey > 0 ? "animate-bunny-press" : ""}`}
        draggable={false}
      />
    </div>
    <p
      className={`text-lg text-[#A08070] font-semibold transition-opacity duration-300 ${
        showHelperText ? "opacity-100" : "opacity-50"
      }`}
    >
      tap bunny when you snack
    </p>
  </div>
);

export default BunnyTapZone;
