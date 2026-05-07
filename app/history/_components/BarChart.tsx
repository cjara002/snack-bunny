"use client";

import { useEffect, useRef, useState } from "react";

const STAGE_COLORS = ['#7EC8A0', '#A8D5A2', '#E8C96A', '#E8A94A', '#E07A5F', '#D1495B'];
const CHART_HEIGHT_MOBILE = 140;
const CHART_HEIGHT_DESKTOP = 180;

interface DayData {
  count: number;
  stage: number;
  abbr: string;
  today: boolean;
}

interface BarChartProps {
  days: DayData[];
}

const BarChart = ({ days }: BarChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(CHART_HEIGHT_MOBILE);

  useEffect(() => {
    const update = () =>
      setChartHeight(window.innerWidth >= 768 ? CHART_HEIGHT_DESKTOP : CHART_HEIGHT_MOBILE);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-[20px] p-[18px] shadow-[0_1px_2px_rgba(74,55,40,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-extrabold text-[#4A3728]">Snacks per day</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A08070]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#7EC8A0]" />
          lean →
          <span className="inline-block w-2 h-2 rounded-full bg-[#D1495B]" />
          chonk
        </span>
      </div>

      {/* Bars */}
      <div
        ref={containerRef}
        className="grid gap-2 items-end"
        style={{ gridTemplateColumns: "repeat(7, 1fr)", height: chartHeight }}
      >
        {days.map((day, idx) => {
          const barH =
            day.count === 0
              ? 4
              : Math.max(8, (day.count / maxCount) * (chartHeight - 30));
          const color = day.count === 0 ? "#E8D5C4" : STAGE_COLORS[day.stage];

          return (
            <div key={idx} className="flex flex-col items-center justify-end h-full gap-0.5">
              <span
                className={`text-[11px] font-extrabold tabular-nums ${
                  day.count === 0 ? "text-[#C9A090]" : "text-[#4A3728]"
                }`}
              >
                {day.count}
              </span>
              <div
                className="w-full"
                style={{
                  height: barH,
                  backgroundColor: color,
                  borderRadius: "8px 8px 4px 4px",
                  outline: day.today ? "2px solid #4A3728" : undefined,
                  animation: `bar-rise 500ms cubic-bezier(0.34,1.56,0.64,1) ${idx * 50}ms both`,
                  transformOrigin: "bottom",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Axis */}
      <div
        className="grid gap-2 mt-2 pt-2 border-t border-dashed border-[#E8D5C4]"
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`text-center text-[11px] font-extrabold ${
              day.today ? "text-[#E07A5F]" : "text-[#A08070]"
            }`}
          >
            {day.abbr}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
