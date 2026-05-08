"use client";

import { useState } from "react";

interface Step {
  bunny: number;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    bunny: 0,
    title: "Meet your SnackBunny",
    body: "Pick a name. That's your bunny now. It starts the day lean and clean.",
  },
  {
    bunny: 2,
    title: "Tap when you snack",
    body: "One tap, one snack. No logging. No photos. No calorie math.",
  },
  {
    bunny: 5,
    title: "Watch the results",
    body: "Your bunny swells through the day. Reset at midnight. Try again tomorrow.",
  },
];

const TICK_LABELS = ["Meet", "Tap", "Watch"];

const HowItWorksSection = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [panelKey, setPanelKey] = useState(0);

  const goTo = (idx: number) => {
    setStepIdx(idx);
    setPanelKey((k) => k + 1);
  };

  const handleNext = () => {
    if (stepIdx === STEPS.length - 1) {
      window.location.href = "/onboarding";
    } else {
      goTo(stepIdx + 1);
    }
  };

  const progressClass =
    stepIdx === 0 ? "w-0" : stepIdx === 1 ? "w-1/3" : "w-2/3";

  return (
    <section className="py-14">
      <div className="text-center text-xs font-bold tracking-[0.08em] uppercase text-[#E07A5F] mb-3">
        How it works
      </div>
      <h2 className="text-center font-black text-[clamp(28px,7vw,38px)] leading-[1.05] tracking-tight text-[#4A3728] mb-9 max-w-[16ch] mx-auto">
        Three taps to <span className="text-[#E07A5F]">awareness</span>
      </h2>

      <div className="bg-white rounded-3xl p-[22px_18px_20px] shadow-[0_4px_12px_rgba(74,55,40,0.08)]">
        {/* Step track */}
        <div className="grid grid-cols-3 gap-2 relative mb-4.5" role="tablist">
          {/* Background line */}
          <div className="absolute top-4.75 left-[16.66%] right-[16.66%] h-0.5 bg-[#E8D5C4] rounded-sm z-0" />
          {/* Progress line */}
          <div
            className={`absolute top-4.75 left-[16.66%] h-0.5 bg-[#E07A5F] rounded-sm z-1 transition-all duration-380 ease-out ${progressClass}`}
          />

          {STEPS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === stepIdx}
              onClick={() => goTo(i)}
              className="flex flex-col items-center gap-2 relative z-2"
            >
              <span
                className={`w-9.5 h-9.5 rounded-full flex items-center justify-center font-black text-sm transition-all duration-220 ${
                  i === stepIdx
                    ? "bg-[#E07A5F] border-2 border-[#E07A5F] text-white scale-[1.08] shadow-[0_6px_16px_rgba(224,122,95,0.35)]"
                    : i < stepIdx
                      ? "bg-[#E07A5F] border-2 border-[#E07A5F] text-white"
                      : "bg-[#FFF9F5] border-2 border-[#E8D5C4] text-[#A08070]"
                }`}
              >
                {i < stepIdx ? "✓" : i + 1}
              </span>
              <span
                className={`font-black text-[11px] uppercase tracking-[0.06em] transition-colors ${
                  i === stepIdx ? "text-[#E07A5F]" : "text-[#C9A090]"
                }`}
              >
                {TICK_LABELS[i]}
              </span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid grid-cols-[72px_1fr] items-center gap-4 px-1 pb-1 min-h-22">
          <div className="w-18 h-18 rounded-2xl bg-[#FFF9F5] flex items-center justify-center overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/bunny-stage-${STEPS[stepIdx].bunny}.svg`}
              alt=""
              width={58}
              height={58}
              className="w-4/5"
            />
          </div>
          <div key={panelKey} className="animate-fade-slide-in">
            <h3 className="font-extrabold text-lg tracking-tight text-[#4A3728] mb-1">
              {STEPS[stepIdx].title}
            </h3>
            <p className="text-sm leading-[1.4] text-[#A08070] font-medium">
              {STEPS[stepIdx].body}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-3.5 pt-3.5 border-t border-[#E8D5C4]">
          <button
            onClick={() => goTo(Math.max(0, stepIdx - 1))}
            disabled={stepIdx === 0}
            className="bg-[#FFF9F5] text-[#4A3728] font-extrabold text-[13px] px-4 py-2.25 rounded-full hover:bg-[#F5E6D8] active:scale-[0.94] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <span className="text-xs font-bold text-[#A08070] tracking-[0.04em]">
            {stepIdx + 1} / {STEPS.length}
          </span>
          <button
            onClick={handleNext}
            className="bg-[#E07A5F] text-white font-extrabold text-[13px] px-4 py-2.25 rounded-full shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-[0.94] transition-all"
          >
            {stepIdx === STEPS.length - 1 ? "Let's go! →" : "Next →"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
