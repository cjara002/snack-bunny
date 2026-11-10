"use client";

import { memo, useCallback, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryFull,
  faBell,
  faChartSimple,
  faDroplet,
  faFaceSmile,
  faGear,
  faHeart,
  faHouse,
  faMoon,
  faPlus,
  faShoePrints,
  faSignal,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import IconChip from "@/app/_components/ui/IconChip";
import ProgressBar from "@/app/_components/ui/ProgressBar";
import { BUNNY_NAME } from "../constants/content";

// A static recreation of the mobile app's Today screen, using the seed values
// from the dashboard handoff. Only the bunny is interactive, exactly like the
// app: tapping it is affection only and changes no data.

const CALORIES = 1240;
const CALORIE_TARGET = 1800;

const RING_SIZE = 84;
const RING_STROKE = 10;
const RING_CENTER = RING_SIZE / 2;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_OFFSET = RING_CIRCUMFERENCE * (1 - CALORIES / CALORIE_TARGET);

const AFFIRMATIONS = ["Boop!", "Bunny loves you", "We've got today", "Squish!", "You're doing great", "Hi friend"] as const;

const SECTION_LABEL = "mb-1.5 mt-3 text-[8px] font-extrabold uppercase tracking-[0.08em] text-textMuted";

const VITALITY_CHIPS = [
  { label: "Slept 7.5h", dot: "bg-pillarSleep", met: true },
  { label: "Hydrated", dot: "bg-pillarWater", met: true },
  { label: "No mood yet", dot: "bg-textFaint", met: false },
  { label: "6.2k steps", dot: "bg-pillarSteps", met: true },
] as const;

const MACROS = [
  { letter: "P", name: "Protein", value: 64, target: 120, tone: "protein" },
  { letter: "C", name: "Carbs", value: 150, target: 210, tone: "carbs" },
  { letter: "F", name: "Fat", value: 42, target: 60, tone: "fat" },
] as const;

const PILLARS = [
  {
    name: "Water",
    icon: faDroplet,
    tone: "water",
    source: "add",
    emptyText: null,
    reading: { value: "5", unit: "/ 8 cups", progress: 5, target: 8, label: "Water, 5 of 8 cups" },
  },
  {
    name: "Sleep",
    icon: faMoon,
    tone: "sleep",
    source: "health",
    emptyText: null,
    reading: { value: "7.5", unit: "/ 8h", progress: 7.5, target: 8, label: "Sleep, 7.5 of 8 hours" },
  },
  {
    name: "Mood",
    icon: faFaceSmile,
    tone: "mood",
    source: "add",
    emptyText: "How are you today?",
    reading: null,
  },
  {
    name: "Steps",
    icon: faShoePrints,
    tone: "steps",
    source: "health",
    emptyText: null,
    reading: { value: "6.2k", unit: "/ 8k", progress: 6240, target: 8000, label: "Steps, 6,240 of 8,000" },
  },
] as const;

const TABS_LEFT = [
  { label: "Today", icon: faHouse, active: true },
  { label: "History", icon: faChartSimple, active: false },
] as const;

const TABS_RIGHT = [
  { label: "Reminders", icon: faBell, active: false },
  { label: "Settings", icon: faGear, active: false },
] as const;

const renderChip = ({ label, dot, met }: (typeof VITALITY_CHIPS)[number]) => (
  <Badge key={label} size="xs" elevation="sm" dotClassName={dot} dimmed={!met}>
    {label}
  </Badge>
);

const renderMacro = ({ letter, name, value, target, tone }: (typeof MACROS)[number]) => (
  <div key={letter} className="grid grid-cols-[8px_1fr_40px] items-center gap-1.5">
    <span className="text-[8px] font-extrabold text-textMuted">{letter}</span>
    <ProgressBar value={value} max={target} tone={tone} label={`${name}, ${value} of ${target} grams`} />
    <span className="text-right text-[8px] font-bold tabular-nums text-textMuted">
      {value}/{target}g
    </span>
  </div>
);

const renderPillar = ({ name, icon, tone, source, emptyText, reading }: (typeof PILLARS)[number]) => (
  <Card key={name} padding="xs" radius="md" className="flex min-h-23 flex-col">
    <div className="flex items-start justify-between">
      <IconChip icon={icon} tone={tone} size="sm" />
      {source === "health" ? (
        <span className="flex items-center gap-0.5 text-[7px] font-bold text-textFaint">
          <FontAwesomeIcon icon={faHeart} className="text-[6px]" />
          Health
        </span>
      ) : (
        <span className="grid size-5 place-items-center rounded-full bg-surfaceTertiary text-textPrimary">
          <FontAwesomeIcon icon={faPlus} className="text-[8px]" />
        </span>
      )}
    </div>
    <p className="mt-1.5 text-[8px] font-extrabold uppercase tracking-[0.06em] text-textMuted">{name}</p>
    {reading ? (
      <>
        <p className="mt-0.5 leading-none">
          <span className="text-lg font-black tabular-nums">{reading.value}</span>{" "}
          <span className="text-[9px] font-bold text-textMuted">{reading.unit}</span>
        </p>
        <ProgressBar
          value={reading.progress}
          max={reading.target}
          tone={tone}
          label={reading.label}
          className="mt-auto"
        />
      </>
    ) : (
      <p className="mt-0.5 text-[10px] font-bold leading-snug text-textFaint">{emptyText}</p>
    )}
  </Card>
);

const renderTab = ({ label, icon, active }: (typeof TABS_LEFT | typeof TABS_RIGHT)[number]) => (
  <span key={label} className={`flex w-12 flex-col items-center gap-1 ${active ? "text-primary" : "text-textFaint"}`}>
    <FontAwesomeIcon icon={icon} className="text-[15px]" />
    <span className="text-[7px] font-extrabold uppercase tracking-wide">{label}</span>
  </span>
);

const AppPreview = () => {
  const [tapCount, setTapCount] = useState(0);
  const handleTap = useCallback(() => setTapCount((count) => count + 1), []);
  const affirmation = tapCount > 0 ? AFFIRMATIONS[(tapCount - 1) % AFFIRMATIONS.length] : null;

  return (
    <figure className="relative mx-auto w-75" aria-label="Preview of the SnackBunny Today screen">
      {/* Floating callouts around the phone; hidden on phones where they'd clip */}
      <div aria-hidden="true" className="absolute -left-24 top-[58%] z-10 hidden animate-chip-pop sm:block">
        <Badge elevation="md">
          <FontAwesomeIcon icon={faHeart} className="text-[11px] text-primary" />
          Synced from Apple Health
        </Badge>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-20 top-[26%] z-10 hidden animate-chip-pop [animation-delay:1.2s] sm:block"
      >
        <Badge dotClassName="bg-vitaThriving" elevation="md">
          7 days of showing up
        </Badge>
      </div>

      {/* Phone bezel */}
      <div className="rounded-[48px] bg-accent p-2.5 shadow-phone">
        <div className="relative h-165 overflow-hidden rounded-[40px] bg-linear-to-b from-baseSecondary to-surfaceWarm text-textPrimary">
          {/* Status bar */}
          <div aria-hidden="true" className="relative flex items-center justify-between px-6 pt-3.5 text-[11px] font-extrabold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2.5 h-6 w-21 -translate-x-1/2 rounded-full bg-accentDeep" />
            <span className="flex items-center gap-1 text-[10px]">
              <FontAwesomeIcon icon={faSignal} />
              <FontAwesomeIcon icon={faWifi} />
              <FontAwesomeIcon icon={faBatteryFull} />
            </span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4">
            <div>
              <p className="text-xl font-black leading-none">Hi, Alex</p>
              <p className="mt-1 text-[10px] font-bold text-textMuted">Sun · Jun 7</p>
            </div>
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-secondary shadow-warmSm">
              <FontAwesomeIcon icon={faGear} className="text-[13px]" />
            </span>
          </div>

          <div className="px-4">
            {/* Bunny hero */}
            <div className="relative mt-1 flex justify-center">
              <div aria-hidden="true" className="absolute top-8 size-28 rounded-full bg-vitaThriving blur-2xl animate-aura-glow" />
              <button
                type="button"
                onClick={handleTap}
                aria-label={`Boop ${BUNNY_NAME}`}
                className="relative cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span key={tapCount} className={`block ${tapCount > 0 ? "animate-bunny-tap" : ""}`}>
                  <Image
                    src="/assets/bunny/great.png"
                    alt=""
                    width={394}
                    height={633}
                    loading="eager"
                    draggable={false}
                    className="h-31 w-auto select-none animate-bunny-breathe"
                  />
                </span>
              </button>
            </div>

            <p className="mt-1 text-center text-base font-black">{BUNNY_NAME}&apos;s thriving</p>
            <p className="mx-auto mt-0.5 max-w-52.5 text-center text-[10px] font-semibold leading-snug text-textMuted">
              You&apos;ve been showing up. Coat&apos;s never looked better.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-1">{VITALITY_CHIPS.map(renderChip)}</div>

            {/* Calories */}
            <p className={SECTION_LABEL}>Today&apos;s fuel</p>
            <Card padding="sm" radius="md" className="flex items-center gap-3">
              <div className="relative size-16 shrink-0">
                <svg viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="size-full -rotate-90" aria-hidden="true">
                  <circle
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth={RING_STROKE}
                    className="stroke-surfaceRaised"
                  />
                  <circle
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth={RING_STROKE}
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_OFFSET}
                    className="stroke-pillarCalories"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-black leading-none tabular-nums">{CALORIE_TARGET - CALORIES}</span>
                  <span className="text-[7px] font-bold text-textMuted">left</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-extrabold">Calories</span>
                  <span className="text-[9px] font-bold tabular-nums text-textMuted">
                    {CALORIES} / {CALORIE_TARGET}
                  </span>
                </div>
                <div className="mt-1.5 space-y-1">{MACROS.map(renderMacro)}</div>
              </div>
            </Card>

            {/* Pillars */}
            <p className={SECTION_LABEL}>The rest of you</p>
            <div className="grid grid-cols-2 gap-2">{PILLARS.map(renderPillar)}</div>
          </div>

          {/* Affirmation toast: re-keyed per tap so the animation replays */}
          <div role="status" className="pointer-events-none absolute inset-x-0 bottom-19.5 flex justify-center">
            {affirmation ? (
              <span
                key={tapCount}
                className="rounded-full bg-accent px-3.5 py-1.5 text-[10px] font-bold text-secondary shadow-warmLg animate-toast-life"
              >
                {affirmation}
              </span>
            ) : null}
          </div>

          {/* Tab bar */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex items-end justify-around border-t border-borderSoft bg-secondary/95 px-2 pb-5 pt-2 backdrop-blur"
          >
            {TABS_LEFT.map(renderTab)}
            <span className="-mt-7 grid size-11 place-items-center rounded-full bg-primary text-secondary shadow-cta">
              <FontAwesomeIcon icon={faPlus} className="text-base" />
            </span>
            {TABS_RIGHT.map(renderTab)}
            <span className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-accent/80" />
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-[13px] font-bold text-textMuted">
        Psst, tap {BUNNY_NAME}.
      </figcaption>
    </figure>
  );
};

export default memo(AppPreview);
