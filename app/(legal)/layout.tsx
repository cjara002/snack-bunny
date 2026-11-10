import LandingNav from "../landing/_components/LandingNav";
import LandingFooter from "../landing/_components/LandingFooter";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingNav />
      <main id="top" className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 md:px-8 md:pt-16">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
