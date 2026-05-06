"use client";

import { useState, useEffect, useRef } from "react";
import { faLeaf, faCookie, faPizzaSlice, faFire, faBed, faBomb } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import AppShell from "./AppShell";
import HomeHeader from "./HomeHeader";
import StatusPill from "./StatusPill";
import BunnyTapZone from "./BunnyTapZone";
import Counter from "./Counter";
import UndoButton from "./UndoButton";
import LoadingScreen from "./LoadingScreen";
import NamingScreen from "./NamingScreen";

interface Stage {
  icon: IconDefinition;
  label: string;
  color: string;
}

const STAGES: Stage[] = [
  { icon: faLeaf,       label: "Lean & clean",   color: "#7EC8A0" },
  { icon: faCookie,     label: "Getting snacky",  color: "#F6B93B" },
  { icon: faPizzaSlice, label: "Snack detected",  color: "#E07A5F" },
  { icon: faFire,       label: "Snack attack!",   color: "#D65C3A" },
  { icon: faBed,        label: "Couch mode",      color: "#C94B30" },
  { icon: faBomb,       label: "Snack galore",    color: "#B03020" },
];

const getStageIndex = (count: number): number => {
  if (count >= 16) return 5;
  if (count >= 12) return 4;
  if (count >= 8) return 3;
  if (count >= 4) return 2;
  if (count >= 1) return 1;
  return 0;
};

const STORAGE_KEY = "snack_events";

const getTodayTimestamps = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: number[] = raw ? JSON.parse(raw) : [];
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return all.filter((t) => t >= todayStart.getTime());
  } catch {
    return [];
  }
};

const persistAdd = (): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: number[] = raw ? JSON.parse(raw) : [];
    all.push(Date.now());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
};

const persistRemoveLast = (): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: number[] = raw ? JSON.parse(raw) : [];
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const past = all.filter((t) => t < todayStart.getTime());
    const today = all.filter((t) => t >= todayStart.getTime());
    if (today.length > 0) today.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...past, ...today]));
  } catch {}
};

const getDateLabel = (): string => {
  const formatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `Today, ${formatted}`;
};

const BUNNY_NAME_KEY = "bunny_name";

const HomeScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [bunnyName, setBunnyName] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [tapKey, setTapKey] = useState(0);
  const [showUndo, setShowUndo] = useState(false);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dateLabel = getDateLabel();

  useEffect(() => {
    const todayCount = getTodayTimestamps().length;
    const savedName = localStorage.getItem(BUNNY_NAME_KEY);
    setCount(todayCount);
    setBunnyName(savedName);
    setMounted(true);
  }, []);

  const handleNameConfirm = (name: string) => {
    localStorage.setItem(BUNNY_NAME_KEY, name);
    setBunnyName(name);
  };

  if (!mounted) return <LoadingScreen />;
  if (!bunnyName) return <NamingScreen onConfirm={handleNameConfirm} />;

  const handleTap = () => {
    if (count >= 20) return;

    const newCount = count + 1;
    setCount(newCount);
    setTapKey((k) => k + 1);
    setShowUndo(true);
    persistAdd();

    if (navigator.vibrate) navigator.vibrate(10);

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setShowUndo(false), 4000);
  };

  const handleUndo = () => {
    if (count <= 0) return;
    setCount((c) => c - 1);
    setShowUndo(false);
    persistRemoveLast();
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
  };

  const stageIndex = getStageIndex(count);

  return (
    <AppShell activeNav="today">
      <HomeHeader dateLabel={dateLabel} />
      <div className="flex-1 flex flex-col justify-center md:justify-start">
        <StatusPill stage={STAGES[stageIndex]} />
        <BunnyTapZone
          stageIndex={stageIndex}
          tapKey={tapKey}
          onTap={handleTap}
          showHelperText={count === 0}
        />
        <Counter count={count} tapKey={tapKey} bunnyName={bunnyName} />
        <UndoButton visible={showUndo} onClick={handleUndo} />
      </div>
    </AppShell>
  );
};

export default HomeScreen;
