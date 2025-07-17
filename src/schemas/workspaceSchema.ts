import { z } from "zod";

export const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name required"),
  defaultRequestsView: z.enum(["List", "Board"]),
  quickLinks: z.boolean(),
  getStarted: z.boolean(),
  // Puedes añadir validaciones adicionales si quieres
});
export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
