"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarDays, faGear } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface NavItemDef {
  id: string;
  label: string;
  icon: IconDefinition;
  href: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: "today", label: "Today", icon: faHouse, href: "/home" },
  { id: "history", label: "History", icon: faCalendarDays, href: "/history" },
  { id: "settings", label: "Settings", icon: faGear, href: "/settings" },
];

interface AdaptiveNavProps {
  active: string;
}

const AdaptiveNav = ({ active }: AdaptiveNavProps) => (
  <nav className="
    fixed bottom-0 left-0 right-0 z-50
    bg-[rgba(255,249,245,0.92)] backdrop-blur-md
    border-t border-[rgba(74,55,40,0.1)]
    flex justify-around
    pt-2 pb-[max(8px,env(safe-area-inset-bottom))]
    md:top-0 md:right-auto md:bottom-auto
    md:w-60 md:h-screen
    md:border-r md:border-t-0
    md:flex-col md:justify-start
    md:p-6 md:gap-1
  ">
    {/* Brand — desktop only */}
    <div className="hidden md:flex items-center mb-8">
    <img
      src="/assets/snack-bunny-favicon.png"
      alt=""
      width={100}
      height={100}

    />
      <span className="font-extrabold text-textPrimary text-base">SnackBunny</span>
    </div>

    {NAV_ITEMS.map(({ id, label, icon, href }) => {
      const isActive = active === id;
      return (
        <Link
          key={id}
          href={href}
          className={[
            "flex flex-col items-center gap-1.5 px-4 py-2 transition-colors",
            "md:flex-row md:gap-3 md:px-3 md:py-2.5 md:rounded-xl md:w-full",
            isActive
              ? "opacity-100 md:bg-[rgba(74,55,40,0.08)]"
              : "opacity-45 md:opacity-100 md:text-textMuted md:hover:bg-[rgba(74,55,40,0.05)]",
          ].join(" ")}
        >
          <FontAwesomeIcon
            icon={icon}
            className={`w-20 h-20 md:w-5 md:h-5 ${isActive ? "text-textPrimary" : "text-textPrimary md:text-textMuted"}`}
          />
          <span
            className={`text-lg font-bold md:text-sm md:font-semibold ${
              isActive ? "text-textPrimary" : "text-textPrimary md:text-textMuted"
            }`}
          >
            {label}
          </span>
        </Link>
      );
    })}

  </nav>
);

export default AdaptiveNav;
