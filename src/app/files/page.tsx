"use client";

import DashboardLayout from "../dashboard/layout/DashboardLayout";
import FileManagerMain from "@/components/file_manager/FileManagerMain";
import PermissionGuard from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";
import { useSearchParams } from "next/navigation";
import { mockFiles, MockFile } from "@/data/mock-files";

export default function FileManagerPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  let filteredFiles: MockFile[] = [];
  let filterMessage: string | null = null;
  let showFilterMessage = false;

  switch (view) {
    case "folders":
      filteredFiles = mockFiles.filter((file) => file.type === "Folder");
      filterMessage = "All folders are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    case "files":
      filteredFiles = mockFiles.filter((file) => file.type !== "Folder");
      filterMessage = "All files are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    case "docs":
      filteredFiles = mockFiles.filter(
        (file) => file.name.endsWith(".docx") || file.name.endsWith(".doc") || file.type === "MS Word File"
      );
      filterMessage = "Only documents are shown. View all files and folders in";
      showFilterMessage = true;
      break;
    default:
      filteredFiles = mockFiles;
      showFilterMessage = false;
      break;
  }

  return (
    <PermissionGuard required={PERMISSIONS.VIEW_FILES}>
      <DashboardLayout titleHead="File Manager">
        {/* Pass filteredFiles, filterMessage, and showFilterMessage to FileManagerMain */}
        <FileManagerMain
          files={filteredFiles}
          filterMessage={filterMessage}
          showFilterMessage={showFilterMessage}
        />
      </DashboardLayout>
    </PermissionGuard>
  );
}