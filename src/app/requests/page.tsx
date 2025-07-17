"use client";



import DashboardLayout from "../dashboard/layout/DashboardLayout";
import RequestMain from "../../components/requests/RequestMain";

export default function DashboardPage() {



  return (
    
      <DashboardLayout titleHead="Requests"  >
        <RequestMain />
      </DashboardLayout>

  );
}
