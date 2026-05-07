interface DayData {
  count: number;
  stage: number;
  abbr: string;
  today: boolean;
}

interface BunnyEvolutionRowProps {
  days: DayData[];
}

const BunnyEvolutionRow = ({ days }: BunnyEvolutionRowProps) => (
  <div className="bg-white rounded-[20px] px-3.5 py-4.5 shadow-[0_1px_2px_rgba(74,55,40,0.06)]">
    <div className="mb-3">
      <span className="text-[15px] font-extrabold text-[#4A3728]">Bunny evolution</span>
    </div>

    <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center py-2 rounded-[14px] ${
            day.today
              ? "bg-white outline outline-[#E07A5F]"
              : "bg-[#FFF9F5]"
          }`}
        >
          <img
            src={`/assets/bunny-stage-${day.stage}.svg`}
            alt={`Stage ${day.stage}`}
            width={40}
            height={40}
          />
          <span
            className={`text-[10px] font-extrabold mt-0.5 ${
              day.today ? "text-[#E07A5F]" : "text-[#A08070]"
            }`}
          >
            {day.abbr}
          </span>
          <span className="text-[12px] font-black text-[#4A3728] tabular-nums">
            {day.count}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default BunnyEvolutionRow;
