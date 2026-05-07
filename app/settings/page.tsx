import type { Metadata } from "next";
import SettingsScreen from "./_components/SettingsScreen";

export const metadata: Metadata = {
  title: "SnackBunny — Settings",
};

export default function SettingsPage() {
  return <SettingsScreen />;
}
