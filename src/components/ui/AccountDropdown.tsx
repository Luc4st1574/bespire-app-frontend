/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type DropdownItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

export default function AccountDropdown({
  workspace = "Spherule",
  role = "Client",
  avatar = "/assets/icons/spherule.svg",
  plan= "starter",
  items = [],
}: {
  workspace: string;
  role: string;
  avatar: string;
  plan: string;
  items: DropdownItem[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Botón de toggle */}
      <button

      type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-[#CDEDB6] hover:bg-[#F6F8F5] hover:border-[#CEFFA3]
        px-3 py-2 rounded-md text-[#003D3B] flex items-center justify-between"
      >

        
        <div className="flex items-center gap-2">
          <img src={avatar || "/assets/icons/account.svg"} alt="Workspace" className="w-5 h-5 rounded-full" />
          {workspace}
        </div>
        <ChevronDown className={clsx("w-4 h-4 transition", open && "rotate-180")} />
      </button>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute bottom-12 left-0 w-64 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="bg-[#697D67] text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
            <div>
            <img src={avatar || "/assets/icons/account.svg"} alt="Workspace" className="w-7 h-7 rounded-full" />
            </div>
            <div className="text-base  flex flex-col">
                <span className="">{workspace}</span>
                <span className="text-xs  ml-1 uppercase">{plan}</span>
            </div>
            </div>
            <span className="flex items-center capitalize  justify-center text-xs bg-white text-[#5E6B66] px-4  rounded-full py-1 ">
              {role}
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {items.map(({ label, icon: Icon, onClick }) => (
              <button
      type="button"

                key={label}
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#F5F5F5] text-left transition"
              >
                <Icon className="w-5 h-5 text-[#5E6B66]" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
