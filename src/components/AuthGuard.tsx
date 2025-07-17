import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useWorkspace } from "../hooks/useWorkspace";
import { AuthGuardUser } from "./AuthGuardUser";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import { useAppContext } from "@/context/AppContext";

export default function AuthGuard({ children }: { children: ReactNode }) {
  return (
    <AuthGuardUser>
      <WorkspaceLayout>
        <AuthGuardWorkSpace requiereWorkspace={true}>
          {children}
        </AuthGuardWorkSpace>
      </WorkspaceLayout>
    </AuthGuardUser>
  );
}

function AuthGuardWorkSpace({
  children,
  requiereWorkspace = true,
}: {
  children: ReactNode;
  requiereWorkspace?: boolean;
}) {
  const { user, loadingUser:loading, workspace, loadingWorkspace:workspaceLoading } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();


  // --- Lógica para plan vencido
  const now = new Date();
  const isCancelPending = workspace?.planCancelPending;
  const planEndsAt = workspace?.planEndsAt ? new Date(workspace.planEndsAt) : null;
  const isPlanExpired = isCancelPending && planEndsAt && now >= planEndsAt;


  // --- Redirección de plan vencido SOLO si no estamos en settings/plans
  useEffect(() => {
    console.log("isPlanExpired", isPlanExpired, "pathname", pathname)
    if (isPlanExpired && pathname !== "/settings/plans") {
      router.replace("/settings/plans");
    }
  }, [isPlanExpired, pathname, router]);

  // --- Redirección a onboarding/pago
  useEffect(() => {
    if (
      !loading &&
      user &&
      requiereWorkspace &&
      user.workspaceSelected &&
      workspace &&
      user.registrationStatus === "completed" &&
      !workspace.hasPaid &&
      workspace.owner?._id === user._id &&
      !pathname.startsWith("/auth/onboarding")
    ) {
      router.replace(`/auth/onboarding/step-${workspace.currentStep}`);
    }
  }, [
    loading,
    user,
    requiereWorkspace,
    workspace,
    pathname,
    router,
  ]);

  // --- Loader o "pantalla en blanco" si:
  // 1. Falta cargar el workspace
  // 2. Workspace ya está vencido pero no hemos redirigido aún
  if (
    workspaceLoading ||
    !workspace ||
    !workspace.hasPaid ||
    !user?.workspaceSelected ||
    (isPlanExpired && pathname !== "/settings/plans")
  ) {
    // Si el plan está vencido y aún no estamos en /settings/plans, bloquea render
    return <Spinner />;
  }


  if (!user) return null;

  // Si todo ok, muestra el dashboard o children correspondiente
  return <>{children}</>;
}
