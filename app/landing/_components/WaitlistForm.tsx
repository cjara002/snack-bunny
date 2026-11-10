"use client";

import { memo, useCallback, useId, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import { HONEYPOT_FIELD_NAME, WAITLIST_ENDPOINT } from "@/lib/waitlist/constants";
import type { WaitlistPayload } from "@/lib/interface/WaitlistPayload";
import type { WaitlistFormProps } from "../interface/WaitlistFormProps";

const ERROR_COPY = {
  offline: "You're offline. Check your connection and try again.",
  error: "Something went wrong on our end. Please try again.",
} as const;

const WaitlistForm = ({ align = "start", className = "" }: WaitlistFormProps) => {
  const inputId = useId();
  const noteId = useId();
  const honeypotId = useId();
  // When the form first rendered; the server rejects instant (bot) submits.
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "submitting" | "offline" | "error">("idle");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const honeypot = formData.get(HONEYPOT_FIELD_NAME);
      if (typeof email !== "string") return;

      const payload: WaitlistPayload = {
        email: email.trim(),
        startedAt,
        [HONEYPOT_FIELD_NAME]: typeof honeypot === "string" ? honeypot : "",
      };

      setStatus("submitting");
      try {
        const response = await fetch(WAITLIST_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          setStatus("error");
          return;
        }
        setSubmittedEmail(payload.email);
      } catch {
        // fetch only throws when the request never got a response.
        setStatus(navigator.onLine ? "error" : "offline");
      }
    },
    [startedAt],
  );

  const marginClass = align === "center" ? "mx-auto" : "mx-auto md:mx-0";
  const textAlignClass = align === "center" ? "text-center" : "text-center md:text-left";
  const isSubmitting = status === "submitting";
  const errorMessage = status === "offline" || status === "error" ? ERROR_COPY[status] : null;

  if (submittedEmail) {
    return (
      <div
        role="status"
        className={`flex w-full max-w-md items-start gap-3 rounded-3xl bg-secondary p-4 text-left shadow-warmMd animate-pop-in ${marginClass} ${className}`}
      >
        <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 size-5 shrink-0 text-pillarSteps" />
        <div>
          <p className="font-black text-textPrimary">You&apos;re on the list.</p>
          <p className="mt-0.5 text-sm font-semibold text-textMuted">
            We&apos;ll email <span className="font-bold text-textSecondary">{submittedEmail}</span> when your
            bunny is ready to meet you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${marginClass} ${className}`}>
      {/* Honeypot: hidden from people and screen readers, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={honeypotId}>Leave this field empty</label>
        <input id={honeypotId} name={HONEYPOT_FIELD_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={noteId}
          aria-invalid={errorMessage ? true : undefined}
          size="lg"
        />
        <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting} className="sm:px-7">
          {isSubmitting ? <FontAwesomeIcon icon={faCircleNotch} spin /> : null}
          {isSubmitting ? "Joining..." : "Join the waitlist"}
        </Button>
      </div>
      <p
        id={noteId}
        role={errorMessage ? "alert" : undefined}
        className={`mt-3 text-[13px] font-bold ${errorMessage ? "text-errorPrimary" : "text-textMuted"} ${textAlignClass}`}
      >
        {errorMessage ?? "One email when we launch. No spam, ever."}
      </p>
    </form>
  );
};

export default memo(WaitlistForm);
