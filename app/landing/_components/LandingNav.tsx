import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/app/_components/ui/Button";

// Shared by the landing page and the legal pages, so links are absolute ("/#join")
// and work from either.
const LandingNav = () => (
  <header className="sticky top-0 z-50 border-b border-borderSoft/60 bg-baseSecondary/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 md:px-12">
      <Link href="/" aria-label="SnackBunny home" className="-my-2 -ml-3 rounded-xl">
        <Image
          src="/assets/snack-bunny-logo.png"
          alt="SnackBunny"
          width={721}
          height={346}
          loading="eager"
          className="h-16 w-auto md:h-20"
        />
      </Link>
      <Link href="/#join" className={buttonVariants({ size: "sm" })}>
        Join the waitlist
      </Link>
    </div>
  </header>
);

export default LandingNav;
