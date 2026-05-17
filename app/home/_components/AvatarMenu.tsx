"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { signOut } from "@/lib/auth/signOut";
import type { User } from "@supabase/supabase-js";

function getInitial(email?: string): string {
  if (!email) return "?";
  return email.trim().charAt(0).toUpperCase();
}

interface AvatarMenuProps {
  user: User;
}

const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    setOpen(false);
    const { error } = await signOut();

    if (error) {
      setLoading(false);
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "error",
        title: "Could not sign out. Try again?",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "snackbunny-toast snackbunny-toast-error",
          container: "snackbunny-toast-container",
        },
      });
      return;
    }

    sessionStorage.setItem("sb_just_signed_out", "1");
    router.push("/");
  };

  return (
    <div ref={ref} className="relative hidden md:flex items-center">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        aria-label="Account menu"
        className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-surfaceTertiary cursor-pointer transition-colors disabled:opacity-50"
      >
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm select-none">
          {getInitial(user.email)}
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="text-textSecondary w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-secondary border border-borderSoft rounded-2xl shadow-lg z-40 overflow-hidden">
          <div className="px-4 py-3 text-sm text-textSecondary border-b border-borderSoft truncate">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-textPrimary text-left hover:bg-surfaceTertiary transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
