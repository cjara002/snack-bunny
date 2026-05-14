import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface SyncIndicatorProps {
  status: SyncStatus;
}

const SyncIndicator = ({ status }: SyncIndicatorProps) => {
  if (status === 'idle') return null;

  const config = {
    syncing: {
      icon: faCloudArrowUp,
      label: 'Syncing',
      className: 'bg-[#D1FAE5] text-[#065F46]',
      pulse: true,
    },
    synced: {
      icon: faCircleCheck,
      label: 'Synced',
      className: 'bg-[#D1FAE5] text-[#065F46]',
      pulse: false,
    },
    error: {
      icon: faCircleExclamation,
      label: 'Sync failed',
      className: 'bg-[#FEE2E2] text-[#DC2626]',
      pulse: false,
    },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.className}`}>
      <FontAwesomeIcon
        icon={config.icon}
        className={`text-xs ${config.pulse ? 'animate-pulse' : ''}`}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
};

export default SyncIndicator;
