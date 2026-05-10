"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CommitmentRing from "./CommitmentRing";
import ParticleBurst from "./ParticleBurst";

interface CommitmentStepProps {
  onComplete: (method: "pressed" | "skipped") => void;
}

const HOLD_DURATION = 2500;
const TAP_THRESHOLD = 300;

const CommitmentStep = ({ onComplete }: CommitmentStepProps) => {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [helperText, setHelperText] = useState("Hold to commit");
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [didShake, setDidShake] = useState(false);

  // Refs so RAF closures always see the latest values
  const pressingRef = useRef(false);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const hapticRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stopTimers = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (hapticRef.current !== null) clearInterval(hapticRef.current);
    rafRef.current = null;
    hapticRef.current = null;
  }, []);

  useEffect(() => () => stopTimers(), [stopTimers]);

  // Stored in ref so the RAF closure always gets the fresh version
  const handleCompletionRef = useRef<() => void>(() => {});
  handleCompletionRef.current = () => {
    stopTimers();
    pressingRef.current = false;
    setPressing(false);
    setProgress(1);
    setIsComplete(true);
    setIsFlashing(true);
    if (navigator.vibrate) navigator.vibrate([20, 30, 20]);
    setIsCelebrating(true);
    setShowParticles(true);
    setTimeout(() => setIsFlashing(false), 200);
    setTimeout(() => {
      setShowParticles(false);
      setIsCelebrating(false);
      onCompleteRef.current("pressed");
    }, 600);
  };

  // Stable tick starter — only references refs, no stale closure risk
  const startTick = useCallback(() => {
    const tick = () => {
      if (!pressingRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const prog = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(prog);
      if (prog >= 1) {
        handleCompletionRef.current();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handlePressStart = (e: React.PointerEvent) => {
    if (isComplete) return;
    // Capture pointer so onPointerLeave fires even if finger leaves element
    e.currentTarget.setPointerCapture(e.pointerId);
    pressingRef.current = true;
    startTimeRef.current = Date.now();
    setPressing(true);
    setDidShake(false);
    setHelperText("Hold steady...");
    if (navigator.vibrate) navigator.vibrate(8);
    hapticRef.current = setInterval(() => {
      if (navigator.vibrate) navigator.vibrate(8);
    }, 500);
    startTick();
  };

  const handlePressEnd = () => {
    if (!pressingRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    stopTimers();
    pressingRef.current = false;
    setPressing(false);

    if (elapsed < TAP_THRESHOLD) {
      // Too short — treat as an accidental tap
      setHelperText("Press and hold, don't tap");
      setDidShake(true);
      setIsResetting(true);
      setProgress(0);
      setTimeout(() => {
        setDidShake(false);
        setHelperText("Hold to commit");
        setIsResetting(false);
      }, 1500);
    } else {
      // Released before completing the hold
      setIsResetting(true);
      setProgress(0);
      setHelperText("Hold to commit");
      setTimeout(() => setIsResetting(false), 200);
    }
  };

  const bunnyClass = [
    "w-36 select-none transition-[transform,filter] duration-200 ease-out",
    pressing ? "scale-105 drop-shadow-[0_0_16px_rgba(224,122,95,0.4)]" : "",
    isCelebrating ? "animate-bunny-bounce-celebration" : "",
    didShake ? "animate-shake" : "",
    !pressing && !isCelebrating && !didShake ? "animate-bunny-bob" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-8 w-full animate-onboarding-enter">
      <p className="text-xl font-bold text-[#4A3728] text-center leading-snug max-w-67.5">
        I want to snack less.{" "}
        <span className="font-medium text-[#A08070]">
          I don&apos;t want to be perfect&nbsp;— just aware.
        </span>
      </p>

      {/* Press target — pointer events only, no button role to avoid focus ring */}
      <div
        className="relative touch-none cursor-pointer"
        onPointerDown={handlePressStart}
        onPointerUp={handlePressEnd}
        onPointerLeave={handlePressEnd}
        onPointerCancel={handlePressEnd}
        onContextMenu={(e) => e.preventDefault()}
        aria-label="Hold to commit"
        role="button"
        tabIndex={0}
      >
        <CommitmentRing
          progress={progress}
          isResetting={isResetting}
          isFlashing={isFlashing}
        >
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bunny-stage-0.svg"
              alt=""
              width={144}
              height={144}
              className={bunnyClass}
              draggable={false}
            />
            <ParticleBurst active={showParticles} type="hearts" />
          </div>
        </CommitmentRing>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p
          className={`text-sm font-semibold text-[#C9A090] transition-opacity ${
            !pressing && !isComplete ? "animate-dot-pulse" : ""
          }`}
        >
          {helperText}
        </p>

        {!isComplete && (
          <button
            type="button"
            onClick={() => setShowSkipModal(true)}
            className="text-xs text-[#C9A090] underline underline-offset-2 hover:text-[#A08070] transition-colors"
          >
            Skip the commitment
          </button>
        )}
        <p className="text-[11px] text-[#C9A090] opacity-60 text-center">
          Not a medical or weight-loss tool.
        </p>
      </div>

      {showSkipModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-xl flex flex-col gap-4 animate-pop-in">
            <p className="font-extrabold text-[#4A3728] text-center text-lg leading-tight">
              Skip the commitment?
            </p>
            <p className="text-sm text-[#A08070] text-center">
              You can always stay mindful without it.
            </p>
            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="flex-1 border-2 border-[rgba(74,55,40,0.12)] rounded-2xl py-3 font-bold text-[#4A3728] hover:bg-[rgba(74,55,40,0.05)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSkipModal(false);
                  onCompleteRef.current("skipped");
                }}
                className="flex-1 bg-[#E07A5F] text-white rounded-2xl py-3 font-bold hover:bg-[#B85A3F] transition-colors"
              >
                Yes, skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommitmentStep;
