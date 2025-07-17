/* eslint-disable @next/next/no-img-element */
// components/AttachmentList.tsx
import { X, Download } from "lucide-react";
import { getFileIcon } from "@/utils/getFileIcon";
import { truncateFileName } from "@/utils/utils";

export interface AttachmentFile {
  url: string;
  name: string;
  size?: number;
  ext?: string;
  uploadedBy?: string;
  uploadedAt?: string;
}

export default function AttachmentList({
  files,
  onRemove,
}: {
  files: AttachmentFile[];
  onRemove?: (idx: number) => void;
}) {
  console.log("files in attachmentList ", files)
  // Helper para tamaño humano
  function humanFileSize(bytes?: number) {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes}b`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}kb`;
    return `${(bytes / 1024 / 1024).toFixed(1)}mb`;
  }

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

  return (
    <div className="flex flex-col rounded-lg ">
      {files.map((f, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-4 bg-white border border-gray-200 rounded-lg mb-2 min-h-[56px]"
        >
          {/* ICON */}
          <img src={getFileIcon(f.name)} className="w-8 h-8" alt="" />

          {/* INFO */}
          <div className="flex-1 min-w-0 flex flex-col ">
            {truncateFileName(f.name, 30)}
            <span className="text-xs text-[#5E6B66]">Added by {f.uploadedBy} on {formatDate(f.uploadedAt)}</span>
          </div>

          {/* Download y eliminar */}
          <div className="flex items-center gap-2">
            {f.url && (
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 ml-2"
                title="Download"
              >
                <Download size={20} />
              </a>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(idx)}
                className="text-gray-400 hover:text-red-600"
                title="Remove"
              >
                <X size={22} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
