import Image from "next/image";
import { buttonVariants } from "@/app/_components/ui/Button";

const LandingNav = () => (
  <header className="sticky top-0 z-50 border-b border-borderSoft/60 bg-baseSecondary/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 md:px-12">
      <a href="#top" aria-label="SnackBunny home" className="-my-2 -ml-3 rounded-xl">
        <Image
          src="/assets/snack-bunny-logo.png"
          alt="SnackBunny"
          width={721}
          height={346}
          loading="eager"
          className="h-16 w-auto md:h-20"
        />
      </a>
      <a href="#join" className={buttonVariants({ size: "sm" })}>
        Join the waitlist
      </a>
    </div>
  </header>
);

export default LandingNav;
