import { useAppContext } from "@/context/AppContext";
import Spinner from "@/components/Spinner";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  requireWorkspace?: boolean;
  fallback?: React.ReactNode;
};

export default function AuthGuard({
  children,
  requireWorkspace = false,
  fallback = null,
}: Props) {
  const {
    user,
    workspace,
    loadingUser,
    loadingWorkspace,
    role,
  } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

// Lógica de plan vencido
  const now = new Date();
  const isCancelPending = workspace?.planCancelPending;
  const planEndsAt = workspace?.planEndsAt ? new Date(workspace.planEndsAt) : null;
  const isPlanExpired = isCancelPending && planEndsAt && now >= planEndsAt;
  // 2. No logueado
  useEffect(() => {
    if (!loadingUser && !user) {
      router.replace("/auth/login");
    }
  }, [loadingUser, user, router]);


  // Redirigir si el plan está vencido y no estamos en /settings/plans
  useEffect(() => {
    if (
      requireWorkspace &&
      isPlanExpired &&
      pathname !== "/settings/plans"
    ) {
      router.replace("/settings/plans");
    }
  }, [requireWorkspace, isPlanExpired, pathname, router]);

  // Redirección a onboarding/pago (si eres owner y falta pagar)
  useEffect(() => {
    if (
      requireWorkspace &&
      user &&
      user.registrationStatus === "completed" &&
      workspace &&
      !workspace.hasPaid &&
      !pathname.startsWith("/auth/onboarding")
    ) {
      router.replace(`/auth/onboarding/step-${workspace.currentStep || 1}`);
    }
  }, [
    requireWorkspace,
    user,
    workspace,
    pathname,
    router,
  ]);

  // 1. Cargando datos...
  if (loadingUser || (requireWorkspace && loadingWorkspace)) {
    return <Spinner />;
  }


  if (!user) return null; // o fallback

  // 3. Si requiere workspace pero no hay uno cargado (y ya dejó de cargar)
  if (requireWorkspace && !workspace) {
    return fallback || <div>No tienes workspace seleccionado</div>;
  }

  // ----------- BLOQUE: PLAN Y ONBOARDING -----------

  


  // Si está vencido el plan y aún no estamos en settings/plans, bloquear UI (spinner)
  if (
    requireWorkspace &&
    isPlanExpired &&
    pathname !== "/settings/plans"
  ) {
    return <Spinner />;
  }

  // Si falta onboarding/pago, bloquear render (el useEffect hará el redirect)
  if (
    requireWorkspace &&
    user &&
    workspace &&
    user.registrationStatus === "completed" &&
    !workspace.hasPaid &&
    workspace.owner?._id === user._id &&
    !pathname.startsWith("/auth/onboarding")
  ) {
    return <Spinner />;
  }

  // ----------- BLOQUE: PERMISOS Y ROLES -----------




  // Si todo ok, renderiza children
  return <>{children}</>;
}
