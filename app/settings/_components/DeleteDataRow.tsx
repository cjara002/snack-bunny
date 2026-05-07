"use client";

import { useState } from "react";

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="#9F1239"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="#C9A090"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

interface ConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ onCancel, onConfirm }: ConfirmModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    style={{ background: "rgba(74,55,40,0.4)" }}
    onClick={(e) => e.target === e.currentTarget && onCancel()}
  >
    <div
      className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-[0_12px_32px_rgba(74,55,40,0.12)]"
      style={{ animation: "modal-enter 220ms cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <h2 className="text-[18px] font-black text-[#4A3728] mb-2">Delete your data?</h2>
      <p className="text-[14px] font-semibold text-[#A08070] mb-6 leading-[1.4]">
        Delete your bunny and all snack data? This cannot be undone.
      </p>
      <div className="flex flex-col gap-2">
        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-[14px] bg-[#FB7185] text-white text-[15px] font-black hover:bg-[#e05a70] transition-colors"
        >
          Delete everything
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-[14px] text-[#A08070] text-[15px] font-bold hover:text-[#4A3728] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

interface DeleteDataRowProps {
  onDelete: () => void;
}

const DeleteDataRow = ({ onDelete }: DeleteDataRowProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-[#FFF9F5] transition-colors text-left"
        onClick={() => setShowModal(true)}
      >
        <div className="shrink-0 w-9 h-9 rounded-xl bg-[#FFE4E6] flex items-center justify-center">
          <TrashIcon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-extrabold text-[#9F1239]">Delete my data</div>
          <div className="text-[13px] font-semibold text-[#A08070]">
            Clears every snack, name, and setting on this device
          </div>
        </div>
        <ChevronIcon />
      </button>

      {showModal && (
        <ConfirmModal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            onDelete();
          }}
        />
      )}
    </>
  );
};

export default DeleteDataRow;
