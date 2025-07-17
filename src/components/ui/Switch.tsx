import React from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Switch({ checked, onChange, className = "" }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      className={
        `
        w-10 h-6 rounded-full transition-colors duration-200 outline-none 
        ${checked ? "bg-[#6C806B]" : "bg-gray-300"}
        flex items-center relative
        ` + className
      }
    >
      <span
        className={`
          absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
          ${checked ? "translate-x-4" : "translate-x-0"}
        `}
      />
    </button>
  );
}
