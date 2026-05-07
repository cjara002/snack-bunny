interface ProfileCardProps {
  totalSnacks: number;
}

const ProfileCard = ({ totalSnacks }: ProfileCardProps) => (
  <div className="bg-white rounded-[22px] p-4.5 shadow-[0_1px_2px_rgba(74,55,40,0.06)] flex items-center gap-3.5">
    <div className="shrink-0 w-14 h-14 rounded-[18px] bg-[#FFE8DC] flex items-center justify-center">
      <img
        src="/assets/snack-bunny-favicon.png"
        alt=""
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[16px] font-black text-[#4A3728]">Free Plan</span>
        <span className="bg-[#7EC8A0] text-white text-[9px] font-black uppercase tracking-wide px-2 py-0.75 rounded-full">
          Active
        </span>
      </div>
      <p className="text-[13px] font-semibold text-[#A08070] mt-0.5">
        Anonymous user · {totalSnacks} snack{totalSnacks !== 1 ? "s" : ""} logged
      </p>
    </div>
  </div>
);

export default ProfileCard;
