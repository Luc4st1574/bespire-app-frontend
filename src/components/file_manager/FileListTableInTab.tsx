/* eslint-disable @next/next/no-img-element */
import { getFileIcon } from "@/utils/getFileIcon";
import { formatDate, truncateFileName } from "@/utils/utils";
import { Download, X } from "lucide-react";

export default function FileListTable({
  files,
  selectMode,
  selected,
  onToggleSelect,
  onDelete,
  onDownload,
}) {
  return (
    <ul>
      {files.map((f) => (
        <li
          key={f.id}
          className="flex items-center gap-2 py-2 hover:bg-[#fafcf8]"
        >
          {selectMode && (
            <input
              type="checkbox"
              checked={selected.includes(f.id)}
              onChange={() => onToggleSelect(f.id)}
              className="mx-1"
            />
          )}
          {/* ICON */}
          <img src={getFileIcon(f.name)} className="w-8 h-8" alt="" />
          {/* INFO */}
          <div className="flex-1 min-w-0 flex flex-col ">
            {truncateFileName(f.name, 30)}
            <div className="text-xs text-[#5E6B66] flex items-center gap-1">
              <img src="/assets/icons/cloud-check.svg" alt="" />
              <span>
                {formatDate(f.uploadedAt)}, by {f.uploadedBy}
              </span>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-gray-700"
            onClick={() => onDownload(f)}
          >
            <Download size={18} />
          </button>
          {selectMode && (
            <button
              className="text-gray-400 hover:text-red-600"
              onClick={() => onDelete(f.id)}
            >
              <X size={18} />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}