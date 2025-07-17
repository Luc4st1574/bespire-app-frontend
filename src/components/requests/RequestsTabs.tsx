import React from "react";

import IconRequests from "@/assets/icons/requests.svg";
import IconInProgress from "@/assets/icons/in_progress.svg";
import IconPending from "@/assets/icons/pending.svg";
import IconCompleted from "@/assets/icons/completed.svg";



const tabs = [
  { id: "all", label: "Requests", icon: "all" },
  { id: "in_progress", label: "In Progress", icon: "in_progress" },
  { id: "pending", label: "Pending", icon: "pending" },
  { id: "completed", label: "Completed", icon: "completed" },
];

const iconMap: Record<string, React.ReactNode> = {
    all: <IconRequests className="w-4 h-4  text-[#697D67]" />,
    in_progress: <IconInProgress className="w-4 h-4 text-[#697D67]" />,
    pending: <IconPending className="w-4 h-4 text-[#697D67]"  />,
    completed: <IconCompleted className="w-4 h-4 text-[#697D67]" />,
  };
  

type Props = {
  activeTab: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
};

export default function RequestsTabs({ activeTab, onChange, counts }: Props) {
  return (
    <div className="w-full grid grid-cols-4  bg-[#F6F7F7]  ">
      {tabs.map(({ id, label, icon }) => {
        const isActive = activeTab === id;
        const count = counts[id] ?? 0;

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex flex-col items-start space-x-1 px-4 py-2 text-sm font-medium cursor-pointer
            ${
              isActive
                ? "bg-white border-t-4 border-[#004049] "
                : "text-black"
            }
            `}
            style={{ borderRight: id !== "completed" ? "1px solid #d1d5db" : "none" }}
          >
<div className="flex items-center gap-2">
{iconMap[icon]}
<span className="text-[#5E6B66] text-base">{label}</span>
</div>
            <span
              className={`text-xl font-semibold `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
