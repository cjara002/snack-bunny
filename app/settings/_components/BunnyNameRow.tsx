"use client";

import { useState, useEffect, useRef } from "react";

const PencilIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="#A08070"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

interface BunnyNameRowProps {
  name: string;
  onSave: (cleaned: string) => void;
}

const BunnyNameRow = ({ name, onSave }: BunnyNameRowProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(name);
    setEditing(true);
  };

  const save = () => {
    const cleaned = (draft.trim() || "Bunny").slice(0, 20);
    onSave(cleaned);
    setEditing(false);
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
  };

  const cancel = () => setEditing(false);

  return (
    <div>
      {/* Row header */}
      <div
        role={!editing ? "button" : undefined}
        tabIndex={!editing ? 0 : undefined}
        className={`flex items-center gap-3.5 px-4 py-3.5 transition-colors ${
          !editing ? "cursor-pointer hover:bg-baseSecondary" : ""
        }`}
        onClick={!editing ? startEdit : undefined}
        onKeyDown={!editing ? (e) => e.key === "Enter" && startEdit() : undefined}
      >
        <div className="shrink-0 w-9 h-9 rounded-xl bg-baseSecondary flex items-center justify-center p-1">
          <img
            src="/assets/snack-bunny-favicon.png"
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-extrabold text-textPrimary">Bunny name</div>
          <div className="text-[13px] font-semibold text-textMuted">
            What you call your snacking accountabili-buddy
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!editing && (
            <span className="text-[15px] font-bold text-textPrimary">{name}</span>
          )}
          <PencilIcon />
        </div>
      </div>

      {/* Inline editor */}
      {editing && (
        <div className="px-4 pb-4 border-t border-borderSoft">
          <div className="relative mt-3 mb-3">
            <input
              ref={inputRef}
              value={draft}
              maxLength={20}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") cancel();
              }}
              placeholder="Bunny"
              className="w-full px-4 py-3 rounded-[14px] border-2 border-primary bg-white text-[16px] font-bold text-textPrimary placeholder-[#C9A090] outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span
              className={`absolute right-4 bottom-3.5 text-xs font-semibold tabular-nums transition-colors ${
                draft.length >= 18 ? "text-primary" : "text-[rgba(74,55,40,0.25)]"
              }`}
              aria-live="polite"
            >
              {draft.length}/20
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={cancel}
              className="px-4 py-2 text-[14px] font-bold text-textMuted hover:text-textPrimary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-5 py-2 rounded-full bg-primary text-white text-[14px] font-bold shadow-[0_4px_12px_rgba(224,122,95,0.35)] hover:bg-[#D06A4F] transition-colors"
            >
              Save name
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BunnyNameRow;
