"use client";

import { useState } from "react";

interface NamingScreenProps {
  onConfirm: (name: string) => void;
}

const NamingScreen = ({ onConfirm }: NamingScreenProps) => {
  const [name, setName] = useState("Bunny");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#fff9f5] to-[#ffe8dc] flex flex-col items-center justify-center px-8 gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/bunny-stage-0.svg"
        alt="Your new SnackBunny"
        width={200}
        height={200}
        className="w-48 animate-bunny-float"
        draggable={false}
      />

      <div className="text-center">
        <h1 className="font-black text-3xl text-[#4A3728] tracking-tight leading-tight">
          Meet your Bunny
        </h1>
        <p className="text-[#A08070] font-medium mt-2 text-base">
          Give it a nickname, or keep it simple.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full max-w-72">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          autoFocus
          className="w-full text-center text-2xl font-extrabold text-[#4A3728] bg-white/80 border-2 border-[rgba(74,55,40,0.12)] rounded-2xl px-4 py-3 outline-none focus:border-[#E07A5F] transition-colors placeholder:text-[#C9A090]"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-[#E07A5F] text-white font-extrabold text-lg py-3.5 rounded-4xl shadow-[0_6px_16px_rgba(224,122,95,0.35)] hover:bg-[#B85A3F] active:scale-95 transition-all disabled:opacity-40"
        >
          That&apos;s my bunny!
        </button>
      </form>
    </div>
  );
};

export default NamingScreen;
