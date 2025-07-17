'use client';

import { ReactNode, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/AppContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useRouter } from "next/navigation";

export default function PublicGuard({ children }: { children: ReactNode }) {
  const { user, loadingUser:loading } = useAppContext();
  const { logout } = useAuthActions();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    console.log("PublicGuard user", user);
    if (!loading) {
      if (user && user.registrationStatus === "completed") {
        router.replace("/dashboard");
      } else if (user && user.registrationStatus === "in_progress") {
        router.replace(`/auth/onboarding/step-1`);

      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, router, logout]);

  

  if (loading || !authorized) {
    return <Spinner />;
  }

  return <>{children}</>;
}
