// src/hooks/usePermission.ts
import { Permission } from "@/constants/permissions";
import { useAppContext } from "@/context/AppContext";
import { hasPermission } from "@/utils/permissions";

export function usePermission(perm: Permission) {
  const { permissions } = useAppContext();
  return hasPermission(permissions, perm);
}
