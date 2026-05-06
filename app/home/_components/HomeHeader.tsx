import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface HomeHeaderProps {
  dateLabel: string;
}

const HomeHeader = ({ dateLabel }: HomeHeaderProps) => (
  <div className="flex items-start justify-between pt-2">
    <div>
      <h1 className="text-2xl font-extrabold text-[#4A3728] md:hidden">SnackBunny</h1>
      <p className="text-md font-semibold text-[#A08070] mt-0.5">{dateLabel}</p>
    </div>
    <Link
      href="/history"
      className="md:hidden bg-white/80 border-2 border-[rgba(74,55,40,0.12)] text-[#A08070] font-bold text-md px-3 py-1.5 rounded-full hover:text-[#4A3728] hover:bg-white transition-colors"
    >
      This week <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
    </Link>
  </div>
);

export default HomeHeader;
