import Nav from "./_components/Nav";
import HeroSection from "./_components/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import WhyItWorksSection from "./_components/WhyItWorksSection";
import QuotesSection from "./_components/QuotesSection";
import PricingSection from "./_components/PricingSection";
import SignupSection from "./_components/SignupSection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main
        id="top"
        className="w-full max-w-120 md:max-w-5xl mx-auto px-5 md:px-12"
      >
        <HeroSection />
        <HowItWorksSection />
        <WhyItWorksSection />
        {/* TODOCARLOS: once we get reviews they go here */}
        {/* <QuotesSection /> */}
        <PricingSection />
        <SignupSection />
        <Footer />
      </main>
    </>
  );
}
