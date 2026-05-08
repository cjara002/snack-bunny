"use client";

import { useState, useEffect } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 bg-linear-to-b from-[rgba(255,249,245,0.96)] to-[rgba(255,249,245,0.85)] border-b ${
        scrolled ? "border-[#E8D5C4]" : "border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3.5 max-w-5xl mx-auto md:px-12 md:py-4.5">
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label="SnackBunny home"
        >
          <img src="/assets/snack-bunny-logo.png" alt="SnackBunny" className="h-28 w-auto md:h-20" />
        </a>
        <a
          href="/onboarding"
          className="bg-[#E07A5F] text-white font-extrabold text-sm px-4 py-2.5 rounded-full shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-[0.94] transition-all"
        >
          Get started
        </a>
      </div>
    </header>
  );
};

export default Nav;
