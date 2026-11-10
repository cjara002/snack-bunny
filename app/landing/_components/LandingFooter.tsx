import Image from "next/image";
import Link from "next/link";

const FOOTER_LINK = "transition-colors hover:text-textPrimary";

// Shared by the landing page and the legal pages, so links are absolute.
const LandingFooter = () => (
  <footer className="border-t border-borderSoft/70">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center md:flex-row md:justify-between md:px-12 md:text-left">
      <Link href="/" aria-label="SnackBunny home" className="-my-3 rounded-xl">
        <Image src="/assets/snack-bunny-logo.png" alt="SnackBunny" width={721} height={346} className="h-16 w-auto" />
      </Link>
      <nav aria-label="Footer" className="flex gap-6 text-sm font-bold text-textMuted">
        <Link href="/#bunny" className={FOOTER_LINK}>
          Meet the bunny
        </Link>
        <Link href="/#features" className={FOOTER_LINK}>
          Features
        </Link>
        <Link href="/#waitlist" className={FOOTER_LINK}>
          Waitlist
        </Link>
      </nav>
      <div className="text-xs font-semibold text-textFaint md:text-right">
        <nav aria-label="Legal" className="flex justify-center gap-4 text-[13px] font-bold text-textMuted md:justify-end">
          <Link href="/privacy" className={FOOTER_LINK}>
            Privacy
          </Link>
          <Link href="/terms" className={FOOTER_LINK}>
            Terms
          </Link>
        </nav>
        <p className="mt-2">&copy; {new Date().getFullYear()} SnackBunny</p>
        <p className="mt-1">Not a medical or weight-loss tool.</p>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
