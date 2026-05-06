import type { Metadata } from "next";
import OnboardingShell from "./_components/OnboardingShell";

export const metadata: Metadata = {
  title: "SnackBunny — Let's get started",
};

export default function OnboardingPage() {
  return <OnboardingShell />;
}
