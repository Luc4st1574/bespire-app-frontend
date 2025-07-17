
import { Permission } from "@/constants/permissions";

// perm: string del permiso requerido (por ejemplo, "edit_requests")
export function hasPermission(permissions: string[], perm: Permission): boolean {
  if (permissions.includes(perm)) return true;
  // Busca manage_ENTITY
  const parts = perm.split("_");
  if (parts.length > 1) {
    const entity = parts.slice(1).join("_");
    const managePerm = `manage_${entity}`;
    if (permissions.includes(managePerm)) return true;
  }
  return false;
}
