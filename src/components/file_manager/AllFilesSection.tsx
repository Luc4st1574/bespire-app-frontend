/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import FileListTable from "./FileListTable";
import { mockFiles } from "@/data/mock-files";
import { ChevronDown } from "lucide-react";
import FileGrid from "./FileGrid";

type ViewMode = "list" | "grid";

export default function AllFilesSection() {
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

          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`px-4 py-1 text-sm font-medium flex items-center gap-2 rounded-full transition-colors duration-200 ${
                view === "list" ? "bg-[rgb(206,255,163)] shadow-sm text-black" : "text-gray-600"
              }`}
            >
              <img src="/assets/icons/icon_list.svg" alt="List view" className="w-4 h-4" />
              List
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`px-4 py-1 text-sm font-medium flex items-center gap-2 rounded-full transition-colors duration-200 ${
                view === "grid" ? "bg-[rgb(206,255,163)] shadow-sm text-black" : "text-gray-600"
              }`}
            >
              <img src="/assets/icons/icon_grid.svg" alt="Grid view" className="w-4 h-4" />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isContentVisible && ( // Conditionally render the content
        <div>
          {view === "list" ? (
            <FileListTable files={mockFiles} />
          ) : (
            <FileGrid files={mockFiles} />
          )}
        </div>
      )}
    </section>
  );
}