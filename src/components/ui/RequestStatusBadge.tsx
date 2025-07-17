// components/RequestStatusBadge.tsx
import { STATUS_OPTIONS } from "@/utils/utils";

export default function RequestStatusBadge({ value, className = "" }) {
  const current =
    STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];

  return (
    <span
      className={`inline-flex items-center px-4 py-1 ${current.bg} ${current.colorInSelected}
        rounded-full text-sm font-semibold gap-2 min-w-[120px] transition ${className}`}
      style={{ border: "none" }}
    >
      <span className={`w-4 h-4 ${current.colorInSelected}`}>
        <current.Icon className={`w-4 h-4 ${current.colorInSelected}`} />
      </span>
      <span className={`font-medium ${current.colorInSelected}`}>
        {current.label}
      </span>
    </span>
  );
}
