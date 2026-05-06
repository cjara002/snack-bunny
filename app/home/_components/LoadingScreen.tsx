import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => (
  <div className="min-h-screen bg-linear-to-b from-[#fff9f5] to-[#ffe8dc] flex flex-col items-center justify-center gap-4">
    <FontAwesomeIcon
      icon={faCarrot}
      className="w-16 h-16 text-[#E07A5F] animate-bunny-float"
      aria-hidden="true"
    />
    <p className="text-sm font-bold text-[#A08070]">Loading your bunny…</p>
  </div>
);

export default LoadingScreen;
