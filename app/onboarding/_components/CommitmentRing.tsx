// r=140 → circumference ≈ 880, matching the spec exactly
const RADIUS = 140;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 879.6 ≈ 880

interface CommitmentRingProps {
  progress: number; // 0–1
  isResetting: boolean;
  isFlashing: boolean;
  children: React.ReactNode;
}

const CommitmentRing = ({ progress, isResetting, isFlashing, children }: CommitmentRingProps) => {
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const strokeColor = isFlashing ? "#ffffff" : "#E07A5F";

  return (
    // SVG is 300x300 so the r=140 stroke (centered at 150,150) has 10px breathing room
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      <svg
        width={300}
        height={300}
        viewBox="0 0 300 300"
        className="absolute inset-0"
        aria-hidden
      >
        {/* Track ring */}
        <circle
          cx={150}
          cy={150}
          r={RADIUS}
          fill="none"
          stroke="rgba(74,55,40,0.08)"
          strokeWidth={7}
        />
        {/* Progress ring — starts at 12 o'clock */}
        <circle
          cx={150}
          cy={150}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 150 150)"
          style={{
            transition: isResetting ? "stroke-dashoffset 200ms ease-out" : "none",
          }}
        />
      </svg>
      <div className="z-10">{children}</div>
    </div>
  );
};

export default CommitmentRing;
