"use client";

import DashboardLayout from "../dashboard/layout/DashboardLayout";
import FileManagerMain from "@/components/file_manager/FileManagerMain";
import PermissionGuard from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";

export default function FileManagerPage() {
  return (
    <PermissionGuard required={PERMISSIONS.VIEW_FILES}>
      <DashboardLayout titleHead="File Manager">
        <FileManagerMain />
      </DashboardLayout>
    </PermissionGuard>
  );
}