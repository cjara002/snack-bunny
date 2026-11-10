import LandingNav from "./landing/_components/LandingNav";
import HeroSection from "./landing/_components/HeroSection";
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
      </main>
    </>
  );
}
