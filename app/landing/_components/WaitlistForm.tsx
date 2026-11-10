"use client";

import { memo, useCallback, useId, useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import type { WaitlistFormProps } from "../interface/WaitlistFormProps";

const WaitlistForm = ({ align = "start", className = "" }: WaitlistFormProps) => {
  const inputId = useId();
  const noteId = useId();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  // TODO(waitlist): persist the email. Until this is wired up, submitting only
  // shows the confirmation state locally and nothing is saved.
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email === "string") setSubmittedEmail(email.trim());
  }, []);

  const marginClass = align === "center" ? "mx-auto" : "mx-auto md:mx-0";
  const noteAlignClass = align === "center" ? "text-center" : "text-center md:text-left";

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
    <form onSubmit={handleSubmit} className={`w-full max-w-md ${marginClass} ${className}`}>
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
          size="lg"
        />
        <Button type="submit" size="lg" className="sm:px-7">
          Join the waitlist
        </Button>
      </div>
      <p id={noteId} className={`mt-3 text-[13px] font-bold text-textMuted ${noteAlignClass}`}>
        One email when we launch. No spam, ever.
      </p>
    </form>
  );
};

export default memo(WaitlistForm);
