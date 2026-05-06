import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Stage {
  icon: IconDefinition;
  label: string;
  color: string;
}

interface StatusPillProps {
  stage: Stage;
}

const StatusPill = ({ stage }: StatusPillProps) => (
  <div className="flex justify-center mt-4">
    <div className="bg-white/80 rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2 transition-all duration-200">
      <FontAwesomeIcon
        icon={stage.icon}
        className="w-3.5 h-3.5 transition-colors duration-200"
        style={{ color: stage.color }}
        aria-hidden="true"
      />
      <span
        className="text-lg font-bold transition-colors duration-200"
        style={{ color: stage.color }}
      >
        {stage.label}
      </span>
    </div>
  </div>
);

export default StatusPill;
