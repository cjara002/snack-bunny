import Image from "next/image";
import WaitlistForm from "./WaitlistForm";

const WaitlistSection = () => (
  <section id="waitlist" aria-labelledby="waitlist-heading" className="scroll-mt-24 pb-16 pt-28 md:pb-24 md:pt-36">
    <div className="relative rounded-[40px] bg-linear-to-br from-secondary via-surfaceWarm to-primary/25 px-6 pb-12 pt-28 text-center shadow-warmLg md:px-12 md:pb-16 md:pt-32">
      {/* The cheering bunny pops up over the card's top edge */}
      <Image
        src="/assets/bunny/hooray.png"
        alt=""
        width={481}
        height={518}
        className="absolute left-1/2 top-0 h-44 w-auto -translate-x-1/2 -translate-y-1/2 animate-bunny-breathe md:h-52"
      />
      <h2
        id="waitlist-heading"
        className="mx-auto max-w-xl text-balance text-[clamp(30px,6vw,46px)] font-black leading-[1.06] tracking-tight text-textPrimary"
      >
        Be the first to meet your bunny.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-lg font-semibold leading-relaxed text-textMuted">
        SnackBunny is coming to iPhone. Join the waitlist and we&apos;ll let you know the day it&apos;s ready.
      </p>
      <WaitlistForm align="center" className="mt-8" />
    </div>
  </section>
);

export default WaitlistSection;
