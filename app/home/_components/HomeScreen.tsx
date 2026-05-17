"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSnackEvents } from "@/app/hook/useSnackEvents";
import { faLeaf, faCookie, faPizzaSlice, faFire, faBed, faBomb } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { User } from "@supabase/supabase-js";
import { FEATURES } from "@/lib/features";
import AppShell from "./AppShell";
import HomeHeader from "./HomeHeader";
import StatusPill from "./StatusPill";
import BunnyTapZone from "./BunnyTapZone";
import Counter from "./Counter";
import UndoButton from "./UndoButton";
import LoadingScreen from "./LoadingScreen";

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


const getDateLabel = (): string => {
  const formatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `Today, ${formatted}`;
};

const BUNNY_NAME_KEY = "bunny_name";
const ONBOARDING_COMPLETE_KEY = "onboarding_complete";

const HomeScreen = () => {
  const { userId, syncStatus, addEvent, removeLastEvent } = useSnackEvents();
  const [mounted, setMounted] = useState(false);
  const [bunnyName, setBunnyName] = useState("Bunny");
  const [count, setCount] = useState(0);
  const [tapKey, setTapKey] = useState(0);
  const [showUndo, setShowUndo] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dateLabel = getDateLabel();

  useEffect(() => {
    if (!localStorage.getItem(ONBOARDING_COMPLETE_KEY)) {
      // Grandfather existing users who named their bunny before onboarding existed
      if (localStorage.getItem(BUNNY_NAME_KEY)) {
        localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
        localStorage.setItem("committed_at", Date.now().toString());
        localStorage.setItem("commitment_method", "grandfathered");
      } else {
        window.location.replace("/onboarding");
        return;
      }
    }
    const todayCount = getTodayTimestamps().length;
    const savedName = localStorage.getItem(BUNNY_NAME_KEY) || "Bunny";
    setCount(todayCount);
    setBunnyName(savedName);
    setMounted(true);

    if (FEATURES.AUTH_ENABLED) {
      createClient().auth.getUser().then(({ data }) => setUser(data.user));
    }
  }, []);

  useEffect(() => {
    function syncOfflineQueue() {
      const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
      if (queue.length === 0 || !navigator.onLine) return;
      if (!userId) return;

      const supabase = createClient();
      const rows = queue.map((ts: number) => ({
        user_id: userId,
        created_at: new Date(ts).toISOString(),
      }));
      supabase.from('snack_events').insert(rows).then(({ error }) => {
        if (!error) localStorage.removeItem('offlineQueue');
      });
    }

    syncOfflineQueue();
    window.addEventListener('online', syncOfflineQueue);
    return () => window.removeEventListener('online', syncOfflineQueue);
  }, [userId]);

  if (!mounted) return <LoadingScreen />;

  const handleTap = () => {
    if (count >= 20) return;

    const newCount = count + 1;
    setCount(newCount);
    setTapKey((k) => k + 1);
    setShowUndo(true);
    addEvent();

    if (navigator.vibrate) navigator.vibrate(10);

    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setShowUndo(false), 4000);
  };

  const handleUndo = () => {
    if (count <= 0) return;
    setCount((c) => c - 1);
    setShowUndo(false);
    removeLastEvent();
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
  };

  const stageIndex = getStageIndex(count);

  return (
    <AppShell activeNav="today">
      <HomeHeader dateLabel={dateLabel} syncStatus={syncStatus} user={user} />
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
