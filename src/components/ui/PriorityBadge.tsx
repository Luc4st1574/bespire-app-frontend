// components/PriorityBadge.tsx
import React from "react";

type Priority = "low" | "medium" | "high" | "none";

interface Props {
  priority: Priority;
  className?: string;
}

const priorityStyles: Record<
  Priority,
  { bg: string; border: string; text: string }
> = {
  low: {
    bg: "bg-[#DEFCBD]",
    border: "bg-[#B8DF91]",
    text: "text-black font-medium",
  },
  medium: {
    bg: "bg-[#FEDAA0]",
    border: "bg-[#CA820E]",
    text: "text-black font-medium",
  },
  high: {
    bg: "bg-[#FF6A6A]",
    border: "bg-[#C70000]",
    text: "text-white font-medium",
  },
  none: {
    bg: "bg-[#F6F7F7]",
    border: "bg-[#F6F7F7]",
    text: "text-black font-medium",
  },
};

export default function PriorityBadge({ priority, className = "" }: Props) {
  const styles = priorityStyles[priority] || priorityStyles.none;
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-sm text-xs ${styles.bg} ${styles.text} ${className}`}
    >
      <span className={`w-1 h-5 rounded-sm mr-2 ${styles.border}`}></span>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}
