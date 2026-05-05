"use client";

import { useState } from "react";

type MsgType = "neutral" | "error" | "success";

interface Msg {
  text: string;
  type: MsgType;
}

const SignupSection = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<Msg>({
    text: "No spam. Just bunny updates.",
    type: "neutral",
  });
  const [submitted, setSubmitted] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setMsg({ text: "Hmm, that doesn't look like an email.", type: "error" });
      if (!shaking) {
        setShaking(true);
        setTimeout(() => setShaking(false), 300);
      }
      return;
    }
    setMsg({ text: "Sending magic link…", type: "neutral" });
    setTimeout(() => setSubmitted(true), 600);
  };

  const msgColor =
    msg.type === "error"
      ? "text-[#9F1239]"
      : msg.type === "success"
        ? "text-[#065F46]"
        : "text-[#A08070]";

  return (
    <section
      id="signup"
      className="signup-section -mx-5 md:mx-0 mt-14 px-6 py-16 md:py-20 text-center rounded-none md:rounded-[1.5rem] relative overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/bunny-stage-1.svg"
        alt=""
        width={110}
        height={110}
        className="w-[110px] mx-auto mb-1 relative z-[1]"
      />

      <div className="text-xs font-bold tracking-[0.08em] uppercase text-[#E07A5F] mb-3 relative z-[1]">
        Almost there
      </div>

      <h2 className="font-black text-[clamp(28px,7vw,38px)] leading-[1.05] tracking-tight text-[#4A3728] mb-3 relative z-[1] max-w-[16ch] mx-auto">
        Adopt your <span className="text-[#E07A5F]">SnackBunny</span>
      </h2>

      <p className="text-[#A08070] mx-auto mb-6 max-w-[30ch] text-[15px] font-medium relative z-[1]">
        Drop your email. We&apos;ll send you a magic link to start tapping in
        seconds.
      </p>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-2.5 max-w-[360px] mx-auto relative z-[1]"
        >
          <div
            className={`flex gap-2 bg-white rounded-[2rem] p-1.5 shadow-[0_4px_12px_rgba(74,55,40,0.08)] focus-within:shadow-[0_0_0_4px_rgba(224,122,95,0.18),0_4px_12px_rgba(74,55,40,0.08)] transition-shadow ${
              shaking ? "animate-shake" : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="you@snack.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 border-0 outline-none bg-transparent px-[14px] py-3 font-bold text-[15px] text-[#4A3728] placeholder:text-[#C9A090] placeholder:font-medium"
            />
            <button
              type="submit"
              className="bg-[#E07A5F] text-white font-extrabold text-sm px-5 py-3 rounded-[2rem] shadow-[0_6px_16px_rgba(224,122,95,0.35)] flex-shrink-0 hover:bg-[#B85A3F] active:scale-[0.94] transition-all"
            >
              Let&apos;s go!
            </button>
          </div>
          <div
            aria-live="polite"
            className={`text-xs font-bold min-h-[18px] transition-colors ${msgColor}`}
          >
            {msg.text}
          </div>
        </form>
      ) : (
        <div
          className="animate-pop-in bg-white p-6 rounded-[1.5rem] shadow-[0_4px_12px_rgba(74,55,40,0.08)] max-w-[360px] mx-auto relative z-[1]"
          role="status"
        >
          <h3 className="font-extrabold text-xl text-[#4A3728] mb-1.5">
            🥕 Your bunny is on the way
          </h3>
          <p className="text-sm text-[#A08070]">
            Check your inbox for a magic link. We&apos;ll have you tapping in
            30 seconds.
          </p>
        </div>
      )}
    </section>
  );
};

export default SignupSection;
