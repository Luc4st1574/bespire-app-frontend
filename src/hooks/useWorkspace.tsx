import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_WORKSPACE_BASIS_BY_ID } from "../graphql/queries/workspace/getWorkspaceBasisById";
import { User } from "../types/users";

type Workspace = {
  _id: string;
  name: string;
  currentStep: number;
  onboardingCompleted: boolean;
  hasPaid?: boolean;
  owner?: User;
  companyName?: string
  companyImg?: string
  defaultRequestsView?: "List" | "Grid";
  quickLinks?: boolean;
  getStarted?: boolean;
  plan?: string
  planCancelPending?: boolean;
  planEndsAt?: string;
};

type WorkspaceContextType = {
  workspace: Workspace | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetchWorkspace: () => Promise<any>;
  loading: boolean;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export function WorkspaceProvider({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  console.log("WorkspaceProvider workspaceId", workspaceId)
  const { data, loading, refetch } = useQuery(GET_WORKSPACE_BASIS_BY_ID, {
    variables: { workspaceId },
    skip: !workspaceId,
  });

  console.log("Workspace data:", data);

  return (
    <WorkspaceContext.Provider
      value={{
        workspace: data?.getWorkspaceBasisById ?? null,
        refetchWorkspace: refetch,
        loading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx)
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return ctx;
}
