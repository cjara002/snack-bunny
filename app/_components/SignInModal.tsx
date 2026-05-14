"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleNotch, faChevronRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@/lib/supabase/client";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextLine?: string;
}

type Status =
  | { type: "idle" }
  | { type: "google_loading" }
  | { type: "magic_loading" }
  | { type: "magic_sent"; email: string }
  | { type: "error"; message: string };

export const SignInModal = ({
  isOpen,
  onClose,
  contextLine,
}: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStatus({ type: "idle" });
      setEmail("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current) modalRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleMagicLink = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid email." });
      return;
    }
    setStatus({ type: "magic_loading" });
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setStatus({
          type: "error",
          message: "Could not send the link. Try again?",
        });
      } else {
        setStatus({ type: "magic_sent", email: trimmedEmail });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Try again?" });
    }
  };

  const isLoading =
    status.type === "google_loading" || status.type === "magic_loading";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(74,55,40,0.4)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_12px_32px_rgba(74,55,40,0.12)] outline-none"
        style={{
          animation: "modal-enter 220ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close sign in"
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-black transition hover:bg-surfaceTertiary hover:text-textSecondary"
        >
          <FontAwesomeIcon icon={faXmark} className="text-base" aria-hidden="true" />
        </button>

        {status.type === "magic_sent" ? (
          <MagicLinkSentView email={status.email} onClose={onClose} />
        ) : (
          <>
            <div className="mb-2 flex justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-surfaceTertiary">
                <Image
                  src="/assets/snack-bunny-favicon.png"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            </div>

            {contextLine && (
              <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-textMuted">
                {contextLine}
              </p>
            )}

            <h2
              id="signin-title"
              className="mb-2 text-center text-xl font-extrabold text-textPrimary"
            >
              Save your bunny across devices
            </h2>
            <p className="mb-6 text-center text-sm text-textSecondary">
              Sign in to sync your snacks and bunny everywhere.
            </p>

            <div className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-borderSoft bg-white px-4 py-3.5 text-base font-bold text-textMuted opacity-60">
              <GoogleLogo />
              Google sign-in coming soon
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-borderSoft" />
              <span className="text-xs font-semibold text-textMuted">or</span>
              <div className="h-px flex-1 bg-borderSoft" />
            </div>

            <form onSubmit={handleMagicLink}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type === "error") setStatus({ type: "idle" });
                }}
                disabled={isLoading}
                className="mb-3 w-full rounded-2xl border-2 border-borderSoft bg-secondary px-4 py-3.5 text-base text-textPrimary placeholder:text-textMuted focus:border-primary focus:outline-none disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-base font-bold text-white transition hover:bg-primaryTertiary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.type === "magic_loading" ? (
                  <>
                    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-base" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send me a magic link
                    <FontAwesomeIcon icon={faChevronRight} className="text-sm" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {status.type === "error" && (
              <p
                role="alert"
                className="mt-3 text-center text-xs font-semibold text-errorPrimary"
              >
                {status.message}
              </p>
            )}

            <p className="mt-5 text-center text-xs text-textMuted">
              No password. No spam. Just your bunny.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const MagicLinkSentView = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => (
  <div className="py-4 text-center">
    <div className="mb-4 flex justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-successSecondary">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="text-2xl text-successTertiary"
          aria-hidden="true"
        />
      </div>
    </div>
    <h2 className="mb-2 text-xl font-extrabold text-textPrimary">
      Check your email
    </h2>
    <p className="mb-6 text-sm text-textSecondary">
      We sent a magic link to{" "}
      <span className="font-bold text-textPrimary">{email}</span>. Click the
      link to finish signing in.
    </p>
    <button
      onClick={onClose}
      className="w-full rounded-2xl border-2 border-borderSoft bg-secondary px-4 py-3.5 text-base font-bold text-textPrimary transition hover:bg-surfaceTertiary"
    >
      Got it
    </button>
    <p className="mt-4 text-xs text-textMuted">
      Did not get the email? Check your spam folder or try again.
    </p>
  </div>
);

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
