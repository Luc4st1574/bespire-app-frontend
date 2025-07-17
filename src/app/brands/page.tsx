"use client";

import PermissionGuard from "@/guards/PermissionGuard";
import BrandsSection from "../../components/brands/BrandsSection";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { PERMISSIONS } from "@/constants/permissions";
export default function BrandsPage() {
  return (
    <PermissionGuard required={PERMISSIONS.VIEW_BRANDS}>
      <DashboardLayout titleHead="Brands">
        <BrandsSection />
      </DashboardLayout>
    </PermissionGuard>
  );
}
