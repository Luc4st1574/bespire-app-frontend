import { z } from "zod";

export const userPreferencesSchema = z.object({
  timezone: z.string().default("America/New_York"),
  notifications: z.boolean().default(true),
  hideQuickLinks: z.boolean().default(false),
  hideGetStarted: z.boolean().default(false),
  channels: z.object({
    email: z.boolean().default(true),
    inApp: z.boolean().default(true),
    push: z.boolean().default(true),
  }).default({ email: true, inApp: true, push: true }),
  newsletter: z.boolean().default(true),
  specific: z.object({
    requestsAlert: z.boolean().default(true),
    brandsUpdate: z.boolean().default(true),
    filesUpdate: z.boolean().default(true),
    mentionsComments: z.boolean().default(true),
    sharedItems: z.boolean().default(true),
    lowOnCredits: z.boolean().default(true),
    paymentAlerts: z.boolean().default(true),
  }).default({
    requestsAlert: true,
    brandsUpdate: true,
    filesUpdate: true,
    mentionsComments: true,
    sharedItems: true,
    lowOnCredits: true,
    paymentAlerts: true,
  }),
});

export type UserPreferencesForm = z.infer<typeof userPreferencesSchema>;
