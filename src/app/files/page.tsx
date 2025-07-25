"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import FileManagerMain from "@/components/file_manager/FileManagerMain";
import PermissionGuard from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";
import { useSearchParams } from "next/navigation";
import { mockFiles, MockFile } from "@/data/mock-files";
import { showSuccessToast } from "@/components/ui/toast"; // Changed import

export default function FileManagerPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [files, setFiles] = useState<MockFile[]>(mockFiles);

  // Adds the new folder to the state
  const handleFolderCreated = (newFolder: MockFile) => {
    setFiles((prevFiles) => [newFolder, ...prevFiles]);
  };

  // Removes the folder from the state, used for the "Undo" action
  const handleDeleteFolder = (folderId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== folderId));
    showSuccessToast("Folder creation undone"); // Updated this line
  };

  let filterMessage: string | null = null;
  let showFilterMessage = false;

  const activeFilter = view === "docs" ? "documents" : view || "all";

  switch (view) {
    case "folders":
      filterMessage = "All folders are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    case "files":
      filterMessage = "All files are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    case "docs":
      filterMessage = "Only documents are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    default:
      showFilterMessage = false;
      break;
  }

  return (
    <PermissionGuard required={PERMISSIONS.VIEW_FILES}>
      <DashboardLayout titleHead="File Manager">
        <FileManagerMain
          files={files}
          onFolderCreated={handleFolderCreated}
          onDeleteFolder={handleDeleteFolder} // Pass the delete handler down
          activeFilter={activeFilter}
          filterMessage={filterMessage}
          showFilterMessage={showFilterMessage}
        />
      </DashboardLayout>
    </PermissionGuard>
  );
}