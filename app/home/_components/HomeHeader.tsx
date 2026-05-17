import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SyncIndicator from "./SyncIndicator";
import AvatarMenu from "./AvatarMenu";
import type { User } from "@supabase/supabase-js";

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface HomeHeaderProps {
  dateLabel: string;
  syncStatus: SyncStatus;
  user: User | null;
}

const HomeHeader = ({ dateLabel, syncStatus, user }: HomeHeaderProps) => (
  <div className="flex items-start justify-between pt-2">
    <div>
      <h1 className="text-2xl font-extrabold text-textPrimary md:hidden">SnackBunny</h1>
      <p className="text-md font-semibold text-textMuted mt-0.5">{dateLabel}</p>
      <SyncIndicator status={syncStatus} />
    </div>
    <div className="flex items-center gap-2">
      <Link
        href="/history"
        className="md:hidden bg-white/80 border-2 border-[rgba(74,55,40,0.12)] text-textMuted font-bold text-md px-3 py-1.5 rounded-full hover:text-textPrimary hover:bg-white transition-colors"
      >
        This week <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
      </Link>
      {user && <AvatarMenu user={user} />}
    </div>
  </div>
);

export default HomeHeader;
