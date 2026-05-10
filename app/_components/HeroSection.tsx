"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faWifi, faBatteryFull } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  const [tapStage, setTapStage] = useState(3);
  const [tapCount, setTapCount] = useState(8);
  const [returningUser, setReturningUser] = useState(false);

  useEffect(() => {
    setReturningUser(localStorage.getItem("onboarding_complete") === "true");
  }, []);

  const handleTap = () => {
    setTapStage((prev) => Math.min(prev + 1, 5));
    setTapCount((prev) => prev + 1);
  };

  const ctaHref = returningUser ? "/home" : "/onboarding";
  const ctaText = returningUser ? "Open my bunny" : "Try it free";

  return (
    <section className="pt-7 pb-10 text-center md:text-left md:grid md:grid-cols-2 md:items-center md:gap-12 md:pt-10 md:pb-14">
      {/* Left col: copy */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-white rounded-full px-3.5 py-1.5 shadow-sm font-black text-[11px] text-[#7EC8A0] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7EC8A0]" />
          No calorie counting
        </div>

        <h1 className="mt-4 mb-3.5 font-black text-[clamp(36px,10vw,54px)] leading-[1.02] tracking-tight text-[#4A3728] md:text-[clamp(34px,4vw,50px)]">
          Your bunny gets{" "}
          <span className="text-[#E07A5F] underline underline-offset-4 decoration-wavy">fat</span>{" "}
          when you snack.
        </h1>

        <p className="font-medium text-[17px] leading-[1.45] text-[#A08070] max-w-[32ch] mx-auto md:mx-0">
          No calorie counting. No guilt. Just tap the bunny.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center md:items-start gap-3 mt-7 w-full max-w-xs mx-auto md:mx-0">
          <a
            href={ctaHref}
            className="bg-[#E07A5F] text-white font-extrabold text-lg px-9 py-4.5 rounded-4xl shadow-[0_6px_16px_rgba(224,122,95,0.35)] w-full text-center hover:bg-[#B85A3F] active:scale-95 transition-all flex items-center justify-center gap-2.5"
          >
            {ctaText}
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </a>
          <span className="text-[13px] text-[#A08070] font-bold">
            No signup. No credit card.
          </span>
        </div>
      </div>

      {/* Right col: phone mockup */}
      <div className="flex flex-col items-center mt-8 md:mt-0">
        {/* Phone wrapper — extra horizontal margin makes room for the floating chips */}
        <div className="relative mx-12">
          {/* Phone bezel */}
          <div className="bg-[#4A3728] rounded-[44px] p-2.5 shadow-[0_20px_48px_rgba(74,55,40,0.22)] w-62 md:w-68">
            {/* Dynamic island */}
            <div className="flex justify-center pt-2">
              <div className="w-20 h-5 bg-[#2A1810] rounded-full" />
            </div>

            {/* Screen */}
            <div className="bg-[#FFF9F5] rounded-[34px] mt-1 overflow-hidden pb-4">
              {/* Status bar */}
              <div className="flex justify-between px-5 pt-3 pb-1 text-[10px] font-bold text-[#4A3728]">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faWifi} className="w-3 h-3" />
                  <FontAwesomeIcon icon={faBatteryFull} className="w-3.5 h-3" />
                </div>
              </div>

              {/* App header */}
              <div className="flex justify-between items-start px-5 pb-1">
                <div className="text-left">
                  <p className="text-[10px] text-[#A08070] font-semibold">Hello,</p>
                  <p className="text-sm font-black text-[#4A3728] leading-tight">Mochi</p>
                </div>
                <div className="bg-white rounded-full px-2.5 py-1 text-[10px] font-black text-[#7EC8A0] shadow-sm whitespace-nowrap">
                  3 day
                </div>
              </div>

              {/* Tappable bunny */}
              <div
                className="flex justify-center py-2 cursor-pointer select-none"
                onClick={handleTap}
                role="button"
                aria-label="Tap to feed bunny"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/bunny-stage-${tapStage}.svg`}
                  alt="SnackBunny mascot — tap to make it chonkier"
                  width={120}
                  height={120}
                  className="w-28"
                  draggable={false}
                />
              </div>

              {/* Counter */}
              <div className="text-center font-black text-4xl text-[#4A3728] leading-none">
                {tapCount}
              </div>

              {/* Tap button */}
              <div className="flex justify-center mt-3 px-4">
                <span className="bg-[#E07A5F] text-white font-extrabold text-[11px] rounded-full px-4 py-2 shadow-[0_4px_8px_rgba(224,122,95,0.28)]">
                  + Tap when you snack
                </span>
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <div
            className="absolute top-[28%] -left-10 bg-white shadow-[0_4px_12px_rgba(74,55,40,0.1)] rounded-full py-1.5 px-3 flex items-center gap-1.5 font-extrabold text-xs text-[#4A3728] animate-chip-pop"
            aria-hidden="true"
          >
            <span className="w-4 h-4 rounded-full bg-[#E07A5F] flex items-center justify-center text-white text-[9px] font-black shrink-0">
              +
            </span>
            chonk +1
          </div>
          <div
            className="absolute top-[14%] -right-10 bg-white shadow-[0_4px_12px_rgba(74,55,40,0.1)] rounded-full py-1.5 px-3 font-extrabold text-xs text-[#4A3728] animate-chip-pop"
            aria-hidden="true"
          >
            +1 snack
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
