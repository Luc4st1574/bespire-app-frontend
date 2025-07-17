/* eslint-disable @next/next/no-img-element */
// components/RequestMainHeader.tsx
import { Bell, Link, MoreHorizontal, X } from "lucide-react";
import RequestStatusDropdown from "../../ui/RequestStatusDropdown";

export default function RequestMainHeader({
  status,
  title,
  onStatusChange,
  onClose,
  parentRequest,
  onBackToMain,
  parentRequestTitle
}) {
  return (
    <div className="flex items-start justify-between ">
      <div className="flex flex-col gap-4">
        
        <RequestStatusDropdown value={status} onChange={onStatusChange} />
        {/* Migas de pan si es subtask */}
        {parentRequest && (
          <div className="flex items-center gap-1 mt-3">
            <span className="text-black">{parentRequestTitle}</span>
            <img src="/assets/icons/mayorq.svg" alt="" className="w-4 h-4" />
          </div>
        )}
        <div className="font-bold text-2xl">{title}</div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          title="Copy Link"
          className="hover:bg-gray-100 p-2 rounded-full cursor-pointer"
        >
          <Link className="w-5 h-5" />
        </button>
        <button
          type="button"
          title="Notify"
          className="hover:bg-gray-100 p-2 rounded-full cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          type="button"
          title="More"
          className="hover:bg-gray-100 p-2 rounded-full cursor-pointer"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
        <button
          type="button"
          title="Close"
          className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
