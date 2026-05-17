import Nav from "./_components/Nav";
import HeroSection from "./_components/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import Footer from "./_components/Footer";
import SignedOutToastManager from "./_components/SignedOutToastManager";

export default function Home() {
  return (
    <>
      <Nav />
      <SignedOutToastManager />
      <main
        id="top"
        className="w-full max-w-120 md:max-w-5xl mx-auto px-5 md:px-12"
      >
        <HeroSection />
        <HowItWorksSection />
        <Footer />
      </main>
    </>
  );
}
