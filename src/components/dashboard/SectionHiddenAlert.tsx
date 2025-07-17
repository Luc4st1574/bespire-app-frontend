// components/SectionHiddenAlert.tsx
import { useEffect } from "react";

interface Props {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number; // opcional: autodesaparecer
}

export default function SectionHiddenAlert({
  message,
  onUndo,
  onDismiss,
  duration = 0,
}: Props) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  return (
    <div className="bg-[#EBFDD8] text-sm text-black px-4 py-2 rounded-md flex justify-between items-center mb-6 border border-[#D0F5A0] transition-all duration-300 ease-in-out">
      <span>{message}</span>
      <div className="flex items-center gap-3 text-sm">
        <button onClick={onUndo} className="underline text-black cursor-pointer">
          Undo
        </button>
        <button onClick={onDismiss} className="underline text-black cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  );
}
