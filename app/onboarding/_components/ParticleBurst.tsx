"use client";

import { useEffect, useState } from "react";

interface ParticleBurstProps {
  active: boolean;
  type: "dots" | "hearts";
}

interface ParticleConfig {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const ParticleBurst = ({ active, type }: ParticleBurstProps) => {
  const [configs, setConfigs] = useState<ParticleConfig[]>([]);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (!active) return;
    const count = type === "hearts" ? 7 : 4;
    const spread = 110; // total arc degrees, centered on "up"
    const generated: ParticleConfig[] = Array.from({ length: count }, (_, i) => {
      const angle = -90 + (i - (count - 1) / 2) * (spread / (count - 1));
      const rad = (angle * Math.PI) / 180;
      const dist = 48 + Math.random() * 20;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        delay: i * 65,
      };
    });
    setConfigs(generated);
    setRenderKey((k) => k + 1);
  }, [active, type]);

  if (!active || configs.length === 0) return null;

  return (
    <div
      key={renderKey}
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      aria-hidden
    >
      {configs.map((p) => (
        <span
          key={p.id}
          className="absolute animate-particle-up text-sm leading-none select-none"
          style={{
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            animationDelay: `${p.delay}ms`,
            color: "#E07A5F",
          }}
        >
          {type === "hearts" ? "♥" : "•"}
        </span>
      ))}
    </div>
  );
};

export default ParticleBurst;
