import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite, faChartSimple, faTrophy } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatCardProps {
  label: string;
  value: string;
  icon: IconDefinition;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="relative bg-white rounded-[18px] px-3 py-3 shadow-[0_1px_2px_rgba(74,55,40,0.06)] hover:shadow-[0_4px_12px_rgba(74,55,40,0.08)] transition-shadow">
    <FontAwesomeIcon
      icon={icon}
      className="hidden md:block absolute top-2.5 right-2.5 w-3.5 h-3.5 text-[#C9A090] opacity-60"
      aria-hidden="true"
    />
    <div className="text-[10px] font-extrabold text-[#C9A090] uppercase tracking-[0.08em] mb-1.5">
      {label}
    </div>
    <div className="text-[30px] font-black text-[#4A3728] tabular-nums leading-none">
      {value}
    </div>
  </div>
);

interface StatsRowProps {
  stats: { total: string; avg: string; bestDay: string };
}

const StatsRow = ({ stats }: StatsRowProps) => (
  <div className="grid grid-cols-3 gap-2.5">
    <StatCard label="Total snacks" value={stats.total}   icon={faCookieBite} />
    <StatCard label="Daily avg"    value={stats.avg}     icon={faChartSimple} />
    <StatCard label="Best day"     value={stats.bestDay} icon={faTrophy} />
  </div>
);

export default StatsRow;
