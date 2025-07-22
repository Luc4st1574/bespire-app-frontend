"use client";

import { MockFile } from "@/data/mock-files";
import AllFilesSection from "./AllFilesSection";
import GetStartedFileManager from "./GetStartedFileManager";

interface FileManagerMainProps {
  files: MockFile[];
  filterMessage: string | null;
  showFilterMessage: boolean;
}

export default function FileManagerMain({ files, filterMessage, showFilterMessage }: FileManagerMainProps) {
  return (
    <div className="flex flex-col gap-8">
      <GetStartedFileManager />
      {/* Pass all relevant props to AllFilesSection */}
      <AllFilesSection
        files={files}
        filterMessage={filterMessage}
        showFilterMessage={showFilterMessage}
      />
    </div>
  );
}