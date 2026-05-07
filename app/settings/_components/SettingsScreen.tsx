"use client";

import { useState, useEffect } from "react";
import AppShell from "@/app/home/_components/AppShell";
import ProfileCard from "./ProfileCard";
import SettingsSection from "./SettingsSection";
import BunnyNameRow from "./BunnyNameRow";
import SignInTeaseRow from "./SignInTeaseRow";
import ReminderRow from "./ReminderRow";
import DeleteDataRow from "./DeleteDataRow";
import SettingsFooter from "./SettingsFooter";
import { SNACK_EVENTS_KEY, BUNNY_NAME_KEY, SB_KEYS } from "@/lib/storage";

const SettingsScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [bunnyName, setBunnyName] = useState("Bunny");
  const [totalSnacks, setTotalSnacks] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem(BUNNY_NAME_KEY) || "Bunny";
    let events: number[] = [];
    try {
      events = JSON.parse(localStorage.getItem(SNACK_EVENTS_KEY) ?? "[]");
    } catch {}
    setBunnyName(name);
    setTotalSnacks(events.length);
    setMounted(true);
  }, []);

  const handleSaveName = (cleaned: string) => {
    localStorage.setItem(BUNNY_NAME_KEY, cleaned);
    setBunnyName(cleaned);
  };

  const handleDeleteData = () => {
    setDeleting(true);
    SB_KEYS.forEach((k) => localStorage.removeItem(k));
    setTimeout(() => window.location.replace("/onboarding"), 200);
  };

  if (!mounted) {
    return (
      <AppShell activeNav="settings">
        <div className="pt-2" />
      </AppShell>
    );
  }

  if (deleting) {
    return (
      <AppShell activeNav="settings">
        <div className="pt-2 flex items-center justify-center min-h-40">
          <p className="text-[14px] font-bold text-[#A08070]">Clearing data…</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeNav="settings">
      <div className="pt-2 pb-4">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="text-[26px] font-black text-[#4A3728] tracking-tight leading-tight">
            Settings
          </h1>
          <p className="text-[13px] font-bold text-[#A08070] mt-1">
            Tweak your bunny, manage your data
          </p>
        </div>

        <ProfileCard totalSnacks={totalSnacks} />

        <SettingsSection label="Your bunny">
          <BunnyNameRow name={bunnyName} onSave={handleSaveName} />
        </SettingsSection>

        <SettingsSection label="Account">
          <SignInTeaseRow />
          <ReminderRow />
        </SettingsSection>

        <SettingsSection label="Data">
          <DeleteDataRow onDelete={handleDeleteData} />
        </SettingsSection>

        <SettingsFooter />
      </div>
    </AppShell>
  );
};

export default SettingsScreen;
