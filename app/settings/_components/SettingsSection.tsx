interface SettingsSectionProps {
  label: string;
  children: React.ReactNode;
}

const SettingsSection = ({ label, children }: SettingsSectionProps) => (
  <div className="mt-5">
    <div className="text-[11px] font-extrabold text-[#C9A090] uppercase tracking-widest mb-2.5 px-1">
      {label}
    </div>
    <div className="bg-white rounded-[20px] shadow-[0_1px_2px_rgba(74,55,40,0.06)] overflow-hidden divide-y divide-borderSoft">
      {children}
    </div>
  </div>
);

export default SettingsSection;
