import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface SignOutRowProps {
  onClick: () => void;
}

const SignOutRow = ({ onClick }: SignOutRowProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surfaceTertiary transition-colors"
  >
    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-[#991B1B] text-base" />
    </div>
    <span className="flex-1 text-left text-sm font-semibold text-textPrimary">Sign out</span>
    <FontAwesomeIcon icon={faChevronRight} className="text-textMuted w-3 h-3 shrink-0" />
  </button>
);

export default SignOutRow;
