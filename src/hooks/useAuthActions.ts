// hooks/useAuthActions.ts
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export function useAuthActions() {
  const router = useRouter();
  const { setToken } = useAppContext();


  const logout = async () => {
    setToken(null);
    localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.replace("/auth/login");
  };

   const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  return { logout, login };
}
