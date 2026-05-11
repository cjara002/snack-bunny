"use client";

import { useState, useRef, useEffect } from "react";
import ParticleBurst from "./ParticleBurst";

interface MeetAndNameStepProps {
  onNext: (name: string) => void;
  onNameChange: (name: string) => void;
}

const MeetAndNameStep = ({ onNext, onNameChange }: MeetAndNameStepProps) => {
  const [name, setName] = useState("Bunny");
  const [showParticles, setShowParticles] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus only on mobile to avoid popping the keyboard on desktop
    if (window.innerWidth < 480) {
      inputRef.current?.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    onNameChange(v);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "Bunny";
    setShowParticles(true);
    // Brief celebration before advancing
    setTimeout(() => {
      setShowParticles(false);
      onNext(finalName);
    }, 480);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full animate-onboarding-enter">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/bunny-stage-0.svg"
          alt="Your new SnackBunny"
          width={160}
          height={160}
          className="w-40 animate-bunny-bob select-none pointer-events-none no-ios-callout"
          draggable={false}
        />
        <ParticleBurst active={showParticles} type="dots" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-[#4A3728] leading-tight tracking-tight">
          Meet your Bunny
        </h1>
        <p className="text-base text-[#A08070] font-medium mt-2">
          Give it a nickname, or keep it simple.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            maxLength={20}
            className="border-2 border-[rgba(74,55,40,0.12)] bg-white/80 rounded-2xl px-5 py-4 text-lg font-bold text-[#4A3728] outline-none focus:border-[#E07A5F] transition-colors w-full placeholder:text-[#C9A090]"
          />
          <span
            className={`absolute right-4 bottom-4 text-xs font-semibold tabular-nums transition-colors ${
              name.length >= 18
                ? "text-[#E07A5F]"
                : "text-[rgba(74,55,40,0.25)]"
            }`}
            aria-live="polite"
          >
            {name.length}/20
          </span>
        </div>
        <button
          type="submit"
          className="bg-[#E07A5F] text-white font-bold rounded-2xl py-4 w-full shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-95 transition-all"
        >
          That's my bunny!
        </button>
      </form>
    </div>
  );
};

export default MeetAndNameStep;
