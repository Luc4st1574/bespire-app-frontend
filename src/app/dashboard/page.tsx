"use client";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardMain from "../../components/dashboard/Main";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { useAppContext } from "@/context/AppContext";
import PermissionGuard from "@/guards/PermissionGuard";
import { PERMISSIONS } from "@/constants/permissions";

export default function DashboardPage() {
  const { user } = useAppContext();

  const name = user?.firstName + " " + user?.lastName;
  const saludo = user?.firstName ? `Good Morning, ${name}` : "Bienvenido";
  console.log("DashboardLayout user", user);

  return (
    <PermissionGuard required={PERMISSIONS.VIEW_DASHBOARD}>
      <DashboardLayout titleHead={saludo} sidebar={<DashboardSidebar />}>
        <DashboardMain />
      </DashboardLayout>
    </PermissionGuard>
  );
}
