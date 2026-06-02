// r=90 → circumference ≈ 565
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 565.5 ≈ 565

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
    // SVG is 200x200 so the r=90 stroke (centered at 100,100) has 10px breathing room
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg
        width={200}
        height={200}
        viewBox="0 0 200 200"
        className="absolute inset-0"
        aria-hidden
      >
        {/* Track ring */}
        <circle
          cx={100}
          cy={100}
          r={RADIUS}
          fill="none"
          stroke="rgba(74,55,40,0.08)"
          strokeWidth={5}
        />
        {/* Progress ring — starts at 12 o'clock */}
        <circle
          cx={100}
          cy={100}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 100 100)"
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
