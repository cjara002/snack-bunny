import type { Metadata } from "next";
import HistoryScreen from "./_components/HistoryScreen";

export const metadata: Metadata = {
  title: "SnackBunny — History",
};

export default function HistoryPage() {
  return <HistoryScreen />;
}
