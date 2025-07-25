"use client";

import { useState } from "react";
import FileListTable from "./FileListTable";
import { MockFile } from "@/data/mock-files";
import { ChevronDown } from "lucide-react";
import FileGrid from "./FileGrid";
import Link from "next/link";
import IconList from "@/assets/icons/icon_list.svg";
import IconGrid from "@/assets/icons/icon_grid.svg";
type ViewMode = "list" | "grid";

interface AllFilesSectionProps {
  files: MockFile[]; 
  filterMessage: string | null;
  showFilterMessage: boolean;
}

export default function AllFilesSection({ files, filterMessage, showFilterMessage }: AllFilesSectionProps) {
  const [view, setView] = useState<ViewMode>("list");
  const [isContentVisible, setIsContentVisible] = useState(true);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <section>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">All Files</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">

            <span className="text-sm font-medium text-gray-600">Filter</span>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 transition-transform duration-300"
              title="Open filter options"
              aria-label="Open filter options"
              onClick={toggleContentVisibility}
            >
              <ChevronDown className={`w-4 h-4 ${isContentVisible ? "rotate-0" : "rotate-[180deg]"}`} />
            </button>
          </div>

          <div className="flex items-center bg-white rounded-full border-2 border-[#CEFFA3] p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`px-4 py-1 text-sm font-medium flex items-center gap-2 rounded-full transition-colors duration-200 ${
                view === "list" ? "bg-[#CEFFA3] shadow-sm text-black" : "text-gray-300"
              }`}
            >
              <IconList className={`w-4 h-4 ${view === "list" ? "text-black" : "text-gray-300"}`} />
              List
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`px-4 py-1 text-sm font-medium flex items-center gap-2 rounded-full transition-colors duration-200 ${
                view === "grid" ? "bg-[#CEFFA3] shadow-sm text-black" : "text-gray-300"
              }`}
            >
              <IconGrid className={`w-4 h-4 ${view === "grid" ? "text-black" : "text-gray-300"}`} />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isContentVisible && (
        <div>
          {view === "list" ? <FileListTable files={files} /> : <FileGrid files={files} />}

          {showFilterMessage && filterMessage && (
            <div className="mt-6 text-center text-gray-600">
              <p className="inline-block mr-1">{filterMessage}</p>
              <Link href="/files" className="text-black underline inline-block">
                File manager
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}