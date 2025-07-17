"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { GET_USER_PROFILE } from "@/graphql/queries/getUserProfile";
import { useQuery } from "@apollo/client";
import { User } from "../types/users";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  loadingLogout: boolean;
  queryLoading: boolean;
  refetchProfile: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();

  // Referencia para evitar múltiples queries al perfil
  const hasFetchedProfile = useRef(false);

  // Cargar token desde localStorage una vez
  useEffect(() => {
    const savedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
    } else {
      setLoading(false); // no hay token, dejamos de cargar
    }
  }, []);

  // Consultar el perfil solo cuando haya token y no se haya consultado antes
  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USER_PROFILE, {
    skip: !token || hasFetchedProfile.current,
    fetchPolicy: "network-only", // Siempre consulta al backend cuando corresponda
    pollInterval: 0,
  });

  // Actualizar el user cuando llega la data, y marcar el fetch como hecho
  useEffect(() => {
    if (
      token &&
      data?.getUserProfile &&
      !queryLoading &&
      !hasFetchedProfile.current
    ) {
      setUser({
        _id: data.getUserProfile._id,
        email: data.getUserProfile.email,
        firstName: data.getUserProfile.firstName,
        lastName: data.getUserProfile.lastName,
        avatarUrl: data.getUserProfile.avatarUrl,
        teamRole: data.getUserProfile.teamRole,
        registrationStatus: data.getUserProfile.registrationStatus,
        hasVisitedDashboard: data.getUserProfile?.hasVisitedDashboard,
        role: data.getUserProfile?.role,
        workspaceSelected: data.getUserProfile?.workspaceSelected || null,
        preferences: JSON.parse(data.getUserProfile?.preferences || "{}"),
      });
      setLoading(false);
      hasFetchedProfile.current = true;
    }
    // Si el token es inválido o expiró, o no existe el perfil
    if (
      token &&
      !data?.getUserProfile &&
      !queryLoading &&
      !hasFetchedProfile.current
    ) {
      setUser(null);
      setLoading(false);
      hasFetchedProfile.current = true;
      router.replace("/auth/login");
    }
  }, [token, data, queryLoading, router]);

  // Cuando el token cambie (ejemplo: logout o login), resetea el flag
  useEffect(() => {
    if (!token) {
      hasFetchedProfile.current = false;
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    hasFetchedProfile.current = false;
    setLoading(true); // fuerza a mostrar loading hasta cargar user
  };

  const logout = async () => {
    setLoadingLogout(true);
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    hasFetchedProfile.current = false;
    // Pequeña pausa para UX
    await new Promise((resolve) => setTimeout(resolve, 100));
    setLoadingLogout(false);
    router.replace("/auth/login");
  };

  // Memoizar el value del context para evitar renders innecesarios
  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      loading,
      loadingLogout,
      queryLoading,
      refetchProfile: refetch,
    }),
    [user, token, loading, loadingLogout, queryLoading, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
