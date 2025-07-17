// components/LinkCardList.tsx
import { X, ExternalLink } from "lucide-react";

export default function LinkCardList({
  links = [],
  onRemove,
}: {
  links: { url: string; title?: string; favicon?: string }[];
  onRemove?: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {links.map((l, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-3 py-2 shadow rounded-md border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
        >
          <img
            src={l.favicon || "/assets/icons/loading.svg"}
            alt=""
            className="w-5 h-5 rounded"
            onError={e => (e.currentTarget.src = "/assets/icons/loading.svg")}
          />
          <div className="flex flex-col flex-1">
            <a
              href={l.url}
              className="truncate max-w-[180px] text-xs text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-medium truncate max-w-[180px] text-[#3A76FF]">
                {l.title || l.url.replace(/^https?:\/\//, "")}
              </span>
            </a>
          </div>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
            title="Open"
          >
            <ExternalLink size={16} />
          </a>
          {onRemove && (
            <button
              type="button"
              className="ml-1"
              title="Delete"
              onClick={() => onRemove(idx)}
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
