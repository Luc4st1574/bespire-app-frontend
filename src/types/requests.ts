import { UserMember } from "./users";

export type RequestList = {
    id: string;
    title: string;
    createdAt: string;
    category: string;
    dueDate?: string;
    assignees: UserMember[];
    commentsCount: number;
    attachmentsCount: number;
    subtasksCount: number;
    credits: number;
    priority: "low" | "medium" | "high" | "none";
    status: "open" | "in_progress" | "closed" | "cancelled";
    parentRequest?: string
  };