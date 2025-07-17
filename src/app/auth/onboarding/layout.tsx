'use client';

import { ReactNode } from "react";
import WorkspaceLayout from "@/components/layouts/WorkspaceLayout";

// Este layout garantiza que todo lo que se renderice abajo tiene workspace listo
export default function OnboardingLayoutPage({ children }: { children: ReactNode }) {

  // Aquí WorkspaceProvider SIEMPRE se monta con el id correcto
  return (
    <WorkspaceLayout>
      {children}
    </WorkspaceLayout>
  );
}
