interface UndoButtonProps {
  visible: boolean;
  onClick: () => void;
}

const UndoButton = ({ visible, onClick }: UndoButtonProps) => (
  <div
    className={`flex justify-center mt-4 transition-opacity duration-300 ${
      visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
    aria-hidden={!visible}
  >
    <button
      onClick={onClick}
      className="bg-white/80 border-2 border-[rgba(74,55,40,0.12)] text-[#A08070] font-bold text-sm px-6 py-2.5 rounded-full hover:bg-white hover:text-[#4A3728] transition-colors"
    >
      Oops, undo
    </button>
  </div>
);

export default UndoButton;
