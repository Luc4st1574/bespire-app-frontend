// components/RequestStatusDropdown.tsx
import { STATUS_OPTIONS } from "@/utils/utils";
import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function RequestStatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current =
    STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open: menuOpen }) => (
        <>
          <Menu.Button
            onClick={() => setOpen(!open)}
            className={`inline-flex items-center px-4 py-1 ${current.bg} ${current.colorInSelected}
               rounded-full text-md font-semibold gap-2 min-w-[150px]  transition`}
            style={{ border: "none" }}
          >
            <span className={`w-5 h-5 ${current.colorInSelected}`}>
              <current.Icon className={`w-5 h-5 ${current.colorInSelected}`} />
            </span>
            <span className={`font-medium ${current.colorInSelected}`}>{current.label}</span>
            <span className="mx-2 text-gray-300 select-none text-lg font-thin">
              |
            </span>
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </Menu.Button>
          <Menu.Items className="absolute left-0 z-20 mt-2 w-60 origin-top-left rounded-lg bg-white shadow-xl ring-1 ring-[#E2E6E4] focus:outline-none">
            {STATUS_OPTIONS.map((opt) => (
              <Menu.Item key={opt.value}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onChange(opt.value);
                    }}
                    className={`flex items-center w-full gap-3 px-5 py-3 text-base font-medium
                        ${opt.color}
                        ${opt.value === value ? "bg-gray-100" : ""}
                        ${active && opt.value !== value ? "bg-gray-50" : ""}
                        transition`}
                  >
                    <span className={`w-5 h-5 ${opt.color}`}>
                      <opt.Icon className={`w-5 h-5 ${opt.color}`} />
                    </span>
                    <span className={opt.color}>{opt.label}</span>
                    {opt.value === value && (
                      <span className="ml-auto text-green-600 text-lg">
                        ●
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
