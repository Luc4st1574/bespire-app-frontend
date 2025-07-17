// context/AuthContext.tsx
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
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_USER_PROFILE } from "@/graphql/queries/getUserProfile";
import { decodeJWT } from "@/utils/jwt";

type AuthContextType = {
  user: any; // tu User | null, mejor si tienes interfaz
  token: string | null;
  payload: any | null; // <-- Nuevo: payload decodificado
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
  const [payload, setPayload] = useState<any | null>(null); // Nuevo: guarda payload del JWT
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();
  const hasFetchedProfile = useRef(false);

  // 1. Al iniciar, carga token y payload
  useEffect(() => {
    const savedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
      setPayload(decodeJWT(savedToken));
    } else {
      setLoading(false);
    }
  }, []);

  // 2. Si el token cambia, decodifica y actualiza payload
  useEffect(() => {
    if (token) {
      setPayload(decodeJWT(token));
    } else {
      setPayload(null);
    }
  }, [token]);

  // 3. Query de perfil solo si hay token y no se ha hecho antes
  const {
    data,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USER_PROFILE, {
    skip: !token || hasFetchedProfile.current,
    fetchPolicy: "network-only",
    pollInterval: 0,
  });

  useEffect(() => {
    if (
      token &&
      data?.getUserProfile &&
      !queryLoading &&
      !hasFetchedProfile.current
    ) {
      setUser(data.getUserProfile); // guarda todo
      setLoading(false);
      hasFetchedProfile.current = true;
    }
    if (
      token &&
      !data?.getUserProfile &&
      !queryLoading &&
      !hasFetchedProfile.current
    ) {
      setUser(null);
      setLoading(false);
      hasFetchedProfile.current = true;
      logout();
    }
    // eslint-disable-next-line
  }, [token, data, queryLoading, router]);

  useEffect(() => {
    if (!token) {
      hasFetchedProfile.current = false;
      setUser(null);
      setPayload(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setPayload(decodeJWT(newToken));
    hasFetchedProfile.current = false;
    setLoading(true);
  };

  const logout = async () => {
    setLoadingLogout(true);
    setToken(null);
    setUser(null);
    setPayload(null);
    localStorage.removeItem("token");
    hasFetchedProfile.current = false;
    await new Promise((resolve) => setTimeout(resolve, 100));
    setLoadingLogout(false);
    router.replace("/auth/login");
  };

  // --- helper de permisos
  const can = (perm: string) =>
    payload?.permissions?.includes(perm) || user?.permissions?.includes(perm);
  const canAny = (perms: string[]) =>
    perms.some((perm) => can(perm));

  const value = useMemo(
    () => ({
      user,
      token,
      payload,
      login,
      logout,
      loading,
      loadingLogout,
      queryLoading,
      refetchProfile: refetch,
      can,
      canAny,
    }),
    [user, token, payload, loading, loadingLogout, queryLoading, refetch]
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
