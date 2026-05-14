const Footer = () => (
  <footer className="py-8 pb-12 text-center text-textMuted">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/assets/snack-bunny-favicon.png"
      alt=""
      width={100}
      height={100}
      className="mx-auto mb-2.5 opacity-60"
    />
    <div className="flex justify-center gap-4.5 mb-3 text-[13px] font-bold">
      <a href="#" className="hover:text-textPrimary transition-colors">
        Privacy
      </a>
      <a href="#" className="hover:text-textPrimary transition-colors">
        Terms
      </a>
      <a href="#" className="hover:text-textPrimary transition-colors">
        Contact
      </a>
    </div>
    <div className="text-xs font-medium text-[#C9A090]">
      © 2026 SnackBunny — No calorie counting, no guilt.
    </div>
    <div className="text-xs text-[#C9A090] opacity-70 mt-1">
      Not a medical or weight-loss tool.
    </div>
  </footer>
);

export default Footer;
