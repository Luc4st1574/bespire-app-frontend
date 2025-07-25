"use client";

import { useMemo } from "react";
import { MockFile } from "@/data/mock-files";
import AllFilesSection from "./AllFilesSection";
import GetStartedFileManager from "./FileActionButtons";

interface FileManagerMainProps {
  files: MockFile[];
  onFolderCreated: (newFolder: MockFile) => void;
  onDeleteFolder: (folderId: string) => void; // Add prop for delete handler
  filterMessage: string | null;
  showFilterMessage: boolean;
  activeFilter: string;
}

export default function FileManagerMain({
  files,
  onFolderCreated,
  onDeleteFolder, // Receive delete handler
  filterMessage,
  showFilterMessage,
  activeFilter,
}: FileManagerMainProps) {
  const filteredFiles = useMemo(() => {
    if (activeFilter === "all" || !activeFilter) {
      return files;
    }
    return files.filter((file) => {
      const fileType = file.type.toLowerCase();
      if (activeFilter === "folders") {
        return fileType === "folder";
      }
      if (activeFilter === "files") {
        return ["ms powerpoint file", "pdf file", "ms word file", "ms excel sheet"].includes(fileType);
      }
      if (activeFilter === "documents") {
        return ["ms word file"].includes(fileType);
      }
      return false;
    });
  }, [files, activeFilter]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <GetStartedFileManager
          onFolderCreated={onFolderCreated}
          onDeleteFolder={onDeleteFolder}
        />
        <AllFilesSection
          files={filteredFiles}
          filterMessage={filterMessage}
          showFilterMessage={showFilterMessage}
        />
      </div>
    </>
  );
}
