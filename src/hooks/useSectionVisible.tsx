import { useWorkspace } from "@/hooks/useWorkspace";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAppContext } from "@/context/AppContext";

export function useSectionVisible(workspaceField: "quickLinks" | "getStarted", userField: "hideQuickLinks" | "hideGetStarted") {
  const { workspace } = useAppContext();
  const { preferences, loading: prefsLoading } = useUserPreferences();

  // El workspace puede no tener aún el campo
  const enabled = workspace?.[workspaceField] !== false;
  const userHide = preferences?.[userField];

  // loading: si está cargando preferencias o workspace
  const loading = prefsLoading || workspace === undefined;

  return {
    visible: enabled && !userHide,
    loading,
  };
}
