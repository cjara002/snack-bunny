import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const SignedInRow = () => (
  <div className="flex items-center gap-3.5 px-4 py-3.5">
    <div className="shrink-0 w-9 h-9 rounded-xl bg-sucessSecondary flex items-center justify-center">
      <FontAwesomeIcon icon={faCloudArrowUp} className="text-successTertiary text-base" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[15px] font-extrabold text-textPrimary">Signed in</div>
      <div className="text-[13px] font-semibold text-textMuted">
        Your bunny is synced across devices
      </div>
    </div>
  </div>
);

export default SignedInRow;
