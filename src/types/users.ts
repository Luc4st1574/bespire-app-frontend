import { UserPreferencesForm } from "@/schemas/userPreferencesSchema";

export type UserMember = {
  id: string;
  name: string;
  avatarUrl: string;
  teamRole: string;
};

export type Preferences = UserPreferencesForm & {
  hideQuickLinks: boolean;
  hideGetStarted: boolean;
};

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  teamRole: string;
  registrationStatus: "in_progress" | "completed";
  hasVisitedDashboard?: boolean;
  role?: string;
  workspaceSelected: string | null;
  preferences?: Preferences; // JSON string of preferences
};
