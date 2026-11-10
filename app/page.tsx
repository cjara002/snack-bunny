import LandingNav from "./landing/_components/LandingNav";
import HeroSection from "./landing/_components/HeroSection";
import MoodShowcase from "./landing/_components/MoodShowcase";
import PillarsSection from "./landing/_components/PillarsSection";
import PrinciplesSection from "./landing/_components/PrinciplesSection";
import WaitlistSection from "./landing/_components/WaitlistSection";
import LandingFooter from "./landing/_components/LandingFooter";
import SignedOutToastManager from "./_components/SignedOutToastManager";

// The phase-1 landing sections (app/_components/*Section.tsx) are kept on disk
// but no longer rendered. SignedOutToastManager stays: the phase-1 app routes
// back here after sign-out and expects the toast.
export default function Home() {
  return (
    <>
      <LandingNav />
      <SignedOutToastManager />
      <main id="top" className="mx-auto w-full max-w-6xl px-5 md:px-12">
        <HeroSection />
        <MoodShowcase />
        <PillarsSection />
        <PrinciplesSection />
        <WaitlistSection />
      </main>
      <LandingFooter />
    </>
  );
}
