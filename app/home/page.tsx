import type { Metadata } from "next";
import HomeScreen from "./_components/HomeScreen";

export const metadata: Metadata = {
  title: "SnackBunny — Today",
};

export default function HomePage() {
  return <HomeScreen />;
}
