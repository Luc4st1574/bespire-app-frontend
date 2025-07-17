"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/graphql/queries/getUserProfile";
import { decodeJWT } from "@/utils/jwt";
import { GET_WORKSPACE_BASIS_BY_ID } from "@/graphql/queries/workspace/getWorkspaceBasisById";
import { PERMISSIONS } from "@/constants/permissions";
import { hasPermission } from "@/utils/permissions";
import { REFRESH_TOKEN } from "@/graphql/mutations/auth/refreshToken";

type AppContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: any; // Puedes tipar esto según tu modelo
  workspace: any; // Idem
  permissions: string[];
  workspaceRole?: string;
  role?: string;
  loadingUser: boolean;
  loadingWorkspace: boolean;
  refetchUser: () => void;
  refetchWorkspace: () => void;
  //para el modal de request
  showModalRequest: boolean;
  setShowModalRequest: Dispatch<SetStateAction<boolean>>;
  parentId: string | null;
  setParentId: Dispatch<SetStateAction<string | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // --- Auth token y user ---
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false); // 🔥

  //para el modal de request
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const [refreshTokenMutation, { loading: refreshing }] =
    useMutation(REFRESH_TOKEN);

  // Leer token de localStorage sólo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (t && t !== "undefined") setToken(t);
      setTokenLoaded(true); // ✅ Marcar que ya leímos el token (IMPORTANTE)
    }
  }, []);

  // Decodifica el JWT solo si existe
  const decoded = useMemo(
    () => (token ? decodeJWT<any>(token) : null),
    [token]
  );

  // User Profile Query
  const {
    data: userData,
    loading: loadingUserQuery,
    refetch: refetchUserRaw,
  } = useQuery(GET_USER_PROFILE, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  // Workspace Profile Query
  const workspaceId = userData?.getUserProfile?.workspaceSelected;
  const {
    data: workspaceData,
    loading: loadingWorkspaceQuery,
    refetch: refetchWorkspaceRaw,
  } = useQuery(GET_WORKSPACE_BASIS_BY_ID, {
    variables: { workspaceId },
    skip: !workspaceId,
    fetchPolicy: "network-only",
  });

  // Permisos del JWT (del backend)
  const permissions: string[] = decoded?.permissions || [];
  const workspaceRole: string | undefined = decoded?.workspaceRole;
  const role: string | undefined = decoded?.role;

  // --- Estado de loading global ---
  const loadingUser = !tokenLoaded || loadingUserQuery;
  const loadingWorkspace = loadingUser || loadingWorkspaceQuery;

  // Refetch wrappers para evitar errores si las funciones no están definidas
  const refetchUser = () => refetchUserRaw && refetchUserRaw();
  const refetchWorkspace = () => refetchWorkspaceRaw && refetchWorkspaceRaw();

  console.log("AppProvider: token", token);
  console.log("AppProvider: decoded JWT", decoded);
  console.log("AppProvider: userData", userData);
  console.log("AppProvider: workspaceId", workspaceId);
  console.log("AppProvider: workspaceData", workspaceData);
  console.log("AppProvider: permissions", permissions);
  console.log("AppProvider: workspaceRole", workspaceRole);
  console.log("AppProvider: role", role);
  console.log("AppProvider: loadingUser", loadingUser);
  console.log("AppProvider: loadingWorkspace", loadingWorkspace);
  // Valor global del context

  const value = useMemo(
    () => ({
      token,
      setToken,
      user: userData?.getUserProfile || null,
      workspace: workspaceData?.getWorkspaceBasisById || null,
      permissions,
      workspaceRole,
      role,
      refetchUser,
      refetchWorkspace,
      loadingUser,
      loadingWorkspace,
      showModalRequest,
      setShowModalRequest,
      parentId,
      setParentId,
    }),
    [
      token,
      userData?.getUserProfile,
      workspaceData?.getWorkspaceBasisById,
      permissions,
      workspaceRole,
      role,
      refetchUser,
      refetchWorkspace,
      loadingUser,
      loadingWorkspace,
      showModalRequest,
      parentId,
    ]
  );

  // Refresca el token cada vez que montas (o cuando quieras, ej: cada cierto tiempo)
  useEffect(() => {
    // Solo refresca si ya hay un token guardado
    if (token) {
      refreshTokenMutation()
        .then(({ data }) => {
          if (data?.refreshToken?.token) {
            setToken(data.refreshToken.token);
            // Opcional: actualiza user/profile si lo deseas aquí mismo
            localStorage.setItem("token", data.refreshToken.token);
          }
        })
        .catch((err) => {
          // Si falla, podría ser token inválido, fuerza logout
          setToken(null);
          localStorage.removeItem("token");
        });
    }
    // Solo corre una vez al montar (o cada vez que cambie el token si lo quieres más reactivo)
    // eslint-disable-next-line
  }, [tokenLoaded]); // <- solo cuando ya leíste el token de localStorage

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook para usar el context
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
