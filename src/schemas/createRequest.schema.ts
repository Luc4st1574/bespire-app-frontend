import { z } from "zod";

export const createRequestSchema = z.object({
  category: z.string().optional(),
  mainType: z.string().min(1, "Category is required"),
  subType: z.string().min(1, "Sub-type is required"),
  title: z.string().min(1, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.string().min(1, "Date is required"),
  details: z.string().min(1, "Details are required"),
  parentRequest: z.string().optional(), // Para subtareas, opcional
  links: z
    .array(
      z.object({
        url: z.string().url(),
        title: z.string().optional(),
        favicon: z.string().url().optional(),
      })
    )
    .optional(),
  attachments: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string().optional(),
        ext: z.string().optional(),
        size: z.number().optional(),
        uploadedBy: z.string().optional(),
        uploadedAt: z.string().optional(), // Puede ser Date si prefieres
      })
    )
    .optional(),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
