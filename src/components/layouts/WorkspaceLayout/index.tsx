'use client';
import { WorkspaceProvider } from "@/hooks/useWorkspace";
import Spinner from "@/components/Spinner";
import { ReactNode } from "react";
import { useAppContext } from "@/context/AppContext";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  const { user, loadingUser:loading } = useAppContext();
  const workspaceId = user?.workspaceSelected;

  if (loading) return <Spinner />;
  if (!workspaceId) return <div>No workspace selected</div>; // o redirige
console.log("WorkspaceLayout renderizado con workspaceId:", workspaceId);
  return (
    <WorkspaceProvider workspaceId={workspaceId}>
      {children}
    </WorkspaceProvider>
  );
}
