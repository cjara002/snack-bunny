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
import { SignInModal } from "@/app/_components/SignInModal";
import { FEATURES } from "@/lib/features";
import { createClient } from "@/lib/supabase/client";
import SignedInRow from "./SignedInRow";
import SignOutRow from "./SignOutRow";
import AvatarMenu from "@/app/home/_components/AvatarMenu";
import { signOut } from "@/lib/auth/signOut";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

const SettingsScreen = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [bunnyName, setBunnyName] = useState("Bunny");
  const [totalSnacks, setTotalSnacks] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const name = localStorage.getItem(BUNNY_NAME_KEY) || "Bunny";
    let events: number[] = [];
    try {
      events = JSON.parse(localStorage.getItem(SNACK_EVENTS_KEY) ?? "[]");
    } catch {}
    setBunnyName(name);
    setTotalSnacks(events.length);
    setMounted(true);

    if (FEATURES.AUTH_ENABLED) {
      createClient().auth.getUser().then(({ data }) => setUser(data.user));
    }
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

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "error",
        title: "Could not sign out. Try again?",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "snackbunny-toast snackbunny-toast-error",
          container: "snackbunny-toast-container",
        },
      });
      return;
    }
    sessionStorage.setItem("sb_just_signed_out", "1");
    router.push("/");
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
          <p className="text-[14px] font-bold text-textMuted">Clearing data…</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeNav="settings">
      <div className="pt-2 pb-4">
        {/* Page header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-black text-textPrimary tracking-tight leading-tight">
              Settings
            </h1>
            <p className="text-[13px] font-bold text-textMuted mt-1">
              Tweak your bunny, manage your data
            </p>
          </div>
          {user && <AvatarMenu user={user} />}
        </div>

        <ProfileCard totalSnacks={totalSnacks} email={user?.email} />

        <SettingsSection label="Your bunny">
          <BunnyNameRow name={bunnyName} onSave={handleSaveName} />
        </SettingsSection>

        <SettingsSection label="Account">
          {user ? (
            <>
              <SignedInRow />
              <SignOutRow onClick={handleSignOut} />
            </>
          ) : (
            <SignInTeaseRow onClick={FEATURES.AUTH_ENABLED ? () => setShowSignIn(true) : undefined} />
          )}
          <ReminderRow />
        </SettingsSection>

        <SettingsSection label="Data">
          <DeleteDataRow onDelete={handleDeleteData} />
        </SettingsSection>

        <SettingsFooter />
      </div>
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </AppShell>
  );
};

export default SettingsScreen;
