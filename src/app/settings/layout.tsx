// app/settings/layout.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import TabsHeader from "@/components/settings/TabsHeader";
import AuthGuard from "../../components/AuthGuard";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import PermissionGuard from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Determina el tab activo de la URL (ej: /settings/account)
  const activeTab = pathname.split("/").pop() || "account";
  // Opcional: redirige si url base /settings -> /settings/account

  return (
    <PermissionGuard required={PERMISSIONS.VIEW_SETTINGS}>
      <DashboardLayout titleHead="Settings">
        <div className="w-full max-w-3xl mx-auto py-10">
          <TabsHeader activeTab={activeTab} />
          <div>{children}</div>
        </div>
      </DashboardLayout>
    </PermissionGuard>
  );
}
