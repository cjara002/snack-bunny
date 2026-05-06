"use client";

import { useState } from "react";

const HeroSection = () => {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => setTapCount((prev) => Math.min(prev + 1, 5));

  return (
    <section className="pt-7 pb-14 text-center md:text-left md:grid md:grid-cols-2 md:items-center md:gap-12 md:pt-10 md:pb-16">
      {/* Left column — eyebrow + headline + subtitle */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-white rounded-full px-3.5 py-1.5 shadow-sm font-bold text-xs text-[#A08070] uppercase tracking-[0.04em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7EC8A0] shadow-[0_0_0_4px_rgba(126,200,160,0.18)]" />
          Mindful snacking
        </div>

        <h1 className="mt-4.5 mb-3.5 font-black text-[clamp(38px,11vw,56px)] leading-[1.02] tracking-tight text-[#4A3728] md:text-[clamp(36px,4vw,52px)]">
          No calorie counting.
          <br />
          No guilt.
          <br />
          <span className="text-[#E07A5F]">Just tap the bunny.</span>
        </h1>

        <p className="font-medium text-[17px] leading-[1.45] text-[#A08070] max-w-[32ch] mx-auto md:mx-0">
          Tap your SnackBunny each time you snack. The more you tap, the
          chonkier it gets.
        </p>
      </div>

      {/* Right column — bunny + CTA centered below */}
      <div className="flex flex-col items-center mt-7 md:mt-0">
        {/* Bunny wrapper — relative for tap chip positioning */}
        <div className="relative w-[min(78%,320px)] md:w-full md:max-w-xs">
          <div className="aspect-square flex items-end justify-center relative hero-bunny-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/bunny-stage-${tapCount}.svg`}
              alt="A SnackBunny mascot — click to feed it!"
              width={280}
              height={280}
              className="w-4/5 animate-bunny-float cursor-pointer select-none"
              onClick={handleTap}
            />
            <div className="absolute bottom-[6%] left-1/2 w-1/2 h-3 bg-[rgba(74,55,40,0.12)] rounded-full blur-xs animate-bunny-shadow" />
          </div>

          {/* Tap chip */}
          <div
            className="absolute top-[14%] -right-1.5 bg-white shadow-[0_4px_12px_rgba(74,55,40,0.08)] rounded-full py-2 pl-2.5 pr-3.5 flex items-center gap-2 font-extrabold text-sm text-[#4A3728] animate-chip-pop"
            aria-hidden="true"
          >
            <span>+{tapCount + 1} tap{tapCount !== 0 ? "s" : ""}</span>
          </div>
        </div>

        {/* CTA — centered under bunny on both mobile and desktop */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <a
            href="/onboarding"
            className="bg-[#E07A5F] text-white font-extrabold text-lg px-9 py-4.5 rounded-4xl shadow-[0_6px_16px_rgba(224,122,95,0.35)] min-w-55 text-center hover:bg-[#B85A3F] active:scale-95 transition-all"
          >
            Let&apos;s go!
          </a>
          <span className="text-[13px] text-[#A08070] font-bold">
            Free · No credit card
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
