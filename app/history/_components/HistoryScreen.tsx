"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AppShell from "@/app/home/_components/AppShell";
import SyncBanner from "./SyncBanner";
import StatsRow from "./StatsRow";
import BarChart from "./BarChart";
import BunnyEvolutionRow from "./BunnyEvolutionRow";
import PremiumTeaseCard from "./PremiumTeaseCard";
import HistoryEmptyState from "./HistoryEmptyState";
import { SNACK_EVENTS_KEY } from "@/lib/storage";
import { stageFor } from "@/lib/stages";

interface DayData {
  date: Date;
  abbr: string;
  d: string;
  count: number;
  stage: number;
  today: boolean;
}

interface WeekStats {
  total: string;
  avg: string;
  bestDay: string;
}

function buildWeekData(): DayData[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let events: number[] = [];
  try {
    events = JSON.parse(localStorage.getItem(SNACK_EVENTS_KEY) ?? "[]");
  } catch {}

  return Array.from({ length: 7 }, (_, idx) => {
    const i = 6 - idx;
    const start = new Date(now);
    start.setDate(start.getDate() - i);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const count = events.filter((t) => t >= +start && t < +end).length;
    return {
      date: start,
      abbr: start.toLocaleDateString("en-US", { weekday: "narrow" }),
      d: start.toLocaleDateString("en-US", { weekday: "short" }),
      count,
      stage: stageFor(count).i,
      today: i === 0,
    };
  });
}

function getWeekStats(days: DayData[]): WeekStats {
  const sum = days.reduce((s, d) => s + d.count, 0);
  if (sum === 0) return { total: "—", avg: "—", bestDay: "—" };

  const avg = (sum / 7).toFixed(1);
  const withData = days.filter((d) => d.count > 0);
  const minCount = Math.min(...withData.map((d) => d.count));
  const bestDay = [...withData].reverse().find((d) => d.count === minCount)!.d;

  return { total: String(sum), avg, bestDay };
}

function formatDateRange(days: DayData[]): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(days[0].date)} – ${fmt(days[6].date)}`;
}

const HistoryScreen = () => {
  const [days, setDays] = useState<DayData[]>([]);
  const [stats, setStats] = useState<WeekStats>({ total: "—", avg: "—", bestDay: "—" });
  const [mounted, setMounted] = useState(false);
  const [hasLifetimeSnacks, setHasLifetimeSnacks] = useState(true);

  useEffect(() => {
    const weekData = buildWeekData();
    setDays(weekData);
    setStats(getWeekStats(weekData));
    try {
      const events: number[] = JSON.parse(localStorage.getItem(SNACK_EVENTS_KEY) ?? "[]");
      setHasLifetimeSnacks(events.length > 0);
    } catch {
      setHasLifetimeSnacks(false);
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell activeNav="history">
        <div className="pt-2" />
      </AppShell>
    );
  }

  if (!hasLifetimeSnacks) {
    return (
      <AppShell activeNav="history">
        <div className="pt-2">
          <HistoryEmptyState />
        </div>
      </AppShell>
    );
  }

  const dateRange = formatDateRange(days);

  return (
    <AppShell activeNav="history">
      <div className="pt-2 flex flex-col gap-3">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-black text-[#4A3728] tracking-tight leading-tight">
              This week
            </h1>
            <p className="text-[13px] font-bold text-[#A08070] mt-1">{dateRange}</p>
          </div>
          <Link
            href="/home"
            className="bg-white rounded-full px-4 py-2.5 text-[13px] font-extrabold text-[#4A3728] shadow-[0_1px_2px_rgba(74,55,40,0.06)] whitespace-nowrap hover:shadow-[0_4px_12px_rgba(74,55,40,0.08)] transition-shadow"
          >
            Today →
          </Link>
        </div>

        <SyncBanner />
        <StatsRow stats={stats} />
        <BarChart days={days} />
        <BunnyEvolutionRow days={days} />
        <PremiumTeaseCard />
      </div>
    </AppShell>
  );
};

export default HistoryScreen;
