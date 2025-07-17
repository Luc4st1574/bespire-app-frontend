// src/guards/PermissionGuard.tsx
import { useAppContext } from "@/context/AppContext";
import { hasPermission } from "@/utils/permissions";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Permission } from "@/constants/permissions";

// Opcional: puedes customizar el fallback o redirección
type Props = {
  required: Permission;
  children: React.ReactNode;
  redirectTo?: string;    // A dónde redirigir si NO cumple permiso
  fallback?: React.ReactNode; // Componente para mostrar si no cumple
  showError?: boolean;    // Si quieres mostrar toast/error automáticamente
};

export default function PermissionGuard({
  required,
  children,
  redirectTo = "/not-authorized", // Puedes tener una página de error
  fallback = null,
  showError = false,
}: Props) {
  const { permissions, loadingUser } = useAppContext();
  const router = useRouter();

  // Permiso requerido (puede ser uno, pero puedes adaptar para múltiples)
  const hasPerm = hasPermission(permissions, required);

  useEffect(() => {
    if (!loadingUser && !hasPerm && redirectTo) {
      if (showError) {
        // Puedes usar tu sistema de toast aquí (ejemplo: SweetAlert, Toastify, etc)
        // toast.error("No tienes permiso para ver esta página");
      }
      router.replace(redirectTo);
    }
  }, [loadingUser, hasPerm, redirectTo, showError, router]);

  if (loadingUser) return <Spinner />;
  if (!hasPerm) return fallback || null;

  return <>{children}</>;
}
