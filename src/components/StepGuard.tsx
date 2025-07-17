'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { useWorkspace } from "../hooks/useWorkspace";
import { useAppContext } from "@/context/AppContext";

export default function StepGuard({ children }: { children: ReactNode }) {
 const { workspace, loadingWorkspace:loading } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
console.log("workspace en StepGuard", workspace);
  useEffect(() => {
    if (!loading) {
      if (!workspace) {
        router.replace("/auth/login");
      } else {
        const currentStep = workspace.currentStep || 1;

        const currentStepPath = `/auth/onboarding/step-${currentStep}`;
        const requestedStep = parseInt(pathname.split("/step-")[1]);

        console.log("currentStep", currentStep);
        console.log("requestedStep", requestedStep);

       // Evita que avance a un paso mayor que el actual
       if (requestedStep > currentStep) {
        router.replace(currentStepPath);
      } else {
        setAuthorized(true);
      }
      }
    }
  }, [workspace, loading, pathname, router]);

  if (loading || !authorized) {
    return <Spinner />;
  }

  return <>{children}</>;
}
