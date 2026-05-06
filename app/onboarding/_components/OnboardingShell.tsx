"use client";

import { useState, useRef, useEffect } from "react";
import ProgressDots from "./ProgressDots";
import MeetAndNameStep from "./MeetAndNameStep";
import CommitmentStep from "./CommitmentStep";

const BUNNY_NAME_KEY = "bunny_name";
const ONBOARDING_COMPLETE_KEY = "onboarding_complete";
const SWIPE_THRESHOLD = 50;

const OnboardingShell = () => {
  const [step, setStep] = useState(1);
  // Starts invisible so returning users don't flash onboarding before redirect
  const [visible, setVisible] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const pendingNameRef = useRef("Bunny");

  useEffect(() => {
    if (localStorage.getItem(ONBOARDING_COMPLETE_KEY)) {
      window.location.replace("/home");
      return;
    }
    setVisible(true);
  }, []);

  const saveName = (name: string) => {
    localStorage.setItem(BUNNY_NAME_KEY, name);
  };

  const handleNameConfirm = (name: string) => {
    saveName(name);
    setStep(2);
  };

  const handleCommitComplete = (method: "pressed" | "skipped") => {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
    localStorage.setItem("committed_at", Date.now().toString());
    localStorage.setItem("commitment_method", method);
    window.location.replace("/home");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (step === 1 && deltaX < 0) {
      const finalName = pendingNameRef.current.trim() || "Bunny";
      saveName(finalName);
      setStep(2);
    } else if (step === 2 && deltaX > 0) {
      setStep(1);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-6 pt-12 pb-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ProgressDots current={step} total={2} />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mt-6">
        {step === 1 && (
          <MeetAndNameStep
            onNext={handleNameConfirm}
            onNameChange={(n) => {
              pendingNameRef.current = n;
            }}
          />
        )}
        {step === 2 && <CommitmentStep onComplete={handleCommitComplete} />}
      </div>
    </div>
  );
};

export default OnboardingShell;
