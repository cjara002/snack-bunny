import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLeaf } from "@fortawesome/free-solid-svg-icons";
import Badge from "@/app/_components/ui/Badge";
import AppPreview from "./AppPreview";
import WaitlistForm from "./WaitlistForm";

const HeroSection = () => (
  <section className="relative grid items-center gap-14 pb-16 pt-8 md:grid-cols-[1fr_auto] md:gap-12 md:pb-24 md:pt-14 lg:gap-20">
    {/* Copy */}
    <div className="text-center md:text-left">
      <Badge tone="brand" size="sm" dotClassName="bg-primary" className="uppercase tracking-widest">
        Coming soon to iPhone
      </Badge>

      <h1 className="mt-5 text-[clamp(40px,10vw,64px)] font-black leading-[1.02] tracking-tight text-textPrimary">
        Your progress
        <br />
        has a <span className="text-primary">face.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-[34ch] text-lg font-semibold leading-relaxed text-textMuted md:mx-0">
        SnackBunny is a gentle self-care companion. Log your meals, water, sleep and mood, and your bunny shows how
        you&apos;re really doing.{" "}
        <span className="font-extrabold text-textSecondary">It reacts to your habits, never your body.</span>
      </p>

      <div id="join" className="mt-8 scroll-mt-28">
        <WaitlistForm />
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-bold text-textMuted md:justify-start">
        <li className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faHeart} className="text-primary" />
          Works with Apple Health
        </li>
        <li className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faLeaf} className="text-pillarSteps" />
          Free to start
        </li>
      </ul>
    </div>

    {/* App preview */}
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-1/4 mx-auto size-80 rounded-full bg-primary/15 blur-3xl" />
      <AppPreview />
    </div>
  </section>
);

export default HeroSection;
