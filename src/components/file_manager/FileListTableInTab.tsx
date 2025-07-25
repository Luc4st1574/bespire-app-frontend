/* eslint-disable @next/next/no-img-element */
import { getFileIcon } from "@/utils/getFileIcon";
import { formatDate, truncateFileName } from "@/utils/utils";
import { Download, X } from "lucide-react";

type FileType = {
  id: string;
  name: string;
  uploadedAt: string | Date;
  uploadedBy: string;
};

type FileListTableProps = {
  files: FileType[];
  selectMode: boolean;
  selected: string[];
  onToggleSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (file: FileType) => void;
};

export default function FileListTable({
  files,
  selectMode,
  selected,
  onToggleSelect,
  onDelete,
  onDownload,
}: FileListTableProps) {
  return (
    <ul>
      {files.map((f: FileType) => (
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
              title={`Select file ${f.name}`}
              aria-label={`Select file ${f.name}`}
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
                {formatDate(typeof f.uploadedAt === "string" ? f.uploadedAt : f.uploadedAt.toISOString())}, by {f.uploadedBy}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700"
            onClick={() => onDownload(f)}
            title={`Download ${f.name}`}
            aria-label={`Download ${f.name}`}
          >
            <Download size={18} />
          </button>
          {selectMode && (
            <button
              type="button"
              className="text-gray-400 hover:text-red-600"
              onClick={() => onDelete(f.id)}
              title={`Delete ${f.name}`}
              aria-label={`Delete ${f.name}`}
            >
              <X size={18} />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}